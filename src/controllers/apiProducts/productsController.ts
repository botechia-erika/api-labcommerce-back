import { Request, Response } from "express";
import { BaseDatabase } from "../../database/BaseDatabase";
import {  TProductDB } from '../../types/types';
import { createId } from "../../helpers/createId";
import { DESCRIPTION_CATEGORY } from "../../types/types";
import { matchDescriptionCategory } from "../../helpers/matchDescriptionCategory";
import { Product } from "../../models/Product";
import { ProductsDatabase } from "../../database/ProductDatabase";

import {ProductsBusiness} from '../../business/ProductsBusiness'


export class ProductsController{
    public getAllProducts = async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string | undefined


        const productsBusiness  = new ProductsBusiness()
        const result = await productsBusiness.getAllProducts(q)    

    


     res.status(200).send(result)
    
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
};

public getProductById =( async (req: Request, res: Response) => {


    try {
        
    const id = req.params.id;

    const productsBusiness  = new ProductsBusiness()
    const result = await productsBusiness.getProductById(id)    



    res.status(200).send(result)
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


public  createProduct = ( async (req: Request, res: Response) => {

    try{
        
        
        const createName = req.body.inputModel + " - " + req.body.inputBrand+ " - " + req.body.inputYear as string 
        const createImg = req.body.inputProductImg
        const createDescription = req.body.inputDescription
        const newCategory = req.body.inputCategory
        const newPlaca = req.body.inputPlaca as string | undefined  
        const newImage = req.body.inputImageUrl as string | undefined
        const newPrice = req.body.inputPrice as number
        //const newDescription = req.body.description as string 

       const newProduct:any = {
        id: newPlaca,
        name: createName,
        description:createDescription,
        image_url: newImage,
        price: newPrice,
        category: newCategory
       }


       const productsBusiness  = new ProductsBusiness()
       const result = await productsBusiness.createProduct(newProduct)    

   

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

public   editProductById = (async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newCategory = req.body.category as undefined |string
        const nameSelect = req.body.name as undefined  | string
        const newImg = req.body.image_url as string | undefined;
        const newPrice = req.body.price as   number | undefined;;
        const newDescription= req.body.inputDescription as string | undefined

        const product4Edit = {
            id: id,
            name: nameSelect,
            description: newDescription,
            image_url: newImg,
            price: newPrice,
            desciption : newDescription
        }

   
    res.status(200).send({message: "produto atualizado com sucesso"})
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

public  destroyProduct = ( async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const productsBusiness  = new ProductsBusiness()
        const result = await productsBusiness.destroyProduct(id)    

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
}
