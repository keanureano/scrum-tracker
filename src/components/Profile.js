import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const { user } = await getServerSession(authOptions);
  console.log(user);

  return <main>Welcome,{user.username}<Navbar/></main>;
}
