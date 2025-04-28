import { ArrowUpDown, Package } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { KeyPhonicIcon } from "@/assets/icons/KeyPhonic";
import { useAuth } from "@/hooks/useAuth";
import { MenuItem } from "./MenuItem";
import { Profile } from "./Profile";

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
    <div className="flex items-center gap-16 border-b px-16 py-5">
      <Link className="flex items-center gap-3" href="/admin">
        <KeyPhonicIcon />
        <h1 className="font-bold text-2xl text-brand-500">KeyPhonic</h1>
      </Link>
      {isAuthenticated && (
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-8">
            {menus.map((item) => (
              <MenuItem key={item.label} {...item} />
            ))}
          </div>
          <Profile name="Felipe Soares" role="Administrador" />
        </div>
      )}
    </div>
  );
};
