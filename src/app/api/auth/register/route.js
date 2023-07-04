import { createUser } from "@/lib/userUtils";

export async function POST(request) {
  const body = await request.json();

  const user = await createUser(body);

  if (!user) {
    return new Response("", { status: 409 });
  }

  return new Response(JSON.stringify(user));
}
