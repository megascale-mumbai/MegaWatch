/**
 * Run: node scratch/clean_base64.js
 *
 * Scans all Watch records and strips Base64 image strings from the config JSON,
 * replacing them with empty strings. This shrinks the DB back to normal size.
 * 
 * Safe to re-run — only touches records that actually have base64 data.
 */
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:root@localhost:5432/Watch-db";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function stripBase64FromValue(value) {
  if (typeof value === "string" && value.startsWith("data:image")) {
    return ""; // replace base64 blob with empty string
  }
  if (Array.isArray(value)) {
    return value.map(stripBase64FromValue);
  }
  if (value && typeof value === "object") {
    const result = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = stripBase64FromValue(v);
    }
    return result;
  }
  return value;
}

async function main() {
  const watches = await prisma.watch.findMany();
  console.log(`Found ${watches.length} watch records`);

  let cleaned = 0;
  for (const watch of watches) {
    const configStr = JSON.stringify(watch.config || {});
    if (!configStr.includes("data:image")) {
      console.log(`  ✓ ${watch.name} — already clean`);
      continue;
    }

    const cleanConfig = stripBase64FromValue(watch.config);
    const cleanDialImage =
      watch.dialImage && watch.dialImage.startsWith("data:image")
        ? ""
        : watch.dialImage;

    await prisma.watch.update({
      where: { id: watch.id },
      data: {
        config: cleanConfig,
        dialImage: cleanDialImage || null,
      },
    });

    const before = Buffer.byteLength(configStr, "utf8");
    const after = Buffer.byteLength(JSON.stringify(cleanConfig), "utf8");
    console.log(
      `  🧹 ${watch.name} — cleaned (${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB)`
    );
    cleaned++;
  }

  console.log(`\nDone. Cleaned ${cleaned} / ${watches.length} records.`);
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
