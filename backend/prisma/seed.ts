import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.reporter.createMany({
    data: [
      { name: 'Alice Johnson', city: 'Jakarta', available: true },
      { name: 'Bob Smith', city: 'Bandung', available: true },
      { name: 'Charlie Lee', city: 'Jakarta', available: true }
    ]
  });
  await prisma.editor.createMany({
    data: [
      { name: 'Diana Prince', flatFee: 50000 },
      { name: 'Evan Wright', flatFee: 60000 }
    ]
  });
}

main().catch(console.error);