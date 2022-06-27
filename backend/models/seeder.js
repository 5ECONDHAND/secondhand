const { PrismaClient } = require('./pgclient')

/** @type {import('./pgclient').PrismaClient} */
const prisma = new PrismaClient()

async function main() {
  //category seed
  await prisma.category.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Hobi'
      },
      {
        name: 'Kendaraan'
      },
      {
        name: 'Baju'
      },
      {
        name: 'Elektronik'
      },
      {
        name: 'Kesehatan'
      }
    ]
  }).catch(err => {
    console.log(err)
  });
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
