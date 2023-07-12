import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserDashboard from "./UserDashboard";

export default async function Navbar() {
  const { user } = await getServerSession(authOptions);

  return (
    <nav>
      <UserDashboard username={user.username} />
    </nav>
  );
}
