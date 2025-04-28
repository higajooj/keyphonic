import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfileProps {
  name: string;
  role: string;
  imageUrl?: string;
}
export const Profile = ({ name, role, imageUrl }: ProfileProps) => {
  const fallback = name
    .split(" ")
    .map((item, i, array) => (i === 0 || i == array.length - 1 ? item[0] : ""))
    .join("");

  return (
    <Link
      className="flex items-center gap-2.5 rounded-xl border p-2.5"
      href="/admin"
    >
      <Avatar>
        <AvatarImage src={imageUrl} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <h2 className="font-semibold">{name}</h2>
        <p className="font-medium text-[10px] text-gray-500">{role}</p>
      </div>
    </Link>
  );
};
