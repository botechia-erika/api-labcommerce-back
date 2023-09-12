import {v4 as uuidv4} from 'uuid';

export function createId(newId:string){
if(newId == undefined){
  
const idB = uuidv4()
    return idB
}else{
const idB = newId
return idB
}
}