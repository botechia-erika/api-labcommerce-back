import { Request, Response } from "express";
import { db } from "../../models/knexDB";
import { createId } from "../../helpers/createId";


// enpoints para purchases
/*export const getAllPurchases = ( async (req: Request, res: Response) => {
   
    try {
        const result = await db.raw(`select * from purchases`)
            res.status(200).send({message: "lista de pagamentos", result}
            )
   
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
   
export const getPurchaseById = ( async (req: Request, res: Response) => {
  
    try {
        const idSelect = req.params.id 

        const [pgExists] = await db.raw(`SELECT id FROM purchases WHERE id="${idSelect}"`)

        if(!pgExists){
            res.status(404);
            throw new Error("404: Pagamento NÃO Cadastrado");
        }
    

        const result = await db.raw(`SELECT * FROM products_purchases 
        INNER JOIN products
        ON products_purchases.product_id = products.id
        INNER JOIN purchases
        ON products_purchases.purchases_id="${idSelect}"`)
    

        res.status(200).json({ result, message: `RESULTADO PARA PAGAMENTO IDENTIFICADO ${idSelect}`});
    
    
    
    
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
})*/

export const createPurchase = ( async (req: Request, res: Response) => {
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
                const paid = 0
           
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
