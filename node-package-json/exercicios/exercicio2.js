/*O primeiro numero é maior que o segundo? true
O primeiro numero é igual ao segundo? false
O primeiro numero é divisível pelo segundo? true
O segundo numero é divisível pelo primeiro? true

divisível = com resto zero

Obs: A resposta (true ou false) vai depender dos números inseridos e do resultado das operações. As respostas colocadas acima são apenas exemplos!*/

const n1 = process.argv[2]
const n2 = process.argv[3]



const n1maior = (n1, n2)=>{n1>n2? n1divisiveln2(n1, n2): n1igual(n1, n2)}
const n1igual = (n1, n2)=>{n2>n1? n2divisiveln1(n1, n2): console.log('nao e numero')}
const n1divisiveln2 = (n1, n2)=>{n1/n2 >0?  console.log('n1 divisivel por n2'): console.log(false) }
const n2divisiveln1 = (n1, n2)=>{n2/n1>0? console.log('n2 divisivel n1'): console.log(false)}

n1maior(n1, n2)