## API Reference
### Produtos

#### GET /produtos
- **Descrição**: Obtém uma lista de produtos
- **Response**: Array de produtos

```
{
"message": "Erro ao buscar produtos."
}
```
#### POST /produtos
- **Descrição**: Cria um novo produto
- **Body**:
```
{
"nomeProduto": "produtoExemplo",
"precoProduto": 0.00
}
```
- **Response**:
```
{
"message": "Produto cadastrado com sucesso!"
}
```
- **Errors**

```
{
"message": "'Campos obrigatórios não preenchidos!"
}
```
```
{
"message": "Erro ao buscar produtos."
}
```
### Clientes

#### GET /clientes
- **Descrição**: Obtém a lista de clientes
- **Response**: Array de clientes ou erro
#### POST /clientes
- **Descrição**: Cadastra um novo cliente
- **Body**:
```
{
"nomeCliente": "Nome_Cliente",
"cpfCliente": "xxx.xxx.xxx-xx"
}
```
- **Response**:

```
{
"message": "Cliente cadastrado com sucesso!"
}
```
- **Errors**

```
{
"message": "Campos obrigatórios não preenchidos!"
}
```
```
{
"message": "Esse CPF já esta sendo utilizado!"
}
```
```
{
"message": "Erro ao cadastrar cliente."
}
```
