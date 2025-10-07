const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getUsers, createUser } = require('./controllers/userController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/users', getUsers);
app.post('/users', createUser);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
