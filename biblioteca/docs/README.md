## API Reference
### Livros

#### GET /livros
- **Descrição**: Obtém uma lista de livros
- **Response**: Array de livros

```
{
"message": "Erro ao buscar livros."
}
```
#### GET /livros?titulo=livro3
- **Descrição**: Obtém dados de um livro específico Ex. Livro3
- **Response**: Array com dados do livro solicitado

```
{
"message": "Erro ao buscar livros."
}
```

#### POST /livros
- **Descrição**: Cadastra um novo livro
- **Body**:
```
{
	"titulo": "livro4",
	"anoPublicacao": "1900",
	"qtdLivros": 10,
	"idAutor": "23F60E01-F7C3-4303-935B-9803EB38EECC"
}
```
- **Response**:
```
{
"message": "Livro cadastrado com sucesso!"
}
```
- **Errors**

```
{
"message": "'Campos obrigatórios não preenchidos!"
}
```
```