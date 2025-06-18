import { ReactNode } from "react";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
};

export default PublicLayout;
