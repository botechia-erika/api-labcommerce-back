import { countries } from "./../data/countries.js";
const query = process.argv[2]
//npm run start brasil
console.log(query)



const firstLetter = countries.filter(country=>country.name[0].toLowerCase() === query.toLocaleLowerCase())
// npm run start2 b --> agregar em script ja parametro b
console.log(firstLetter)

