import { LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfileProps {
  role: string;
  name?: string;
  imageUrl?: string;
}
export const Profile = ({ name, role, imageUrl }: ProfileProps) => {
  const { logout } = useAuth();

  const fallback = name
    ?.split(" ")
    ?.map((item, i, array) => (i === 0 || i == array.length - 1 ? item[0] : ""))
    ?.join("");

  return (
    <div className="flex items-center justify-between gap-5 rounded-xl border p-2.5 md:gap-10">
      <Link className="flex items-center gap-2.5" href="/admin">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <h2 className="font-semibold">{name}</h2>
          <p className="text-[10px] font-medium text-gray-500">{role}</p>
        </div>
      </Link>
      <LogOut className="cursor-pointer" onClick={() => logout()} />
    </div>
  );
};
