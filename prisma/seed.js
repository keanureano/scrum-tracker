const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();
async function main() {
  await createRootAdminCredentials();
  if (process.env.NODE_ENV === "dev") {
    await createDummyData(7);
  }
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

async function createRootAdminCredentials() {
  if (!process.env.ROOT_ADMIN_CREDENTIALS) {
    throw new Error("ROOT_ADMIN_CREDENTIALS .env.local variable is missing.");
  }

  const [username, unhashedPassword] =
    process.env.ROOT_ADMIN_CREDENTIALS.split(":");

  const password = await bcrypt.hash(unhashedPassword, 10);

  await prisma.user.upsert({
    where: { username },
    update: {
      username,
      password,
      role: "admin",
    },
    create: {
      username,
      password,
      role: "admin",
    },
  });

  console.log("✔ Created ROOT_ADMIN from .env.local");
}

async function createDummyData(iterations) {
  for (let i = 0; i < iterations; i++) {
    await createDummyUser(i);
  }
  
  for (let i = 0; i < iterations; i++) {
    await createDummyScrum(i);

    for (let j = 0; j < iterations; j++) {
      await createDummyReport(i, j);
    }
    console.log(`✔ Created DUMMY_SCRUM_${i}`);
  }
}

async function createDummyUser(i) {
  const id = `DUMMY_USER_${i}`;
  const username = faker.internet.userName();
  const unhashedPassword = faker.internet.password();
  const password = await bcrypt.hash(unhashedPassword, 10);

  await prisma.user.upsert({
    where: { id },
    update: {
      id,
      username,
      password,
      role: "user",
    },
    create: {
      id,
      username,
      password,
      role: "user",
    },
  });
}

async function createDummyScrum(i) {
  const id = `DUMMY_SCRUM_${i}`;
  const date = faker.date.past();
  const issues = faker.lorem.sentence();

  await prisma.scrum.upsert({
    where: { id },
    update: {
      id,
      date,
      issues,
    },
    create: {
      id,
      date,
      issues,
    },
  });
}

async function createDummyReport(i, j) {
  const id = `DUMMY_REPORT_${i}_${j}`;
  const scrumId = `DUMMY_SCRUM_${i}`;
  const userId = `DUMMY_USER_${j}`;
  const taskToday = faker.lorem.sentence();
  const taskYesterday = faker.lorem.sentence();
  const impediments = faker.lorem.sentence();

  await prisma.report.upsert({
    where: { id },
    create: {
      id,
      taskToday,
      taskYesterday,
      impediments,
      user: { connect: { id: userId } },
      scrum: { connect: { id: scrumId } },
    },
    update: {
      id,
      taskToday,
      taskYesterday,
      impediments,
      user: { connect: { id: userId } },
      scrum: { connect: { id: scrumId } },
    },
  });
}
