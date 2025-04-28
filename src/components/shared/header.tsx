import { CircleUser, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import Container from "../keyphonic/container";
import { Input } from "../ui/input";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-end gap-x-2 bg-black px-4 py-2 text-gray-200 text-xs">
        <MapPin />
        <span>
          Deliver to <strong>123456</strong>
        </span>
      </div>

      <Container>
        <div className="flex items-baseline justify-between border-gray-200 border-b py-6">
          <h1 className="font-bold text-2xl">KeyPhonic</h1>

          <div>
            <Input name="search" variant="search" />
          </div>

          <Link className="flex items-center gap-x-2" href="/">
            <CircleUser size={16} />
            <span>Sign up</span>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Header;
