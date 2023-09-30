## refactor-e-instancia-user (ISSUE-BUGFIX)
----
Refatoração de codigo para evitar o uso da key name como atribuicao de key de objeto por ser uma palavra "reservada" (front faz TS atribuirla como reservada por aproximacao e troca de fluxo)
tambem evitaria problemas em hooks useForm em react 
instancia de classe para padronizar tipagem ate classe de poo-1 (pode ser que padrao volte a modificarse)

---