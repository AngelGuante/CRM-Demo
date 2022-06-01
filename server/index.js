const setRoutes = require('./routes');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// TO DO
// No permitir lo accesos de todos los dominios sinosolamente el de el front
app.use(cors());
app.use(express.json());

setRoutes(app);

app.listen(port, () => {
});