import { KeyPhonicIcon } from "@/assets/icons/KeyPhonic";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  BoxSelect,
  Package,
  SortAsc,
  User,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { MenuItem } from "./MenuItem";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Profile } from "./profile";

interface HeaderProps {}
export const Header = ({}: HeaderProps) => {
  const { isAuthenticated } = useAuth();

  const menus = useMemo(() => {
    return [
      {
        icon: <ArrowUpDown />,
        label: "Pedidos",
        href: "/admin/orders",
      },
      {
        icon: <Package />,
        label: "Produtos",
        href: "/admin/products",
      },
    ];
  }, []);

  return (
    <div className="flex items-center gap-16 px-16 py-5 border-b">
      <Link href="/admin" className="flex gap-3 items-center">
        <KeyPhonicIcon />
        <h1 className="text-2xl text-brand-500 font-bold">KeyPhonic</h1>
      </Link>
      {isAuthenticated && (
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-8">
            {menus.map((item) => (
              <MenuItem key={item.label} {...item} />
            ))}
          </div>
          <Profile name="Felipe R a Soares" role="Administrador"  />
        </div>
      )}
    </div>
  );
};
