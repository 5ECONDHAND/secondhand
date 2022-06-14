const { PrismaClient } = require(process.env.ROOT_PATH + "/models/pgclient");

/** @type {import('./pgclient').PrismaClient} */
const prisma = new PrismaClient();

module.exports = prisma;
