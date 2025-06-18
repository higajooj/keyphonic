"use client";

import { CircleUser, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Container from "../keyphonic/container";
import { Input } from "../ui/input";

const Header = () => {
  const session = authClient.useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

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
          <Link href="/">
            <h1 className="font-bold text-2xl">KeyPhonic</h1>
          </Link>

          <div>
            <Input name="search" variant="search" />
          </div>

          {session.data ? (
            <Link className="flex items-center gap-x-2" href="/profile">
              <CircleUser size={16} />
              <span>{session.data.user.name}</span>
            </Link>
          ) : (
            <Link className="flex items-center gap-x-2" href="/login">
              <CircleUser size={16} />
              <span>Sign in</span>
            </Link>
          )}
        </div>
      </Container>
    </>
  );
};

export default Header;
