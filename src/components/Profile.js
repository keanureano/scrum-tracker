import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function Home() {
  const { user } = await getServerSession(authOptions);
  console.log(user);

  return <main>Welcome,{user.username}</main>;
}
