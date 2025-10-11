const express = require("express");
const router = express.Router();
const {produtoController} = require("../controllers/produtoController");
const {clienteController} = require("../controllers/clienteController");

//GET /produtos -> listar todos os produtos
router.get('/produtos', produtoController.listarProdutos);
router.post('/produtos', produtoController.criarProduto);
router.get('/clientes', clienteController.listarclientes);
router.post('/clientes', clienteController.cadastrarcliente);

module.exports = {produtoRoutes: router};