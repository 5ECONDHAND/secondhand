const { PrismaClient } = require('./pgclient')

/** @type {import('./pgclient').PrismaClient} */
const prisma = new PrismaClient()

async function main() {
  //admin user seed


  //admin biodata seed

}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
