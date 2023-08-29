import { Request, Response } from "express"
import {v4 as uuidv4} from 'uuid';
import { accounts } from "../dataTS/accounts";
import { ACCOUNT_TYPE, TAccount } from "../types/types";
import { createId } from "../helpers/createId";
import fs from 'fs'
import path from 'path'
const accountsFilePath = path.join(__dirname, './../../json/dataAccounts.json')
const accountsDATA = JSON.parse(fs.readFileSync(accountsFilePath, 'utf-8'))


export const getAllAcounts = ( async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string | undefined      
        if (q === undefined) {
            res.status(200).json( accountsDATA )
        }else {
           function buscaAccountOwner(accountsDATA:TAccount[], q:string){
                return accountsDATA.filter(
                    (account)=>{
                        if( account.ownerName.toUpperCase().includes(q.toUpperCase())){
                            return account
                        }
                    }
                )
            }
            const [result] = buscaAccountOwner(accountsDATA, q)
            if(!result){
                res.status(404)
                throw new Error("404 owner NÃO encontrado, insira um nome cadastrado")  
            }
res.status(200).json({ message: "'NOME' do ownwer encontrado no nosso sistema" , result})
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
   
    if(id[0] !== "a"){
        res.status(400)
        throw new Error("'id' deve começar com letra 'a'")
    }

    const result = accounts.find((account)=>account.id === id)

    if(!result){
        // res.statusCode = 404 tbm funciona
        res.status(404)
        throw new Error( "404: conta NÃO encontrada, verifique o Id")  
    }

        res.status(200).json({ message: "conta encontrado no nosso sistema" , result})
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
 
        const newId = req.body.idb as string ||undefined
        const newOwner = req.body.ownerName as string 
        const newBalance = req.body.balance as number 
        const newType = req.body.type as   ACCOUNT_TYPE.BLACK|ACCOUNT_TYPE.BRONZE | ACCOUNT_TYPE.GOLD | ACCOUNT_TYPE.PLATINUM|ACCOUNT_TYPE.SILVER

        
      const idAccount =  accountsDATA.length+1

      const defineIdAccount = (idAccount:number)=>{
      if(idAccount < 10){
        const id = "a00" + idAccount
        return id
      }else if(idAccount<100){
        const id = "a0" + idAccount
        return id
      }else if(idAccount>100){
        const id = "a" + idAccount
      }
    }
      
    if(newBalance < 0 ){
        res.send(400)
        throw new Error('transação invalida a conta não pode começar em negativo')
    }

        const newAccount:TAccount = {
            id:defineIdAccount(idAccount) + createId(newId),
            ownerName: newOwner,
            balance: newBalance,
            type: newType
        }
        if(newAccount['id'] !== "a"){
            res.status(400)
            throw new Error("'id' deve começar com letra 'a'")
        }
    
        accountsDATA.push(newAccount)
        fs.writeFileSync(accountsFilePath, JSON.stringify(accountsDATA, null, 4), 'utf8');

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

        if(id[0] !== "a"){
            res.status(400)
            throw new Error("'id' deve começar com letra 'a'")
        }
        if(owner4Edit.length < 1){
            res.status(400)
            throw new Error("nome do 'owner' deve ter ao menos 2 'caracteres'")
        }
        if(balance4Edit < 0){
            res.status(400)
            throw new Error("'balance' deve ser 0 ou positivo")
        }

        const account4edit = accounts.find((account)=> account.id === id)

        if(!account4edit){
            res.status(404)
            throw new Error ( '404: account NÃO ENCONTRADA, VERIFICAR ID correto para Atualização')
        }
    
            account4edit.id = id
            account4edit.ownerName = owner4Edit || account4edit.ownerName   
            account4edit.balance = balance4Edit || account4edit.balance 
            account4edit.type = type4Edit || account4edit.type     
            res.status(200).json({ message: 'account atualizado com sucesso', account4edit})
     

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
export const destroyAccount = (async (req: Request, res: Response) => {
 
try{
    const idToDelete = req.params.id

    // importante regra de negocio economiza consulta a banco de dado
    
    if(idToDelete[0] !== "a"){
        res.status(400)
        throw new Error("'id' deve começar com letra 'a'")
    }

    // encontrar o index do item que será removido
    const result = accountsDATA.findIndex((account:TAccount) => account.id === idToDelete)
    
    if(result===-1){
        res.status(404)
        throw new Error( "404: conta NÃO encontrada, verifique o Id")  
    }
    // caso o item exista, o index será maior ou igual a 0

    if (result>=0) {
    // remoção do item através de sua posição
    accountsDATA.splice(result, 1)
    }

    res.status(200).send("'account' deletado com sucesso")

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
