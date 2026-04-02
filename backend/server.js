require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./models');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hardware store backend is running');
});

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected successfully');

    await db.sequelize.sync({ alter: true });
    console.log('Database synchronized');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();