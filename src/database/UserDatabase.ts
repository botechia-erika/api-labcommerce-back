import { TUserDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"
    public async findUsers (q:string | undefined){  
        let usersDB
        if (!q) {
            const result: TUserDB[] = await BaseDatabase.
            connection(UserDatabase.TABLE_USERS).
            whereNot("role", "LIKE" , "Bands")
            let usersDB = result;
            return usersDB
        }else {
            const result: TUserDB[] = await BaseDatabase.
            connection(UserDatabase.TABLE_USERS).
            where("name", "LIKE",`%${q}%`).
            whereNot("role", "LIKE" , "Bands")
      
             let userDB = result
             return userDB
        }
    return usersDB
    }     
}