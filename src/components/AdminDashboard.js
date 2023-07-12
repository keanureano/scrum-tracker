import Link from "next/link";
import DropdownToggle from "./DropdownToggle";

export default function AdminDashboard({ role }) {
  if (role !== "admin") return null;

  return (
    <DropdownToggle label="Admin Dashboard">
      <div className="admin-dashboard">
        <Link href="#">View Scrums</Link>
        <Link href="#">View Reports</Link>
        <Link href="#">View Issues</Link>
        <Link href="#">Manage Groups</Link>
        <Link href="#">Manage Users</Link>
      </div>
    </DropdownToggle>
  );
}
