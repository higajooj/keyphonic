import { Header } from "@/components/admin/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
