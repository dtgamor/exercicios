const express = require("express");
const app = express();
const PORT = 8080;
const fs = require("fs");

app.get("/produtos", (req, res) => {

    try {

        const data = fs.readFileSync("produtos.json", "utf-8");
        let produtos = JSON.parse(data); 
    
        const {nomeProduto} = req.query;
        const {vlProduto, vlMin, vlMax} = req.query;

        if (
            (vlProduto && isNaN(Number(vlProduto))) ||
            (vlMin && isNaN(Number(vlMin))) ||
            (vlMax && isNaN(Number(vlMax)))
        ) {
            return res.status(400).json({ error: "Os parâmetros vlProduto, vlMin e vlMax devem ser valores numéricos." });
        }
  

        if (vlMin) {
            produtos = produtos.filter(produto => produto.preco >= vlMin);
        }

        if (vlMax) {
            produtos = produtos.filter(produto => produto.preco <= vlMax);
        }
        
        if (vlProduto) {
            produtos = produtos.filter(produto => produto.preco == vlProduto); 
        }

        if (nomeProduto) {
            
            produtos = produtos.filter(produto => produto.nome.toLowerCase().includes(nomeProduto.toLowerCase()));
        } 

        res.status(200).json(produtos);

    } catch (error) {
        console.error("Erro ao ler o arquivo de produtos:", error);
        res.status(500).json({ error: "Erro ao ler o arquivo de produtos." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});