"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const ProductCategories = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-full bg-black px-4 py-2 text-slate-100">
            Keyboards
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <span>keyboards</span>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Switches</NavigationMenuTrigger>
          <NavigationMenuContent>
            <span>switches</span>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Keycaps</NavigationMenuTrigger>
          <NavigationMenuContent>
            <span>keyboards</span>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-full bg-black px-4 py-2 text-slate-100">
            Headphones
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <span>keyboards</span>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>IEMs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <span>keyboards</span>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>DACs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <span>keyboards</span>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>AMPs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <span>keyboards</span>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ProductCategories;
