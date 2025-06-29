"use client";

import { Header } from "@/components/admin/Header";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { replace } = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (user === null || !isAuthenticated) {
      replace("/");
    }
  }, [isAuthenticated, replace, user]);

  if (user === null || !isAuthenticated) return null;

  return (
    <section className="flex min-h-screen flex-col">
      <Header user={user} />
      <main className="flex grow flex-col px-14 py-8">{children}</main>
    </section>
  );
}
