import { countries } from "./../data/countries.js";

/*exercicio 01 - procurar um pais na lista*/
const query = process.argv[3]
//npm run start brasil

console.log(query)
if(!query){
    console.log('argumento nao registrado')
}else{
  const result = countries.find(country=>country.name.toUpperCase().includes(query.toUpperCase()))
    console.log(result)  
}


