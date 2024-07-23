const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const useRoutes = require('./routes/userRoutes');

const PORT = 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', useRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Database and tables synced');
  })
  .catch((err) => {
    console.log('Error syncing database', err);
  });

const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

module.exports = { app, server };
