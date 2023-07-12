import Link from "next/link";
import DropdownToggle from "./DropdownToggle";

export default function AdminDashboard({ role }) {
  if (role !== "admin") return null;

  return (
    <DropdownToggle label="Admin Dashboard">
      <div className="admin-dashboard">
        <div>View Scrums</div>
        <div>View Reports</div>
        <div>View Issues</div>
        <div>Manage Groups</div>
        <div>Manage Users</div>
      </div>
    </DropdownToggle>
  );
}
