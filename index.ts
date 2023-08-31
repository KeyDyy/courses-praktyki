const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        const testUser = await prisma.user.create({
            data: {

                password: 'testpassword',
                //username: 'testuser2',
                first_name: 'Test',
                last_name: 'User',
                email: 'test@example.com2',

            },
        });

        console.log('Test user created:', testUser);
    } catch (error) {
        console.error('Error creating test user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
