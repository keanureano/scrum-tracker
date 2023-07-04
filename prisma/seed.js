const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
async function main() {
  if (!process.env.ROOT_ADMIN_CREDENTIALS) {
    throw new Error("ROOT_ADMIN_CREDENTIALS .env.local variable is missing.");
  }

  const [rootUsername, rootPassword] =
    process.env.ROOT_ADMIN_CREDENTIALS.split(":");

  const rootHashedPassword = await bcrypt.hash(rootPassword, 10);

  await prisma.user.upsert({
    where: { username: rootUsername },
    update: {
      password: rootHashedPassword,
    },
    create: {
      username: rootUsername,
      password: rootHashedPassword,
      role: "admin",
    },
  });

  console.log("✔ Created ROOT_ADMIN from .env.local");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
