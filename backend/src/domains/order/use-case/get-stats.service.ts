import { Injectable } from "@nestjs/common";
import { PaymentMethodEnum } from "generated/prisma";
import { IOrderRepository } from "../interfaces/order.interface";
import { subMonths, startOfMonth, format } from "date-fns";

export class GetStatsServiceInput {
  filter?: {
    search?: string;
    paymentMethod?: PaymentMethodEnum;
  };
}

type ChartItem = {
  month: string;
  value: number;
};

type StatisticItem = {
  label: string;
  value: number;
  count: number;
};

export class GetStatsServiceOutput {
  chart: ChartItem[];
  statistics: StatisticItem[];
}

@Injectable()
export class GetStatsService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  public async execute({ filter }: GetStatsServiceInput): Promise<GetStatsServiceOutput> {
    const now = new Date();
    const startDate = subMonths(startOfMonth(now), 11);

    const where: any = {
      createdAt: {
        gte: startDate,
      },
    };

    if (filter?.paymentMethod) {
      where.paymentMethod = filter.paymentMethod;
    }

    const orders = await this.orderRepository.findAll({ where });

    const monthsMap = new Map<string, number>();
    for (let i = 11; i >= 0; i--) {
      const date = subMonths(now, i);
      const key = format(date, "MMMM");
      monthsMap.set(key, 0);
    }

    const statusMap: Record<string, { label: string; value: number; count: number }> = {
      COMPLETED: { label: "Pagos", value: 0, count: 0 },
      PENDING: { label: "Em andamentos", value: 0, count: 0 },
      REFUSED: { label: "Cancelados", value: 0, count: 0 },
    };

    for (const order of orders) {
      const month = format(order.createdAt, "MMMM");
      if (monthsMap.has(month)) {
        monthsMap.set(month, monthsMap.get(month)! + order.total);
      }

      const status = order.status;
      if (statusMap[status]) {
        statusMap[status].count += 1;
        statusMap[status].value += order.total;
      }
    }

    const chartData = Array.from(monthsMap.entries()).map(([month, value]) => ({
      month,
      value,
    }));

    return {
      chart: chartData,
      statistics: Object.values(statusMap),
    };
  }
}
