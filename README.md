# api-labcommerce-back
 lbn projeto backend 2023 refatorizado


## REGRA DE NEGOCIO IMPLEMENTADA

## LABECOMMERCE - LabeFrota
### EMPRESA
- Locadora de carros por periodo mensal

## CATEGORIAS
- Description: Corresponde a categoria dos carros podendo ser:  
    1. "Light": Populares com mensalidade até R$1600
    2. "Hatch": Hatch com mensalidade entre R$1601-2400
    3. "Sedan": Sedan com mensalidade entre R$2401-R$2700
    4. "Prime" Prime com mensalidade entre R$2701-R$2900
    5. "Lux": Lux com mensalidade acima de R$2900
* Representados por **ENUM DESCRIPTION_CATEGORY**
* Clasificados de forma automatica por função Helper (matchDescriptionCategory(newPrice)) por if else condicional

## PRODUTOS
1. **CADASTRO DE PRODUTOS**
- Desde body do cliente deve receber as seguintes informações para **cadastro** em forma de objeto json (pode ser accesado por parametro name de formularios com req.body.nomeCampoEquivalente):
    - placa: Deve ter formato AAA-0000 e não estar cadastrada equivale ao 
       id da DB e ingresa em backend como newPlaca para sofrer validações ate ser inserida como id 
    - modelo  marca ano: O conjunto de esses 3 dados formam o nome do produto inserido em base de dados e deve ser equivalente a string, isso facilita futuras filtragens de busca por modelo, marca ou ano.
    - image_url: ingresa como newImage e é validada por um RegEx para url validas,
    - price: valor numerico ingressado como newPrice que ademas de determinar preço mensal do produto serve de parametro para função matchDescriptionCategory que determina a descrição do produto e essa é equivalente a categoria pré estabelecida em explicação anteriormente citada (CATEGORIAS)

## PURCHASES 
- Oferece opções de pagamento com desconto e com acréscimo
  1. Á VISTA: 



## OBJETIVOS
- [x] Get all users
- [x]  Create user
- [x]  Create product
- [x]  Get all products funcionalidades 1 e 2
- [x]  Edit product by id
- [x]  Create purchase
- [x]  Delete purchase by id
- [x]  Get purchase by id


## Collection: **Users**
----

## 1 - getAllUsers || getSearchName

### 1.1 getAllUsers
**descrição:** Esta requisição usa o metodo get e retorna um array com todos os usuarios cadastrados já que não apresenta nenhuma query de busca por nome o fluxo ocorre da seguinte maneira:

metodo HTTP: <span class="get">GET</span>   
endpoint:    
````curl  --location 'http://localhost:3003/users'````   
Output:
Body Array em formato JSON formado por TUsers onde cada user segue o formato explicativo de equivalencias a seguir:   

```JSON
[
    {
        "id" : "string",
        "name": "string",
        "email": "string@email.com",
        "password": "string-8a12caracteres-1maiuscula-1num-1especial",
        "created_at": "data de criação"
    }
]
