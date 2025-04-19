import { KeyPhonicIcon } from "@/assets/icons/KeyPhonic";
import Link from "next/link";

interface HeaderProps {}
export const Header = ({}: HeaderProps) => {


  return <div className="px-16 py-5">
    <Link href="/admin" className="flex gap-3 items-center">
      <KeyPhonicIcon />
      <h1 className="text-2xl text-brand-500 font-bold">KeyPhonic</h1>
    </Link>
  </div>;
};
