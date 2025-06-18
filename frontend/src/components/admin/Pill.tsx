import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

interface PillProps {
  children: ReactNode;
  className?: ClassNameValue;
}
export const Pill = ({ children, className }: PillProps) => {
  return (
    <span
      className={cn(
        "bg-brand-500/10 text-brand-500 h-fit w-fit rounded-full px-2.5 py-1.5 font-semibold",
        className,
      )}
    >
      {children}
    </span>
  );
};
