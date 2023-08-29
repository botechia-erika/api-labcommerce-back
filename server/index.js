
import colors from 'colors';
colors.enable()
import { countries } from "./data/countries.js";
/*exercicio 01 - procurar um pais na lista*/
const query = process.argv[2]
const query2 = process.argv[3]




if(!query | !query2){
    console.log('argumento nao registrado')
}else{
  const result = countries.find(country=>country.name.toUpperCase().includes(query.toUpperCase()))
  const p2 = countries.find(country2=>{country2.name.toUpperCase().includes(query2.toUpperCase())})
 console.log('pais buscado 1 \n'.bgBlue + query.toUpperCase().bgGreen + '\n' + ' pais buscado 2 '.bgBlue +"\n" + query2.toUpperCase().bgGreen )  
}
