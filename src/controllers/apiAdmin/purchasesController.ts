import { Request, Response } from "express";
import { db } from "../../models/knexDB";
import { createId } from "../../helpers/createId";
import { User } from "../../models/User";
import { Phone } from "../../models/Phone";
import { Account } from "../../models/Account";
import { ROLE, TUserDB } from "../../types/types";
// backend
// importar db, Buyer, Phone


// dados do usuarioexport const createPurchase = ( async (req: Request, res: Response) => {
            try {
                // dados do cliente
                const cpfCnpj = req.body.inputCpfCnpj as string
                const name = req.body.inputName as string | undefined
                const nickname = req.body.inputNickname as string|undefined
                const email = req.body.inputEmail as string | undefined
                const password = req.body.inputPassword as string | undefined
                const role = req.body.inputRole as string | undefined
                const avatar = req.body.inputAvatar as string | undefined
                
                                                       
                // dados do produto
                const purchaseId = req.body.inputId   as string 
                const purchaseProduct = req.body.inputProduct   as string 
                const quantity = req.body.inputQuantity as number
                const finalPrice = req.body.inputFinalPrice as number 
                const createdAt = new Date().toISOString()               
               // dados valores de pagamento
                const totalPaid = req.body.inputTotalPaid as number
                const rest2Pay = finalPrice - totalPaid as number

                // dados criação da conta de nova aluguel
                const newAccountId = req.body.accountId as undefined
                const balance = rest2Pay
                const ownerId = req.body.inputOwnerId as string | undefined
                
                const defineOwnerId = (ownerId:string|undefined)=>{
                if(!ownerId){
                   const  newOwner = cpfCnpj
                   return newOwner
                }else{
                    const newOwner = ownerId
                    return newOwner
                }
            }
               
            res.send(200).json({message: "cadastro realizado com sucesso" })
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
/* 

export const destroyPurchase = ( async (req: Request, res: Response) => {

        try {
            const id4Delete = req.params.id
    
            const [purchaseDelete] = await db("purchases").where({ id: id4Delete })
            
            if (!purchaseDelete) {
                res.status(404);
                throw new Error("purchase  nao encontrado")
            }
            await db.raw(`DELETE FROM products_purchases WHERE purchases_id="${purchaseDelete}"`)
            res.status(200).json({ message: 'pedido cancelado com sucesso' })
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
    })*/
