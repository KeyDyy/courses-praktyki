const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        const testUser = await prisma.user.create({
            data: {
                // Przykładowe ID użytkownika
                password: 'testpassword',
                //username: 'testuser2',
                first_name: 'Test',
                last_name: 'User',
                email: 'test@example.com2',
                //permissions: 'USER', // Przykładowe uprawnienia
                //lessFortunate: 'disability', // Przykładowa niepełnosprawność
                //course_id: null, // Przykładowe ID kursu
                //quizresult_id: null, // Przykładowe ID wyniku quizu
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
