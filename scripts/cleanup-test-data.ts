import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
// Remove all rows created during verification testing
const delOutbox = await db.emailOutbox.deleteMany({});
const delRegs = await db.registration.deleteMany({});
console.log(`Deleted ${delOutbox.count} outbox entries, ${delRegs.count} registrations (test data).`);
const remaining = await db.registration.count();
console.log(`Remaining registrations: ${remaining}`);
await db.$disconnect();
