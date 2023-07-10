import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Dropdown from "./Dropdown";

export default async function Home() {
  const { user } = await getServerSession(authOptions);
  console.log(user);

  return <main><Dropdown username={user.username}/></main>;
}
