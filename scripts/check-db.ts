import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const regs = await db.registration.findMany({
  select: { reference: true, fullName: true, email: true, phone: true, mode: true, trackId: true, emailStatus: true },
});
console.table(regs);
const outbox = await db.emailOutbox.findMany({
  select: { reference: true, toEmail: true, status: true },
});
console.table(outbox);
await db.$disconnect();
