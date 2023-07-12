import Link from "next/link";
import DropdownToggle from "./DropdownToggle";

export default function AdminDashboard({ role }) {
  if (role !== "admin") return null;

  return (
    <DropdownToggle label="Admin Dashboard">
      <div className="admin-dashboard">
        <Link href="/admin/view-scrums">View Scrums</Link>
        <Link href="/admin/view-reports">View Reports</Link>
        <Link href="/admin/view-issues">View Issues</Link>
        <Link href="/admin/manage-groups">Manage Groups</Link>
        <Link href="/admin/manage-users">Manage Users</Link>

      </div>
    </DropdownToggle>
  );
}
