import { BaseDatabase } from "./BaseDatabase";
import { TUserDB, USER_ACCOUNT } from "../types/types";
// CRIACAO DO BASEDATABASE  serve para EXTRAIR A LOGICA ASSOCIADA A EXTRACAO DE INFO DO BANCO DE DADOS, A PARTE QUE FAZ A REQUISICAO DA INFO NAO PRECISA SABER COMO A LOGICA E EXECUTADA


export class UserDataBase extends BaseDatabase{
    public static TABLE_USERS = ("users");
    public async findUsers( q: string | undefined){
      let usersDB
      if (!q) {
        const message = "LISTA DE USERS CADASTRADO DO SISTEMA";
        const result: TUserDB[] = await BaseDatabase.
        connection(UserDataBase.TABLE_USERS).
        whereNot(
          "role",
          "LIKE",
          "Bands"
        );
         usersDB = result;    
         return usersDB
      }else {
        const result = await BaseDatabase.
        connection(UserDataBase.TABLE_USERS).
        where("name", "LIKE", `%${q}%`).
        whereNot("role", "LIKE", "Bands");
 
           usersDB = result;
           return usersDB
        }
    }
}
 

