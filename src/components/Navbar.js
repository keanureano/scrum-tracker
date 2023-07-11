import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DropdownToggle from "./DropdownToggle";
import ModalToggle from "./ModalToggle";

export default async function Navbar() {
  const { user } = await getServerSession(authOptions);

  return (
    <nav>
      <DropdownToggle label={user.username}>
        <ChangeEmailModal />
        <ChangePasswordModal />
        <SignOutButton />
      </DropdownToggle>
    </nav>
  );
}

function ChangeEmailModal() {
  return (
    <ModalToggle label="Change Email">
      <div>Change Email here</div>
    </ModalToggle>
  );
}

function ChangePasswordModal() {
  return (
    <ModalToggle label="Change Password">
      <div>Change Password here</div>
    </ModalToggle>
  );
}

function SignOutButton() {
  return (
    <form action="/api/auth/signout">
      <input type="submit" value="Sign Out" />
    </form>
  );
}
