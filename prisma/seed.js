const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const [rootUsername, rootPassword] =
    process.env.ROOT_ADMIN_CREDENTIALS.split(":");

  const rootAdmin = await prisma.user.upsert({
    where: { username: rootUsername },
    update: {
      password: rootPassword,
    },
    create: {
      username: rootUsername,
      password: rootPassword,
      role: "admin",
    },
  });
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
