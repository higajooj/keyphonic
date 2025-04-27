"use client";

import { Eye, EyeClosed, Search } from "lucide-react";
import { ComponentProps, forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  label?: string;
  error?: string;
  variant?: "default" | "search";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, variant = "default", ...props }, ref) => {
    const [hide, setHide] = useState(true);
    const id = props.id || props.name;

    return (
      <>
        <label className="mb-1.5 text-xs" htmlFor={id}>
          {label}
        </label>
        <div className="relative mb-1">
          {variant === "search" && (
            <span className="absolute top-0 flex h-full items-center px-3">
              <Search size={20} />
            </span>
          )}
          <input
            {...props}
            className={cn(
              "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
              variant === "search" && "max-w-80 rounded-full pl-9",
              className,
            )}
            data-slot="input"
            id={id}
            ref={ref}
            type={hide ? type : "text"}
          />
          {type === "password" && (
            <button
              className="absolute top-0 right-0 h-full cursor-pointer rounded px-3"
              onClick={() => setHide((v) => !v)}
            >
              {hide ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        <p className="pl-1 text-red-500 text-xs">{error}</p>
      </>
    );
  },
);

Input.displayName = "input";

export { Input };
