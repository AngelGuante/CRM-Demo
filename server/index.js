const setRoutes = require('./routes');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

setRoutes(app);

app.listen(port, () => {
});