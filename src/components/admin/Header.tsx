import { ArrowUpDown, Menu, Package } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { KeyPhonicIcon } from "@/assets/icons/KeyPhonic";
import { useAuth } from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
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
        <h1 className="text-brand-500 text-2xl font-bold">KeyPhonic</h1>
      </Link>
      {isAuthenticated && (
        <>
          <div className="hidden w-full items-center justify-between md:flex">
            <div className="flex gap-8">
              {menus.map((item) => (
                <MenuItem key={item.label} {...item} />
              ))}
            </div>
            <Profile name="Felipe Soares" role="Administrador" />
          </div>
          <div className="ml-auto block md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent>
                <div className="flex h-full flex-col justify-between p-5">
                  <div className="">
                    {menus.map((item) => (
                      <MenuItem key={item.label} {...item} />
                    ))}
                  </div>
                  <Profile name="Felipe Soares" role="Administrador" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}
    </div>
  );
};
