import { Band } from "../models/Band"
import { BaseDatabase } from '../database/BaseDatabase';
import { Knex } from "knex";

export  class BandsBusiness{  

    public async getAllBands(q:string | undefined):Promise<Band[]>{
         try {
               const q = req.query.q as string || undefined
                if(!q){
                 const result = await BaseDatabase.connection Knex.raw(`
                SELECT * FROM TABLE_USERS
                INNER JOIN bands
                ON bands.name = users.name
               where users.role = "Bands";
                `)
            }
            if(q && q.length <= 1 ){
                res.status(400)
                throw new Error('"400": Pesquisa deve ter ao menos 1 caracter')
            }
        
            
            if(q){
                const [result]  = await db("bands").where("NAME" ,"LIKE" , `%${q}%`);
             
                if(!result){
                    res.status(404);
                    throw new Error("'404': BANDA NÃO ENCONTRADA")
            
                }
                export class Band{
                    private  id:string;
                    private name:string;
                    private nickname: string;
                    private email : string;
                    private password :string;
                    private countryCode: string;
                    private createdAt: string
            }
    }


}