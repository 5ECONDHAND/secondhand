if(!process.env.ROOT_PATH) {
  process.env.ROOT_PATH = __dirname + '/..';
}
process.env.QUERY_DEBUG = process.env.DEBUG && process.env.DEBUG.split(',').includes('query');

const { PrismaClient } = require(process.env.ROOT_PATH + "/models/pgclient");

const opts = process.env.QUERY_DEBUG
  ? {
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
  }
  : {};

/** @type {import('./pgclient').PrismaClient} */
const prisma = new PrismaClient(opts);

if (process.env.QUERY_DEBUG) {
  prisma.$on("query", async (e) => {
    console.log(`${e.query} ${e.params}`)
  });
}

module.exports = prisma;
