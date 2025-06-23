import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MenuItemProps {
  href: string;
  label: string;
  icon: ReactNode;
}
export const MenuItem = ({ href, icon, label }: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <Link
      className={cn(
        "flex gap-2.5 px-1 py-5 font-semibold text-gray-500",
        isActive && "border-brand-500 border-b-2 text-brand-500",
      )}
      href={href}
      key={label}
    >
      {icon}
      <p className={cn(isActive && "text-black")}>{label}</p>
    </Link>
  );
};
