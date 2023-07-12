const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();
async function main() {
  if (process.env.NODE_ENV === "dev") {
    await deleteAllData();
    await createDummyData(7);
  }
  await createRootCredentials();
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

async function createRootCredentials() {
  if (!process.env.ROOT_USER_CREDENTIALS || !process.env.ROOT_ADMIN_CREDENTIALS)
    throw new Error("ROOT CREDENTIALS from .env.local is missing.");

  const [userUsername, userUnhashedPassword] =
    process.env.ROOT_USER_CREDENTIALS.split(":");

  const [adminUsername, adminUnhashedPassword] =
    process.env.ROOT_ADMIN_CREDENTIALS.split(":");

  const userPassword = await bcrypt.hash(userUnhashedPassword, 10);
  const adminPassword = await bcrypt.hash(adminUnhashedPassword, 10);

  await prisma.user.create({
    username: userUsername,
    password: userPassword,
    role: "user",
  });

  await prisma.user.create({
    create: {
      username: adminUsername,
      password: adminPassword,
      role: "admin",
    },
  });

  console.log("✔ Created ROOT CREDENTIALS");
}

async function deleteAllData() {
  await prisma.user.deleteMany();
  await prisma.scrum.deleteMany();
  await prisma.report.deleteMany();
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

  await prisma.user.create({
    data: {
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

  await prisma.scrum.create({
    data: {
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

  await prisma.report.create({
    data: {
      id,
      taskToday,
      taskYesterday,
      impediments,
      user: { connect: { id: userId } },
      scrum: { connect: { id: scrumId } },
    },
  });
}
