import { Request, Response } from "express";
import { db } from "../models/knex";
import { TProductDB } from "../types/types";


export const editProductById = (async (req: Request, res: Response) => {
    try {
        const newid = req.params.id;
        const newName = req.body.name as string | undefined;
        const newDescription = req.body.description as string | undefined;
        const newImageUrl = req.body.image_url as string | undefined;
        const newPrice = req.body.price as string | number | undefined;

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400);
                throw new Error("Nome do produto deve ser do tipo string");
            }
        }

        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400);
                throw new Error("Descrição deve ser do tipo string");
            }
        }

        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400);
                throw new Error("Nova imagem deve ser do tipo string");
            }
        }

        const [product4edit] = await db.raw(`SELECT * FROM products WHERE products.id="${newid}"`);
        if ([product4edit]) {
            product4edit.id = newid,
                product4edit.name = newName || product4edit.name,
                product4edit.description = newDescription || product4edit.description,
            product4edit.image_url= newImageUrl || product4edit.image_url,
                product4edit.price = newPrice || product4edit.price
        }
                await db("products").update(product4edit).where({id :`${newid}`})
                res.status(201).send("produto atualizado com sucesso")
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


export const createProduct = ( async (req: Request, res: Response) => {

    try {
        const id = req.body.id
        const name = req.body.name
        const description = req.body.description
        const image_url = req.body.image_url
        const price = req.body.price 
        
    
        if (typeof name != typeof "string") {
            res.status(400).send({ message: 'nome do produto é invalido' })
        }
        if (typeof description != typeof "string") {
            res.status(400).send('description deve ser categoria de produto valida')
        }
        if (typeof image_url != typeof "string") {
            res.status(400).send('url da imagem deve ser valida')
        }
        if (typeof price == undefined) {
            res.status(400).send("price deve ser numerico")
        }


        const newAccount:TProductDB= {
            id,
            name,
            description,
            image_url,
            price
        }
            await db("products").insert(newAccount)
    
        res.status(201).send("produto cadastrado com sucesso")
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

// endpoints para purchases

export const getAllProducts=( async (req: Request, res: Response) => {
    try {
       const searchTerm = req.query.q as string | undefined
        if(searchTerm === undefined){
        const message = "LISTA DE PRODUTOS CADASTRADO DO SISTEMA"
        const result = await db("products")
        res.status(200).send({ result})
    }else{
    
       const [result] =await db("products").where("name", "LIKE" , `%${searchTerm}%`)
        if(![result]|| result == null){
            res.send({message: "PRODUTO NÃO ENCONTRADO"})     
        }else{
        res.status(200).send({result : [result], message: "PRODUTO ENCONTRADO"})
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
export const getProductById =( async (req: Request, res: Response) => {
    const id = req.params.id as string | []

    try {
        const [result] = await db.raw(`SELECT * FROM products WHERE id="${id}"`)

        if (!result) {
            res.status(200).send({message: "PRODUTO  não encontrado"})
        }
        else {

            res.status(200).send({ product: result })
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


export const destroyProduct = ( async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const [purchaseDelete] = await db("purchases").where({ id: id })
        if (!purchaseDelete) {
            throw new Error("purchase  nao encontrado")
        }
        await db("purchases").delete().where({ id: `${id}`})
        res.status(200).send({ message: 'purchase deletado com sucesso' })
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
