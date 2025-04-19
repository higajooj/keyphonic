import { Header } from "@/components/admin/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      {children}
    </section>
  );
}
