const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/user');

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});