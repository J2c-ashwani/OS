import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
// import { createClient } from '@libsql/client'; // Unused if passing config directly?

const prismaClientSingleton = () => {
    // Attempting to pass config directly to adapter based on lint hints
    const adapter = new PrismaLibSql({
        url: process.env.DATABASE_URL || "file:./dev.db"
    });
    return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

export const db = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = db;
}
