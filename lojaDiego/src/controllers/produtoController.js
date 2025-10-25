const {produtoModel} = require("../models/produtoModel")

const produtoController ={

    listarProdutos: async (req, res)=>{
        try {
            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);
        }catch (error){
            console.error('Erro ao listar produtos:',error);
            res.status(400).json({error: 'Erro ao buscar produtos.'});
        }
    },

    criarProduto: async (req, res)=>{
        try {
            const {nomeProduto, precoProduto} = req.body;
            if (nomeProduto == undefined || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({erro: 'Campos obrigatórios não preenchidos!'});
            }
            
            await produtoModel.inserirProduto(nomeProduto, precoProduto);
            res.status(201).json({message: 'Produto cadastrado com sucesso!'});

        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            res.status(400).json({erro: 'Erro ao cadastrar produto.'});
        }
    },
    atualizarProduto: async (req, res)=>{
        try {
            const {idProduto} = req.params;
            const {nomeProduto, precoProduto} = req.body;
            if (idProduto.length !== 36) {
                return res.status(400).json({erro: 'ID do produto inválido!'});
            }

            const produto = await produtoModel.buscarUm(idProduto);
            if (!produto || produto.length !== 1) {
                return res.status(404).json({erro: 'Produto não encontrado!'});
            }

            const produtoAtual = produto[0];

            const novoNome = nomeProduto ?? produtoAtual.nomeProduto;
            const novoPreco = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, novoNome, novoPreco);
            res.status(200).json({message: 'Produto atualizado com sucesso!'});

        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({erro: 'Erro interno no servidor ao atualizar produto.'});
        }
    }
};

module.exports = {produtoController};