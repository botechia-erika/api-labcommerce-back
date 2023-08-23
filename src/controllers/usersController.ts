import { Request, Response } from "express"
import { db } from "../models/knexDB"
import {v4 as uuidv4} from 'uuid';

export const getAllUsers =( async (req: Request, res: Response) => {
    try {
       const searchTerm = req.query.q as string | undefined
        if(searchTerm === undefined){
        const message = "LISTA DE USERS CADASTRADO DO SISTEMA"
        const result = await db("users")
        res.status(200).json({ result})
    }else{
    
       const [result] =await db("users").where("name", "LIKE" , `%${searchTerm}%`)
        if(![result]|| result == null){
            res.status(404).json({message: "USER NÃO ENCONTRADO"})     
        }else{
        res.status(200).json({result : [result], message: "USER ENCONTRADO"})
    }
}}
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
});


export const getUserById = ( async (req: Request, res: Response) => {
    const id = req.params.id as string | undefined

    try {
        if (id==="" || id === undefined) {
     
            res.json({ message: "ID DE USUARIO DEVE SER INFORMADO PARA BUSCA" })
        }
        else{
            const [result] = await db.raw(`SELECT * FROM users WHERE id="${id}"`)

            if(result && result != undefined) { 
                res.status(200).json({ message: "USUARIO ENCONTRADO" , result: result })
               
        }
        else {
            res.status(404).json({message: "USER não encontrado"})
        }
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





export const createUser = ( async (req: Request, res: Response) => {

    try {
        const newId = req.body.id as string | undefined
        const name = req.body.name
        const nickname = req.body.nickname
        const email = req.body.email
        const password = req.body.password

        
        const getIdb = () =>
        {if(newId == undefined){
          
        const idB = uuidv4()
            return idB
        }else{
        const idB = newId
        return idB
        }
    }

        if (typeof name !== "string") {
            res.status(400).send({ message: 'nome invalido' })
        }
        if (typeof nickname !== "string") {
            res.status(400).send('nickname alfa-numerico')
        }
        if (typeof email !== "string") {
            res.status(400).send('email invalido')
        }
        if (typeof password !== "string") {
            res.status(400).send("outra senha essa é invalida tente alfa-numerico")
        }


        const newAuthor: {id:string, name: string, nickname: string, email: string, password: string } = {
            id:getIdb(),
            name,
            nickname,
            email,
            password
        }
        await db("users").insert(newAuthor)
        res.status(201).json({message: "usuario cadastrado com sucesso"})
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
})
export const destroyUser = ( async (req: Request, res: Response) => {

    try {
        const idToDelete = req.params.id

        const [users] = await db("users").where({ id: idToDelete })
        if (!users) {
            throw new Error("usuario  nao encontrado")
        }
        await db("users").delete().where({ id: idToDelete })
        res.status(200).json({ message: 'users deletado com sucesso' })
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