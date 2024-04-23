const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.use(cors());

const tableRoutes = require('../routes/table');
app.use(tableRoutes);

app.listen(port, () => {
  console.log(Server is running on port ${port});
});