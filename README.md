# orange-backend-project
## Conexao com knex usando paradigma POO2

- classe abstract => class=NAO INSTANCIAVEL
- metodo protected => soment classe filha pode acessar
- metodo  static => para acessar metodo nao pode estar em uma instancia e compartilhado pela classe filha sem precisar instanciar classe

## class UserDatabase extends  BaseDatabase
- Responsavel por toda logica associada a banco de dados de forma separada a requisicao ao banco per se 
- tira a regra de bancos de dados do controller
- transforma variavel users referente a acesso a tabela users em constante publica e estatica para optimizacao de eficiencia de memoria em execucao ja que nome de tabela nunca muda e como vantagem traz que o nome da tabela podera ser acessada fora o escopo da classe facilita na manipulacao de dados em casos que query usa varios nomes de tabelas distintas



## fluxo de dados 01