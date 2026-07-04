const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const crypto = require("crypto");

// Fallback to standard connection string if env is not loaded yet in Node process
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/Watch-db";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { hash, salt };
}

async function main() {
  const username = "admin";
  const password = "Admin@123";

  console.log(`Seeding database with default user: ${username}...`);

  // Delete existing admin user if any to prevent unique constraint failures on multiple runs
  try {
    await prisma.user.delete({ where: { username } });
  } catch (err) {
    // Ignore if user does not exist
  }

  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      password: hash,
      salt,
    },
  });

  console.log(`Seeded user successfully: id=${user.id}, username=${user.username}`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
