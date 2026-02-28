const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    await prisma.user.update({
        where: { email: 'testqa@example.com' },
        data: { role: 'ADMIN' }
    });
    console.log("User promoted to ADMIN");
}
main();
