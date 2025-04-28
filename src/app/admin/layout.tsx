"use client";
import { Header } from "@/components/admin/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      push("/admin/auth");
    }
  }, [isAuthenticated]);

  return (
    <AuthProvider>
      <section className="min-h-screen flex flex-col">
        <Header />
        <main className="grow flex flex-col py-8 px-14">{children}</main>
      </section>
    </AuthProvider>
  );
}
