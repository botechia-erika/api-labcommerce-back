import { Request, Response } from "express";
import { db } from "../../models/knexDB";
import {  TProductDB } from '../../types/types';
import { createId } from "../../helpers/createId";
import { DESCRIPTION_CATEGORY } from "../../types/types";
import { matchDescriptionCategory } from "../../helpers/matchDescriptionCategory";
import { Product } from "../../models/Product";
import {v4 as uuidv4} from 'uuid';
export const createCourse = ( async (req: Request, res: Response) => {

    try{
        const newName = req.body.inputName + " " + req.body.inputStack 
        const newImage = req.body.image_url as string | undefined
        const newPrice = req.body.price as number
        const newDescription = "cursos" as string 

       
        if (typeof newName != typeof "string" ) {
            res.status(400)
            throw new Error ('400 nome do deve seguir o formato "MODELO MARCA ANO" ')
        }

        
        if (!newImage.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
            res.status(400)
            throw new Error ("400: imagem deve corresponder a endereço URL VALIDO")
        }
   

   

        const newProduct: { description: string, id: string, name: string,image_url: string, price: number}= {
            id:uuidv4(),
            name:newName,
            image_url:newImage,
            description:newDescription,
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


export const getAllCourses =( async (req: Request, res: Response) => {


    try {
       const searchTerm = req.query.q as string | undefined
        if(searchTerm === undefined){
        const message = "LISTA DE PRODUTOS CADASTRADO DO SISTEMA"
        const result = await db.raw(`SELECT * FROM products WHERE description LIKE "cursos"`)
 
       
        res.status(200).send({ message, result})
    }else{
        const searchTerm = req.query.q as string | undefined


        if(searchTerm && searchTerm.length < 0 ||searchTerm === "" ){
            res.status(400)
            throw new Error('Pesquisa deve ter ao menos 1 caracter')
        }

       const [result] = await db("products").where("name", "LIKE" , `%${searchTerm}%`).
       andWhere("description", "LIKE", "cursos")
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
/*import { Request, Response } from "express"
import {v4 as uuidv4} from 'uuid';

import { TCourse } from "../../types/types"
import { courses } from "../../dataTS/courses"
import { COURSE_STACK } from "../../types/types"
import { createId } from "../../helpers/createId";
// inicio aula api-express
export const getAllCourses = ( async (req: Request, res: Response) => {
  

    try {
        const q = req.query.q as string | undefined      
        if (q === undefined) {
           
            
            res.status(200).json( courses )
        }else {
          

           function buscaCursoPorNome(courses:TCourse[], q:string){
                return courses.filter(
                    (course:TCourse)=>{
                        if( course.name.toUpperCase().includes(q.toUpperCase())){
                            return course
                        }
                    }
                )
            }
            const [result] = buscaCursoPorNome(courses, q)
            if(result){
                res.status(200).json({ message: "curso encontrado no nosso sistema" , result})

             
            }else{
                res.status(200).json({result: null, message: "curso NÃO encontrado"})  
             
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


export const createCourse =( async (req: Request, res: Response) => {
  

    try {
 
        const newId = req.body.id as string 
        const newName = req.body.name as string 
        const newLessons = req.body.lessons as number || undefined
        const newStack = req.body.stack as  COURSE_STACK.FRONT || COURSE_STACK.BACK

 
        const id = createId(newId)

        const newCourse:TCourse = {
            id,
            name: newName,
            lessons: newLessons,
            stack: newStack
        }

        courses.push(newCourse)

        res.status(201).json({ message: 'curso agregado com sucesso', newCourse})
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

// config do app express aqui (referencie o material async)

export const destroyCourse = (async (req: Request, res: Response) => {
		// identificação do que será deletado via path params
    const idToDelete = req.params.id

		// encontrar o index do item que será removido
    const getIndex = courses.findIndex((course) => course.id === idToDelete)

		// caso o item exista, o index será maior ou igual a 0
    if (getIndex != null) {
				// remoção do item através de sua posição
        courses.splice(getIndex)
    }

    res.status(200).send("Item deletado com sucesso")
})
export const getCourseById =(async (req: Request, res: Response) => {
    try{

        const id = req.params.id as string
    function buscaAccountPorId(courses:TCourse[], id:string){
        return courses.filter(
            (account)=>{
                if( account.id.toUpperCase().includes(id.toUpperCase())){
                    return account
                }
            }
        )
    }
    const [result] = buscaAccountPorId(courses, id)
    if(result){
        res.status(200).json({ message: "curso encontrado no nosso sistema" , result})

     
    }else{
        res.status(200).json({result: null, message: "curso NÃO encontrado"})  
 
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
})*/
