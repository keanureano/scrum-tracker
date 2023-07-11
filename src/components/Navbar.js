import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserDropdown from "./UserDropdown";

export default async function Navbar() {
  const user  = await getServerSession(authOptions);
console.log(user)

  return (
    <nav>
      <UserDropdown username={user.username} />
    </nav>
  );
}
