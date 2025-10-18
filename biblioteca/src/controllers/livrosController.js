const {livrosModel} = require("../models/livrosModel")

const livrosController ={

    listarLivros: async (req, res) => {
        try {
            const { titulo } = req.query;

            if (titulo) {
                const livro = await livrosModel.buscarPorTitulo(titulo);

                if (!livro) {
                    return res.status(404).json({ error: "Livro não encontrado." });
                }

                return res.status(200).json(livro);
            }

            const livros = await livrosModel.buscarTodos();
            return res.status(200).json(livros);

        } catch (error) {
            console.error('Erro ao listar livros:', error);
            res.status(400).json({ error: 'Erro ao buscar livros.' });
        }
    },


    criarLivro: async (req, res)=>{
        try {
            const {titulo, anoPublicacao, qtdLivros, idAutor} = req.body;
            if (titulo == undefined || anoPublicacao == undefined || isNaN(qtdLivros || anoPublicacao == undefined)) {
                return res.status(400).json({erro: 'Campos obrigatórios não preenchidos!'});
            }
            
            await livrosModel.inserirLivro(titulo, anoPublicacao, qtdLivros, idAutor);
            res.status(201).json({message: 'Livro cadastrado com sucesso!'});

        } catch (error) {
            console.error('Erro ao cadastrar livro:', error);
            res.status(400).json({erro: 'Erro ao cadastrar livro.'});
        }
    }
};

module.exports = {livrosController};