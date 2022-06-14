// load environment variables from .env file
if (!process.env.LOADED_ENV) {
  process.env.ROOT_PATH = __dirname;
  require('dotenv').config({ path: process.env.ROOT_PATH + '/.env' });
  process.env.APP_NAME = process.env.APP_NAME ? process.env.APP_NAME : 'SecondHand';
}

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "7.7.7",
    title: "SecondHand",
    description:
      "SecondHand - API Documentation",
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ["http", "https"],
  consumes: [
    "application/json",
    "application/x-www-form-urlencoded",
    "multipart/form-data"
  ],
  produces: ["application/json"],
  definitions: {},
  securityDefinitions: {
    token: {
      type: "apiKey",
      name: "token",
      in: "header",
      description: "A valid token is required to access some resource",
    }
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/api.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./bin/www");
});
