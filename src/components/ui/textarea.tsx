import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  name: string;
  label?: string;
  error?: string;
}

function Textarea({ error, label, className, ...props }: TextareaProps) {
  const id = props.id || props.name;
  return (
    <span>
      <label className="mb-1.5 text-xs" htmlFor={id}>
        {label}
      </label>
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        {...props}
      />
      <p className="pl-1 text-xs text-red-500">{error}</p>
    </span>
  );
}

export { Textarea };
