"use client";

import { Eye, EyeClosed, Search } from "lucide-react";
import { ComponentProps, forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  label?: string;
  error?: string;
  variant?: "default" | "search";
  mask?: (v: string) => string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, variant = "default", mask, ...props }, ref) => {
    const [hide, setHide] = useState(true);
    const id = props.id || props.name;

    return (
      <span>
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
            onChange={(e) => {
              if (mask) e.currentTarget.value = mask(e.currentTarget.value);
              if (props.onChange) props.onChange(e);
            }}
            className={cn(
              "border-input selection:bg-primary selection:text-primary-foreground file:text-foreground placeholder:text-muted-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
              variant === "search" && "max-w-80 rounded-full pl-9",
              props.disabled && "bg-gray-100",
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
        <p className="pl-1 text-xs text-red-500">{error}</p>
      </span>
    );
  },
);

Input.displayName = "input";

export { Input };
