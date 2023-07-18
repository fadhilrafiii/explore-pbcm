const hapi = require('@hapi/hapi');
const { connectDB } = require('./repositories/db');
const paymentRoutes = require('./routes/payment');
const { migrateCreditScoringAccountsCsvToDatabase } = require('./tasks/creditScore/account');
const { migrateCreditScoringProjectsCsvToDatabase } = require('./tasks/creditScore/project');
const { migrateCreditScoringWriteOffsCsvToDatabase } = require('./tasks/creditScore/writeOff');
const { migrateAccountBillingsFromCSVToDatabase } = require('./tasks/pbcm/account');

const PORT = 8000;

const runServer = async () => {
  const server = hapi.server({
    port: PORT,
    host: "localhost",
  });

  const routes = [
    ...paymentRoutes,
  ];

  server.route(routes);
  await server.start();
  console.log(`Server is running on port ${PORT}!`);

  await connectDB();

  // TASKS
  // migrateCreditScoringProjectsCsvToDatabase();
  // migrateCreditScoringAccountsCsvToDatabase();
  // migrateCreditScoringWriteOffsCsvToDatabase();
  migrateAccountBillingsFromCSVToDatabase();
}

runServer();
