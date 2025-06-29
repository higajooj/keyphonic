"use client";

import { CircleUser, MapPin } from "lucide-react";
import Link from "next/link";
import Container from "../keyphonic/container";
import { Input } from "../ui/input";
import Cart from "./cart";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-end gap-x-2 bg-black px-4 py-2 text-xs text-gray-200">
        <MapPin />
        <span>
          Deliver to <strong>123456</strong>
        </span>
      </div>

      <Container>
        <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
          <Link href="/">
            <h1 className="text-2xl font-bold">KeyPhonic</h1>
          </Link>

          <div>
            <Input name="search" variant="search" />
          </div>

          <div className="flex gap-x-2">
            <Cart />

            <Link className="flex items-center gap-x-2" href="/login">
              <CircleUser size={16} />
              <span>Sign in</span>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Header;
