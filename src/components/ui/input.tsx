"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import { ComponentProps, useState } from "react";
interface InputProps extends ComponentProps<"input"> {
  label?: string;
  name: string;
}

function Input({ className, type, label, name, ...props }: InputProps) {
  const [hide, setHide] = useState(true);

  return (
    <>
      <label className="text-xs mb-1.5" htmlFor={name}>
        {label}
      </label>
      <div className="relative ">
        <input
          id={name}
          type={hide ? type : "text"}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
        {type === "password" && (
          <button
            className="rounded cursor-pointer px-3 h-full absolute top-0 right-0"
            onClick={() => setHide((v) => !v)}
          >
            {hide ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </>
  );
}

export { Input };
