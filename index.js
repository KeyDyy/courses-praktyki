
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const questionsWithAnswers = await prisma.question.findMany({
        include: {
            Answer: true,
        },
    })
    console.log(questionsWithAnswers)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })