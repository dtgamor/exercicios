const {sql, getConnection}= require("../config/db");

const livrosModel = {
    buscarTodos: async ()=>{
        try {
            
            const pool = await getConnection();

            let querySQL = "SELECT * FROM livros;"

            const result = await pool.request().query(querySQL);

            return result.recordset
        } catch (error){
            console.error("Erro ao buscar o livro:",error);
            throw error;
        }

    },

    buscarPorTitulo: async (titulo) => {
        try {
            const pool = await getConnection();

            let querySQL = "SELECT * FROM livros WHERE titulo = @titulo;";

            const result = await pool.request()
                .input("titulo", sql.VarChar(50), titulo)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar o livro:", error);
            throw error;
        }
    },
    

    
    inserirLivro: async (titulo, anoPublicacao, qtdLivros, idAutor) => {
        try {
            const pool = await getConnection();
            let querySQL = 'INSERT INTO livros (titulo, anoPublicacao, qtdLivros, idAutor) VALUES (@titulo, @anoPublicacao, @qtdLivros, @idAutor)';
            
            await pool.request()
                .input('titulo', sql.VarChar(50), titulo)
                .input('anoPublicacao', sql.VarChar(4), anoPublicacao)
                .input('qtdLivros', sql.Int, qtdLivros)
                .input('idAutor', sql.UniqueIdentifier, idAutor)
                .query(querySQL);

        } catch (error) {
          console.error('Erro ao inserir livro:', error);
          throw error;
        }
    }
};

module.exports = {livrosModel};