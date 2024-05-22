"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode, useState } from "react";

import { cn } from "../../../lib/utils";
import { Button } from "@/components/ui/button";
import { AlignRight, X } from "lucide-react";
import CartSlide from "./CartSlide";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Nav = ({ children }: { children: ReactNode }) => {
  return (
    <header className="mx-20 my-8 flex justify-between items-center">
      <div>
        <h1>COOKIE CRUMBLE</h1>
      </div>

      <nav className="text-center flex justify-center px-4">{children}</nav>

      <CartSlide />
    </header>
  );
};

export const NavLink = (
  props: Omit<ComponentProps<typeof Link>, "className">
) => {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "p-4",
        pathname === props.href && "border-b-2 border-black"
      )}
    />
  );
};

export const MobileNav = ({ children }: { children: ReactNode }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <header className="relative z-10 mx-20 my-8 flex justify-between items-center min-sm:mx-10">
      <div>
        <h1>COOKIE CRUMBLE</h1>
      </div>

      <div className="flex space-x-3">
        <CartSlide />

        <Sheet>
          <SheetTrigger className="group -m-2 flex items-center p-2">
            <AlignRight className="w-6 aspect-square flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
          </SheetTrigger>

          <SheetContent className="flex justify-center items-center w-full min-sm:max-w-sm">
            <nav className="text-center flex flex-col justify-center px-4">
              {children}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
