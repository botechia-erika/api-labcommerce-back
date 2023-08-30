import { countries } from "./../data/countries.js";
const nameAdd = process.argv[2]
const codeAdd = process.argv[3]

if(!nameAdd || !codeAdd){
    console.log(' nao forneceu algum ou ambos argumentos')
}else{
    const addBananinha = {"name": nameAdd , "code": codeAdd}
    countries.push(addBananinha)
      countries.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
        console.log(countries)
}

