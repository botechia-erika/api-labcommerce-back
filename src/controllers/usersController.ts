import { Request, Response } from "express"
import { db } from "../models/knexDB"
import {v4 as uuidv4} from 'uuid';
import { createId } from "../helpers/getIdB";

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
        const newId = req.body.cpfCnpj as string | undefined
        const name = req.body.name as string | undefined
        const nickname = req.body.nickname as string
        const email = req.body.email
        const password = req.body.password

        
        if(newId === undefined){
            res.status(400)
            throw new Error("400 : 'cpf' ou 'cnpj' deve ser informado em cadastro")
        }
     
        const [userExists] = await db.raw(`SELECT id FROM users WHERE id="${newId}"`)
        if(userExists){
            res.status(400)
            throw new Error("id já esta em uso")
        }
        const [emailExists] = await db.raw(`SELECT email FROM users WHERE id="${newId}"`)
        if(emailExists){
            res.status(400)
            throw new Error("id já esta em uso")
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
			throw new Error("'password ' deve ser uma string")
		}
	
		// o método de string .match() verifica se existe o padrão,
		// caso exista ele retorna um array com os valores encontrados
		// caso não exista ele retorna null (por isso o !)
		if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
			throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
		}


        const newAuthor: {id:string, name: string, nickname: string, email: string, password: string } = {
            id:newId,
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

export const editUserById = (async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newName = req.body.name as string | undefined
        const newNickname = req.body.nickname as string | undefined
        const newEmail  = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        if (newName) {
            if (typeof newName !== "string") {
                res.status(400);
                throw new Error("Nome do produto deve ser do tipo string");
            }
        }

        if (newNickname) {
            if (typeof newNickname !== "string") {
                res.status(400);
                throw new Error("Descrição deve ser do tipo string");
            }
        }

        if (newEmail) {
            if (typeof newEmail !== "string") {
                res.status(400);
                throw new Error("Novo email deve ser de tipo string");
            }
        }

        if(newPassword){
        if (typeof newPassword == "string") {
			throw new Error("'new password ' deve ser uma string")
		}
        }
        if(newPassword){
		// o método de string .match() verifica se existe o padrão,
		// caso exista ele retorna um array com os valores encontrados
		// caso não exista ele retorna null (por isso o !)
		if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
			throw new Error("'new password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
		}

    }
        const [user4edit] = await db.raw(`SELECT * FROM users WHERE users.id=${id}`);
        if ([user4edit]) {
            user4edit.id = id,
            user4edit.name = newName || user4edit.name,
            user4edit.nickname = newNickname || user4edit.nickname,
            user4edit.email = newEmail || user4edit.email,
            user4edit.password= newPassword || user4edit.password,
        
    
                await db("users").update(user4edit).where({id :`${id}`})

                res.status(201).send({message: "user atualizado com sucesso", result: user4edit})
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
});



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