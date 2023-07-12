import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import Link from "next/link";
import Image from "next/image";

export default async function Navbar() {
  const { user } = await getServerSession(authOptions);

  return (
    <nav className="navbar">
      <Image src="/logo.png" width={166} height={50} alt="logo" />
      <div className="links">
        <Link href="#">Home</Link>
        <Link href="#">My Reports</Link>
        <Link href="#">Weekly Scrums</Link>
      </div>
      <div className="dashboards">
        <AdminDashboard role={user.role} />
        <UserDashboard username={user.username} />
      </div>
    </nav>
  );
}
