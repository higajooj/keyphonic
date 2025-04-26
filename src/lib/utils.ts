import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (value?: number) => {
  if (value) {
    const string = value.toString();

    if (string.replace(/\D/g, "") !== "") {
      const amount = (
        parseInt(string.replace(/\D/g, ""), 10) / 100
      ).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
      });

      return value < 0 ? `-${amount}` : amount;
    }
  }

  return "R$ 0,00";
};
