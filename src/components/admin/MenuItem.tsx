import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

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
      href={href}
      key={label}
      className={cn(
        "flex py-5 px-1 gap-2.5 text-gray-500 font-semibold",
        isActive && "border-b-2 border-brand-500 text-brand-500"
      )}
    >
      {icon}
      <p className={cn(isActive && "text-black")}>{label}</p>
    </Link>
  );
};
