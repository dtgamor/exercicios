const {clienteModel} = require("../models/clienteModel")

const clienteController ={
    //------------------------
    //listar todos os clientes
    //GET /clientes
    //------------------------

    listarclientes: async (req, res)=>{
        try {
            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);
        }catch (error){
            console.error('Erro ao listar clientes:',error);
            res.status(500).json({error: 'Erro ao buscar clientes.'});
        }
    },

    cadastrarcliente: async (req, res)=>{
        try {
            const {nomeCliente, cpfCliente} = req.body;
                if (nomeCliente == undefined || cpfCliente == undefined /*|| cpfCliente == */) {
                    return res.status(400).json({erro: 'Campos obrigatórios não preenchidos!'});
                }

                const clienteExistente = await clienteModel.buscarPorCPF(cpfCliente);
                if (clienteExistente) {
                return res.status(409).json({ erro: 'Esse CPF já esta sendo utilizado!' });
            }

                await clienteModel.cadastrarCliente(nomeCliente, cpfCliente);
                res.status(201).json({message: "Cliente cadastrado com sucesso!"})

            } catch (error) {
                console.error('Erro ao cadastrar cliente:', error);
                res.status(500).json({erro: 'Erro ao cadastrar cliente.'});
            }
    }
};

module.exports = {clienteController};