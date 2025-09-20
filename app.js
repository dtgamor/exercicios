const express = require("express");
const app = express();
const PORT = 8080;
const fs = require("fs");

app.get("/usuarios", (req, res) => {

    try {

        const data = fs.readFileSync("usuarios.json", "utf-8");
        let usuarios = JSON.parse(data); 
    
        const {nomeUsuario} = req.query;

        if (nomeUsuario) {
            usuarios = usuarios.filter(usuario => usuario.nome.toLowerCase().includes(nomeUsuario.toLowerCase()));
        } 


        res.status(200).json(usuarios);

    } catch (error) {
        console.error("Erro ao ler o arquivo de produtos:", error);
        res.status(500).json({ error: "Erro ao ler o arquivo de produtos." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});