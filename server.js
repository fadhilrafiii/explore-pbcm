const hapi = require('@hapi/hapi');
const { connectDB } = require('./repositories/db');
const paymentRoutes = require('./routes/payment');
const { migrateAccountBillingsFromCSVToDatabase } = require('./tasks/account');
const { migratePaymentsFromCSVToDatabase } = require('./tasks/payment');

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
  await migratePaymentsFromCSVToDatabase();
  // await migrateAccountBillingsFromCSVToDatabase();
}

runServer();
