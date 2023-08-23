import { Request, Response } from "express"
import {v4 as uuidv4} from 'uuid';
import { accounts } from "../dataTS/accounts";
import { ACCOUNT_TYPE, TAccount } from "../types/types";
import { createId } from "../helpers/getIdB";

export const getAllAcounts = ( async (req: Request, res: Response) => {


    try {
        const q = req.query.q as string | undefined      
        if (q === undefined) {
           
            
            res.status(200).json( accounts )
        }else {
          

           function buscaAccountOwner(accounts:TAccount[], q:string){
                return accounts.filter(
                    (account)=>{
                        if( account.ownerName.toUpperCase().includes(q.toUpperCase())){
                            return account
                        }
                    }
                )
            }
            const [result] = buscaAccountOwner(accounts, q)
            if(result){
                res.status(200).json({ message: "owner tem conta no nosso sistema" , result})

             
            }else{
                res.status(200).json({result: null, message: "owner NÃO encontrado"})  
             
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
})


export const getAccountById = (async (req: Request, res: Response) => {
    try{

        const id = req.params.id as string
    function buscaAccountPorId(accounts:TAccount[], id:string){
        return accounts.filter(
            (account)=>{
                if( account.id === (id)){
                    return account
                }
            }
        )
    }
    const [result] = buscaAccountPorId(accounts, id)
    if(result){
        res.status(200).json({ message: "conta encontrado no nosso sistema" , result})

     
    }else{
        res.status(200).json({result: null, message: "conta NÃO cadastrada"})  
 
    }
}catch (error) {
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

export const destroyAccount = (async (req: Request, res: Response) => {
    // identificação do que será deletado via path params
try{
    const idToDelete = req.params.id

    // encontrar o index do item que será removido
const getIndex = accounts.findIndex((account) => account.id === idToDelete)

    // caso o item exista, o index será maior ou igual a 0
if (getIndex != null) {
            // remoção do item através de sua posição
    accounts.splice(getIndex)


res.status(200).send("account deletado com sucesso")
}
}catch (error) {
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

export const createAccount =( async (req: Request, res: Response) => {
  

    try {
 
        const newId = req.body.id as string 
        const newOwner = req.body.ownerName as string 
        const newBalance = req.body.balance as number 
        const newType = req.body.type as   ACCOUNT_TYPE.BLACK|ACCOUNT_TYPE.BRONZE | ACCOUNT_TYPE.GOLD | ACCOUNT_TYPE.PLATINUM|ACCOUNT_TYPE.SILVER

        
      const id = createId(newId)

        const newAccount:TAccount = {
            id,
            ownerName: newOwner,
            balance: newBalance,
            type: newType
        }

        accounts.push(newAccount)

        res.status(201).json({ message: 'account agregado com sucesso', newAccount})
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

export const editAccount =( async (req: Request, res: Response) => {
  

    try {
 
        const id = req.params.id as string 
        const owner4Edit = req.body.ownerName as string  | undefined
        const balance4Edit = req.body.balance as number | undefined
        const type4Edit = req.body.type as   ACCOUNT_TYPE | undefined

        
        const account4edit = accounts.find((account)=> account.id === id)

        if(account4edit){
            account4edit.id = id
            account4edit.ownerName = owner4Edit || account4edit.ownerName   
            account4edit.balance = balance4Edit || account4edit.balance 
            account4edit.type = type4Edit || account4edit.type     
            res.status(200).json({ message: 'account atualizado com sucesso', account4edit})
        }else{        
        res.status(200).json({ message: 'account NÃO ATUALIZADO, reveja os dados', account4edit})
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
})