const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8081;
const file = "./livros.json";

app.use(express.json());

if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '[]');
}

app.post("/cadastro-livro", (req, res) => {
    try {
        const { titulo, autor, anoPublicacao, qtdExemplares } = req.body;
        if (
            typeof titulo !== 'string' || 
            titulo.trim() === '' ||
            typeof autor !== 'string' || 
            autor.trim() === '' ||
            isNaN(Number(anoPublicacao)) ||
            isNaN(Number(qtdExemplares))
        ) {
            return res.status(400).json({ message: "Campos obrigatórios não preenchidos ou inválidos!" });
        }

        const data = fs.readFileSync(file, "utf-8");
        let livros = JSON.parse(data);


        const maxId = livros.reduce((max, livro) => Math.max(max, livro.id), 0);

        const novoLivro = {
            id: maxId + 1,
            titulo: titulo.trim(),
            autor: autor.trim(),
            anoPublicacao: Number(anoPublicacao),
            qtdExemplares: Number(qtdExemplares)
        };

        livros.push(novoLivro);

        fs.writeFileSync(file, JSON.stringify(livros, null, 4));

        res.status(201).json({
            message: `Livro "${titulo}" cadastrado com sucesso!`,
            livro: novoLivro
        });

    } catch (error) {
        console.error(`Erro ao cadastrar livro: ${error}`);
        res.status(500).json({ message: "Erro interno no servidor!" });
    }
});

app.get("/catalogo", (req, res) => {
    try {
        const { titulo } = req.query;

        const dados = fs.readFileSync(file, "utf-8");
        let catalogoLivros = JSON.parse(dados);

        if (titulo) {
            catalogoLivros = catalogoLivros.filter(livro =>
                livro.titulo.toLowerCase().includes(titulo.toLowerCase())
            );
        }

        res.status(200).json(catalogoLivros);

    } catch (error) {
        console.error(`Erro ao buscar livros: ${error}`);
        res.status(500).json({ message: "Erro interno no servidor!" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
