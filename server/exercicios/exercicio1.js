const query = process.argv[2]

if(!query){
    console.log('ARGUMENTO NÃO INSERIDO')
}else{
    if(query % 2 === 0) {
        console.log(query +  ' é numero PAR')
    }else if(query %2 === 1){
        console.log( query + ' é numero impar')
    }else if( query !== typeof Number){
        console.log(query + ' não É numero')
    }
}