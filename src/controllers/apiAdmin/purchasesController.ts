import { Request, Response } from "express";
import { db } from "../../models/knexDB";


// enpoints para purchases
export const getAllPurchases = ( async (req: Request, res: Response) => {
   
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
})

export const createPurchase = ( async (req: Request, res: Response) => {

            try {
                const product_id=req.body.product_id 
                const total_price=req.body.total_price 
                const quantity = req.body.quantity 
                const buyer_id = req.body.buyer_id 
            
                      
                if(typeof total_price !==   "number"){
                    throw new Error("preço total deve ser valor numerico valido")
                  }
            
                        
                if(typeof buyer_id !== "string"){
                    throw new Error("quantidade de items deve ser valor numerico valida")
                  }

                  if( typeof quantity !== "number"){
                    throw new Error("quantidade de items deve ser valor numerico valida")
                  }
                
                  const newId = `${Date.now()}`.toString()
                  const newPurchase:{id:string, product_id:string, total_price:number, quantity:number , buyer_id:string }={
                  id:newId,
                product_id,
                total_price,
                 quantity,
                buyer_id
                  }
                  await db("purchases").insert(newPurchase)

                res.send(200).json({message: "cadastro realizado com sucesso" , newPurchase})
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
    })
