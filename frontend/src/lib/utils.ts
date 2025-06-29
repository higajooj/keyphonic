import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (value?: number | string) => {
  if (value) {
    const string = value.toString();
    const number = Number(value)

    if (string.replace(/\D/g, "") !== "") {
      const amount = (
        parseInt(string.replace(/\D/g, ""), 10) / 100
      ).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
      });

      return number < 0 ? `-${amount}` : amount;
    }
  }

  return "R$ 0,00";
};
