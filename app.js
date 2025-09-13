const express = require("express");
const app = express();
const PORT = 8080;


//SOMA
app.get('/soma/:numUm/:numDois', (req, res) => {
    try {
        const { numUm, numDois } = req.params;

        const numero1 = Number(numUm);
        const numero2 = Number(numDois);

        if (isNaN(numero1) || isNaN(numero2)) {
            return res.status(400).send(`É obrigatório informar dois números válidos.`);
        }

        const resultado = numero1 + numero2;

        res.status(200).send(`Resultado da soma é: ${resultado}`);

    } catch (error) {
        console.error("Erro ao executar a operação:", error);
        res.status(500).send(`Erro interno`);
    }
});

//SUBTRAÇÃO
app.get('/subtracao/:numUm/:numDois', (req, res) => {
    try {
        const { numUm, numDois } = req.params;

        const numero1 = Number(numUm);
        const numero2 = Number(numDois);

        if (isNaN(numero1) || isNaN(numero2)) {
            return res.status(400).send(`É obrigatório informar dois números válidos.`);
        }

        const resultado = numero1 - numero2;

        res.status(200).send(`Resultado da subtração é: ${resultado}`);

    } catch (error) {
        console.error("Erro ao executar a operação:", error);
        res.status(500).send(`Erro interno`);
    }
});

//MULTIPLICAÇÃO
app.get('/multiplicacao/:numUm/:numDois', (req, res) => {
    try {
        const { numUm, numDois } = req.params;

        const numero1 = Number(numUm);
        const numero2 = Number(numDois);

        if (isNaN(numero1) || isNaN(numero2)) {
            return res.status(400).send(`É obrigatório informar dois números válidos.`);
        }

        const resultado = numero1 * numero2;

        res.status(200).send(`Resultado da multiplicação é: ${resultado}`);

    } catch (error) {
        console.error("Erro ao executar a operação:", error);
        res.status(500).send(`Erro interno`);
    }
});

//DIVISÃO
app.get('/divisao/:numUm/:numDois', (req, res) => {
    try {
        const { numUm, numDois } = req.params;

        const numero1 = Number(numUm);
        const numero2 = Number(numDois);

        if (isNaN(numero1) || isNaN(numero2) || (numero1) != 0 || (numero2) !=0) {
            return res.status(400).send(`É obrigatório informar dois números válidos e maiores que 0.`);
        }

        const resultado = numero1 / numero2;

        res.status(200).send(`Resultado da divisão é: ${resultado}`);

    } catch (error) {
        console.error("Erro ao executar a operação:", error);
        res.status(500).send(`Erro interno`);
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
