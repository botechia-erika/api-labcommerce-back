import { Response, Request } from 'express';
import { db } from '../../database/BaseDatabase';
import { Phone } from '../../models/Phone';
import { createId } from '../../helpers/createId';

export const getAllPhones = ( async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string | undefined
        let phonesDB
        if(!q){
             phonesDB = await db("*").from("phones")


            const phones:Phone[] = phonesDB.map((phoneDB)=>(
            new Phone(
                phoneDB.id,
                phoneDB.user_id,
                phoneDB.phone_number
            )
            ))       

            res.status(200).json(phones)
        }

        const [result] = await db("phones").where ("phone_number" , 'LIKE', `%${q}%`) 
        if(!result ){
            res.status(404)
            throw new Error ("'404': telefone não encontrado")
        }
        if(result){
          phonesDB = [result]
          const phones:Phone[] = phonesDB.map((phoneDB)=>(
            new Phone(
                phoneDB.id,
                phoneDB.user_id,
                phoneDB.phone_number
            )
            ))       

            res.status(200).json({ message: "telefone ENCONTRADO" , phones })
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}
)
export const getPhonesById = ( async (req: Request, res: Response) => {
    try {
        const idSearched = req.params.id

       const [phoneDB] =  await db.raw(`SELECT * FROM phones WHERE id='${idSearched}'`)

        if(!phoneDB){
            res.status(404)
            throw new Error ("'404': id não encontrado")  
        }

      const phone =new Phone(phoneDB.id,phoneDB.user_id,phoneDB.phone_number)
        
            res.status(200).json(phone)
        }
        
        catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}
)


    export const createPhone =( async (req: Request, res: Response) => {
        try {
            const createParamsId = req.body.inputId as string | undefined
            const userId = req.body.inputUserId as string | undefined
            const phoneNumber = req.body.inputTelephone as string | undefined
    
            if (createParamsId !== undefined) {
                res.status(400)
                throw new Error("'400': O ID para telefones deve ser gerado automaticamente")
            }
            else{
            const [userExists] = await db.raw(`SELECT id FROM users WHERE id="${userId}"`)
    
            const newPhone = new Phone(
                createId(createParamsId),
                userExists,
                phoneNumber
            )
        
            const insertNewPhone = await db.raw(`INSERT INTO phones`)
            
        res.status(201).json({message: "telefone cadastrado com sucesso"})
        }
    }
    catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
