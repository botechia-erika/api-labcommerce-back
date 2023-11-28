import { Request, Response } from "express";
import { db } from "../../models/knexDB";
import {  STACKLIST, TProductDB } from '../../types/types';
import { createId } from "../../helpers/createId";
import { DESCRIPTION_CATEGORY } from "../../types/types";
import { matchDescriptionCategory } from "../../helpers/matchDescriptionCategory";
import { Product } from "../../models/Product";
export const createProjects = ( async (req: Request, res: Response) => {

    try{
        const newProject = req.body.inputName as string
        const newAuthor = req.body.inputAuthor as string | undefined
        const newDescription = req.body.inputDescription as string 
        const newDeploy = req.body.inputDeploy as string | undefined
        const newRepo = req.body.inputRepo as string | undefined
        const newImage = req.body.inputImg as string | undefined
        const newScore = req.body.inputScore as number | undefined
        const newStack = req.body.inputStack as STACKLIST | undefined


        if (newProject && newProject.toString().length < 3 && newProject.toString().length > 140) {
            res.status(400)
            throw new Error ('400 nome do deve ser "string" com total de caracteres entre 3 e 140 ')
        }

        if (!newProject  ) {
            res.status(400)
            throw new Error ('400 nome do projeto deve ser INFORMADO em campo do formulario')
        }

       
        if (newProject && typeof newProject != typeof "string" ) {
            res.status(400)
            throw new Error ('400 nome do deve ser "string" com caracteres alfa numericos ')
        }
        if (!newAuthor  ) {
            res.status(400)
            throw new Error ('400 id do AUTOR deve ser INFORMADO em campo do formulario')
        }

       
        if (newAuthor && typeof newProject != typeof "string" ) {
            res.status(400)
            throw new Error ('400 id do Autor deve ser "string" com caracteres alfa numericos ')
        }
   
       /* const  [idDBExists]  = await db.raw(`SELECT * FROM products WHERE id="${newPlaca}"`)

        if (idDBExists !== undefined) {
            res.status(400)
            throw new Error("'placa' já cadastrada")
        } */

   

        const newProduct: { description: string, id: string, name: string,image_url: string, price: number}= {
            id:createId(newPlaca),
            name:newName,
            image_url:newImage,
            description:matchDescriptionCategory(newPrice),
            price:newPrice
        }
            await db("products").insert(newProduct)
    
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


export const getAllCars =( async (req: Request, res: Response) => {


    try {
       const searchTerm = req.query.q as string | undefined
        if(searchTerm === undefined){
        const message = "LISTA DE PRODUTOS CADASTRADO DO SISTEMA"
        const result = await db.raw(`SELECT * FROM products WHERE description LIKE "Light" OR description LIKE "Hatch" OR description LIKE "Sedan" OR description LIKE "Prime" OR description LIKE "Lux"`)
       const frotaDB = result
       
        res.status(200).send({ message, result})
    }else{
        const searchTerm = req.query.q as string | undefined


        if(searchTerm && searchTerm.length < 0 ||searchTerm === "" ){
            res.status(400)
            throw new Error('Pesquisa deve ter ao menos 1 caracter')
        }

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
        const id = req.params.id;
        const nameSelect = req.body.name as undefined  | string
        const newImg = req.body.image_url as string | undefined;
        const newPrice = req.body.price as   number | undefined;

       const productExists = await db("products").where("id" , "LIKE", `${id}`)
        if(!productExists){
            res.status(404);
            throw new Error("404: Produto não cadastrado");
        }


        if (nameSelect !== undefined) {
            const confereNome = await db.raw(`SELECT name FROM products WHERE id="id"`)
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

        const [product4edit] = await db.raw(`SELECT * FROM products WHERE id="${id}"`);
        if (product4edit) {
                product4edit.id = id,
                product4edit.name = nameSelect||product4edit.name,
                product4edit.description = matchDescriptionCategory(product4edit.price),
                product4edit.image_url= newImg|| product4edit.image_url,
                product4edit.price = newPrice || product4edit.price
        }
                await db("products").update(product4edit).where({id :`${id}`})
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


    try {
        const id = req.params.idDetails
        const result = await db.raw(`SELECT * FROM products WHERE id="${id}"`)

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