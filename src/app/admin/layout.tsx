"use client";

import { Header } from "@/components/admin/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen flex-col">
      <Header />
      <main className="flex grow flex-col px-14 py-8">{children}</main>
    </section>
  );
}
