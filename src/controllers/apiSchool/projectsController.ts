import { Request, Response } from "express";
import { db } from "../../database/knexDB";
import {  STACKLIST, TProductDB } from '../../types/types';
import { createId } from "../../helpers/createId";
import { DESCRIPTION_CATEGORY } from "../../types/types";
import { matchDescriptionCategory } from "../../helpers/matchDescriptionCategory";
import { Product } from "../../models/Product";
import {v4 as uuidv4} from 'uuid';
import { IProjectDB } from "../../interfaces/interfaces";
export const createProjects = ( async (req: Request, res: Response) => {

    try{
        const newId = uuidv4() as string;
        const newProject = req.body.inputName as string
        const newAuthor = req.body.inputAuthor as string | undefined
        const newDescription = req.body.inputDescription as string 
        const newDeploy = req.body.inputDeploy as string | undefined
        const newRepo = req.body.inputRepo as string | undefined
        const newImage = req.body.inputImg as string | undefined
        const newScore = req.body.inputScore as number | undefined
        const newStack = req.body.inputStack as STACKLIST | undefined
        const today = new Date().toISOString()

        if (newProject && newProject.trim().toString().length < 3 && newProject.trim().toString().length > 140) {
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

        const [confirmAuthor]:string[] | undefined[]= await db.raw(`SELECT id FROM users WHERE id={author}`)
       
        if(!confirmAuthor){
            throw new Error(`O id : ${newAuthor} NAO ESTA CADASTRADO, cadastre seu usuario antes de postar o projeto`)
        }


        if (newAuthor && typeof newAuthor != typeof "string" ) {
            res.status(400)
            throw new Error ('400 id do Autor deve ser "string" com caracteres alfa numericos ')
        }

        if (newDescription && newDescription.trim().toString().length < 3 && newDescription.trim().toString().length > 140) {
            res.status(400)
            throw new Error ('400 nome do deve ser "string" com total de caracteres entre 3 e 140 ')
        }

        if (!newDescription  ) {
            res.status(400)
            throw new Error ('400 DESCRICAO deve ser INFORMADO em campo do formulario')
        }

       
        if (newDescription && typeof newDescription != typeof "string" ) {
            res.status(400)
            throw new Error ('400 DESCRICAO DO PROJETO deve ser "string" com caracteres alfa numericos ')
        }
        
        if (newImage && !newImage.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
            res.status(400)
            throw new Error ("400: imagem deve corresponder a endereço URL VALIDO")
        }
        





        const newProjectDB : IProjectDB ={
            id: newId,
            projectName: newProject,
            author: newAuthor,
            stack: newStack,
            score: newScore,
            description: newDescription,
            deploy : newDeploy,
            repo: newRepo,
            imgUrl:newImage ,
            likes :0,
            dislikes :0,
            createdAt: today,
            updateAt: today
        }
            await db("projects").insert(newProjectDB)
    
        res.status(201).send("projeto cadastrado com sucesso")
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


export const getAllProjects=( async (req: Request, res: Response) => {


    try {
       const searchTerm = req.query.q as string | undefined
        if(searchTerm === undefined){
        const message = "LISTA DE PRODUTOS CADASTRADO DO SISTEMA"
        const result = await db.raw(`SELECT * FROM projects`)
       const frotaDB = result
       
        res.status(200).send({ message, result})
    }else{
        const searchTerm = req.query.q as string | undefined


        if(searchTerm && searchTerm.length < 0 ||searchTerm === "" ){
            res.status(400)
            throw new Error('Pesquisa deve ter ao menos 1 caracter')
        }

       const [result] =await db("projects").where("name", "LIKE" , `%${searchTerm}%`)
        if(!result){
            res.status(404)
            throw new Error("404: NOME do Produto NÃO Encontrado")     
        }

        

        res.status(200).send({result , message: "PRODUTO ENCONTRADO"})
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


export const editProjectById = (async (req: Request, res: Response) => {
    try {
            const today = new Date().toISOString() as string;
            const id4Update=  req.params.id as string;
            const name4Update = req.body.inputName as string | undefined;
            const author4Update = req.body.inputAuthor as string | undefined;
            const stack4Update = req.body.inputStack as STACKLIST | undefined;
            const score4Update = req.body.inputScore as number | undefined;
            const description4Update =  req.body.inputDescription as string | undefined;
            const deploy4Update = req.body.inputDeploy as string | undefined;
            const repo4Update = req.body.inputRepo as   string | undefined;
            const img4Update = req.body.inputImg as string | undefined;
            const likes4Update = req.body.inputLikes as 1 | 0;
            const dislikes4Update = req.body.inputDislikes as 1 | 0;
            
    
            const updatedAt = today;

        
       const [projectExists] = await db("projects").where("id" , "LIKE", `${id4Update}`)
        
       
       if(![projectExists]){
            res.status(404);
            throw new Error("404: Produto não cadastrado");
        }
        // Update logic
        const updatedLikes = likes4Update === 1 ? projectExists.likes + 1 : projectExists.likes;
        const updatedDislikes = dislikes4Update === 1 ? projectExists.dislikes + 1 : projectExists.dislikes;
        



    const project4Update = {
                id :id4Update,
                projectName : name4Update||projectExists.projectName,
                stack :stack4Update || projectExists.stack,
                author :projectExists.author,
                score: score4Update|| projectExists.score,
                description : description4Update || projectExists.description,
                deploy : deploy4Update || projectExists.deploy,
                repo:repo4Update || projectExists.repo,
                imgUrl : img4Update || projectExists.imgUrl,
                likes : updatedLikes,
                dislikes : updatedDislikes,
                 createdAt : projectExists.createdAtm,
                updateAt :  updatedAt
            }
        


            await db("projects")
            .update(project4Update)
            .where({ id: `${id4Update}` });
                            res.status(200).send({message: "produto atualizado com sucesso", result: projectExists})
   
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