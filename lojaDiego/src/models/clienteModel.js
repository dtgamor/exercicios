const {sql, getConnection}= require("../config/db");

const clienteModel = {
    buscarTodos: async ()=>{
        try {
            
            const pool = await getConnection();

            let querySQL = "SELECT * FROM Clientes;"

            const result = await pool.request().query(querySQL);

            return result.recordset
        } catch (error){
            console.error("Erro ao buscar clientes:",error);
            throw error;
        }

    },

    buscarPorCPF: async (cpfCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = "SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente";
            const result = await pool.request()
                .input('cpfCliente', sql.VarChar(14), cpfCliente)
                .query(querySQL);
            return result.recordset[0];

        } catch (error) {
            console.error("Erro ao buscar cliente por CPF:", error);
            throw error;
        }
    },

    cadastrarCliente: async (nomeCliente, cpfCliente) => {
        try {
            const pool = await getConnection();
            let querySQL = 'INSERT INTO clientes (nomeCliente, cpfCliente) VALUES (@nomeCliente, @cpfCliente)';
            
            await pool.request()
                .input('nomeCliente', sql.VarChar(100), nomeCliente)
                .input('cpfCliente', sql.VarChar(14), cpfCliente)
                .query(querySQL);

        } catch (error) {
          console.error('Erro ao cadastrar cliente:', error);
          throw error;
        }
    }

};

module.exports = {clienteModel};