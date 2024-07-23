const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5000;

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('hello world');
});

sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.log('Error while syncing to the database:', error);
  });

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

module.exports = { app, server };
