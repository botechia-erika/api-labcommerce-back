import { Request, Response } from "express"
import { Account } from "../../models/Accounts";
import { accounts } from "../../dataTS/accounts";
import { ACCOUNT_TYPE, TAccountDB } from '../../types/types';
import { createId } from "../../helpers/createId";
/* import fs from 'fs'
import path from 'path'
const accountsFilePath = path.join(__dirname, 'json/dataAccounts.json')
const accountsDATA = JSON.parse(fs.readFileSync(accountsFilePath, 'utf-8')) */
import { db } from "../../models/knexDB";

export const getAllAccounts = (async (req: Request, res: Response) => {
    try {
        const accountsDB: TAccountDB[] = await db("accounts")

        const accounts = accountsDB.map((accountDB) => new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        ))

        res.status(200).send(accounts)
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

export const getAccountBalance = (async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [ accountDB ]: TAccountDB[] | undefined[] = await db("accounts").where({ id })

        if (!accountDB) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        const account = new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        )

        const balance = account.getBalance()

        res.status(200).send({ balance })
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


export const createAccount = ( async (req: Request, res: Response) => {
    try {
        const { id, ownerId } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof ownerId !== "string") {
            res.status(400)
            throw new Error("'ownerId' deve ser string")
        }

        const [ accountDBExists ]: TAccountDB[] | undefined[] = await db("accounts").where({ id })

        if (accountDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const newAccount = new Account(
            id,
            0,
            ownerId,
            new Date().toISOString()
        )

        const newAccountDB: TAccountDB = {
            id: newAccount.getId(),
            balance: newAccount.getBalance(),
            owner_id: newAccount.getOwnerId(),
            created_at: newAccount.getCreatedAt()
        }

        await db("accounts").insert(newAccountDB)

        res.status(201).send(newAccount)
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
export const editAccountBalance = ( async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const value = req.body.value

        if (typeof value !== "number") {
            res.status(400)
            throw new Error("'value' deve ser number")
        }

        const [ accountDB ]: TAccountDB[] | undefined[] = await db("accounts").where({ id })

        if (!accountDB) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        const account = new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        )

        const newBalance = account.getBalance() + value
        account.setBalance(newBalance)

        await db("accounts").update({ balance: newBalance }).where({ id })
        
        res.status(200).send(account)
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