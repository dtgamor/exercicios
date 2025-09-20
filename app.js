const express = require("express");
const app = express();
const PORT = 8080;
const fs = require("fs");

app.get("/eventos", (req, res) => {

    try {

        const data = fs.readFileSync("eventos.json", "utf-8");
        let eventos = JSON.parse(data); 
    
        const {eventoData} = req.query;

        if (eventoData) {
            eventos = eventos.filter(evento => evento.data == eventoData); 
        } 


        res.status(200).json(eventos);

    } catch (error) {
        console.error("Erro ao ler o arquivo de eventos:", error);
        res.status(500).json({ error: "Erro ao ler o arquivo de eventos." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});