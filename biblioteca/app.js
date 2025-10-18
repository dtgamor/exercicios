const express = require("express");
const app = express();
const {livrosRoutes} = require("./src/routes/livrosRoutes");
const PORT = 8081;

app.use(express.json());

app.use('/',livrosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
