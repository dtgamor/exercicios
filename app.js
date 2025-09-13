const express = require("express");
const app = express();
const PORT = 8082;

app.get('/operacao/:tipo', (req, res) => {
    try {

        const { numUm, numDois } = req.query;
        const {tipo} = req.params;
        
        if (
            isNaN(numUm) || isNaN(numDois) || tipo.includes(["soma", "subtracao", "multiplicacao", "divisao"])
        ) {
            return res.status(405).send("É obrigatório informar uma operação válida e dois números válidos");
        }
        
        const numero1 = Number(numUm);
        const numero2 = Number(numDois);
        let resultado;

        switch (tipo) {
            case "soma":
                resultado = numero1 + numero2;
                break;
            case "subtracao":
                if (numero2 < 0) {
                    return res.status(405).send("Não é possivel subtrair de um valor negativo")
                }
                resultado = numero1 - numero2;
                break;
            case "multiplicacao":
                resultado = numero1 * numero2;
                break;
            case "divisao":
                if (numero2 === 0) {
                    return res.status(405).send("Não é possível dividir por zero");
                }
                resultado = numero1 / numero2;
                break;
        }

        res.status(200).send(`Resultado da operação é: ${resultado}`);
    } catch (error) {
        console.error("Erro ao executar a operação:", error);
        res.status(500).send("Erro interno");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});