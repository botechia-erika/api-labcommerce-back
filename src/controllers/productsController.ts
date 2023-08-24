import { Request, Response } from "express";
import { db } from "../models/knexDB";
import { DESCRIPTION_CATEGORY, TProductDB } from "../types/types";
import {v4 as uuidv4} from 'uuid';
import { createId } from "../helpers/getIdB";
import { matchDescriptionCategory } from "../helpers/matchDescriptionCategory";

export const createProduct = ( async (req: Request, res: Response) => {

    try {
        const newPlaca = req.body.placa as string 
        const newName = req.body.modelo + " " + req.body.marca + " " + req.body.ano as string
        const newDescription = req.body.description as string | undefined  
        const newImage = req.body.image_url as string | undefined
        const newPrice = req.body.price as number
      
     
    
        if (typeof newName != typeof "string" ) {
            res.status(400)
            throw new Error ('400 nome do deve seguir o formato "MODELO MARCA ANO" ')
        }

        if(typeof newPlaca !== typeof "string"){
            res.status(400)
            throw new Error ("400: placa deve ser alfa numerica")
        }

        if (!newPlaca.match(/[A-Z]{3}[-][0-9]{4}/g)) {
                res.status(400)
                throw new Error ("400: placa deve seguir o padrão AAA-0000")
        }

        if (!newImage.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
            res.status(400)
            throw new Error ("400: imagem deve corresponder a endereço URL VALIDO")
        }

        const [ idDBExists ]: TProductDB[] | undefined[] = await db.raw(`SELECT * FROM products WHERE id="${newPlaca}"`)

        if ([idDBExists]) {
            res.status(400)
            throw new Error("'placa' já cadastrada")
        }


        const newAccount:TProductDB= {
            id:newPlaca,
            name:newName,
            description:matchDescriptionCategory(newPrice),
            image_url:newImage,
            price:newPrice
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


export const getAllProducts=( async (req: Request, res: Response) => {
    try {
       const searchTerm = req.query.q as string | undefined
        if(searchTerm === undefined){
        const message = "LISTA DE PRODUTOS CADASTRADO DO SISTEMA"
        const result = await db("products")
        res.status(200).send({ result})
    }else{
        


       const [result] =await db("products").where("name", "LIKE" , `%${searchTerm}%`)
        if(!result){
            res.status(404)
            throw new Error("404: NOME do Produto NÃO Encontrado")     
        }
        res.status(200).send({result : [result], message: "PRODUTO ENCONTRADO"})
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
});


export const editProductById = (async (req: Request, res: Response) => {
    try {
        const idSelect = req.params.id;
        const nameSelect = req.body.name as undefined  | string
        const newImg = req.body.image_url as string | undefined;
        const newPrice = req.body.price as   number | undefined;

        const [productExists] = await db.raw(`SELECT id FROM products WHERE id="idSelect"`)
        if(!productExists){
            res.status(404);
            throw new Error("404: Produto não cadastrado");
        }


        if (nameSelect !== undefined) {
            const confereNome = await db.raw(`SELECT name FROM products WHERE id="idSelect"`)
            if (nameSelect && confereNome !== nameSelect) {
                res.status(400);
                throw new Error("Nome do produto cadastrado não deve ser alterado");
            }
        }


        if (newImg !== undefined) {
            if (!newImg.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
            res.status(400)
            throw new Error ("400: imagem deve corresponder a endereço URL VALIDO")
            }
        }

        if(newPrice){
            if(newPrice && typeof newPrice !== typeof Number){
                res.status(400)
                throw new Error("400: Preço atualizado deve ser valor numerico valido")
            }
        }

        const [product4edit] = await db.raw(`SELECT * FROM products WHERE products.id="${idSelect}"`);
        if ([product4edit]) {
                product4edit.id = idSelect,
                product4edit.name = nameSelect||product4edit.name,
                product4edit.description = matchDescriptionCategory(newPrice),
                product4edit.image_url= newImg|| product4edit.image_url,
                product4edit.price = newPrice || product4edit.price
        }
                await db("products").update(product4edit).where({id :`${idSelect}`})
                res.status(200).send({message: "produto atualizado com sucesso", result: product4edit})
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

export const getProductById =( async (req: Request, res: Response) => {
    const id = req.params.id as string | []

    try {
        const [result] = await db.raw(`SELECT * FROM products WHERE id="${id}"`)

        if (!result) {
            res.status(404)
            throw new Error( "PRODUTO  não Cadastrado , verifique o 'id'")
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

        const productDelete = await db("products").where({ id: id })
        if (!productDelete) {
            throw new Error("product  nao encontrado")
        }
        await db("products").delete().where({ id: `${id}`})
        res.status(200).send({ message: 'product deletado com sucesso' })
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