import { db } from './lib/db'
async function main() {
    await db.user.update({
        where: { email: 'testqa@example.com' },
        data: { role: 'ADMIN' }
    });
    console.log("User promoted to ADMIN");
}
main();
