import { cn } from "@/lib/utils";
import { CircleAlert, CircleCheck, Clock } from "lucide-react";

export enum StatusEnum {
  PENDING = "pending",
  COMPLETED = "completed",
  REFUSED = "refused",
}

interface StatusProps {
  status: StatusEnum;
  onlyIcon?: boolean;
}
const statusDicionary = {
  [StatusEnum.PENDING]: {
    label: "Em andamento",
    icon: <Clock size={14} />,
    style: "text-blue-500",
  },
  [StatusEnum.COMPLETED]: {
    label: "Pago",
    icon: <CircleCheck size={14} />,
    style: "text-green-500",
  },
  [StatusEnum.REFUSED]: {
    label: "Recusado",
    icon: <CircleAlert size={14} />,
    style: "text-red-500",
  },
};

export default function Status({ status, onlyIcon = false }: StatusProps) {
  const { icon, label, style } = statusDicionary[status] || {};
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "border-gray01 flex w-32 items-center justify-center gap-2 rounded-lg border-[1px] px-2 py-1",
          onlyIcon && "w-fit",
          style,
        )}
      >
        {icon}
        {!onlyIcon && (
          <p className="text-center text-[10px] font-semibold">{label}</p>
        )}
      </div>
    </div>
  );
}
