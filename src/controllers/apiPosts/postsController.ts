import { Request, Response } from "express";
import { db } from "../../models/knexDB";
import {v4 as uuidv4} from 'uuid';
import fs from 'fs'
import path from 'path'
import { Posts } from "../../models/Posts";
import { IPostDB, IPostDetaills } from "../../interfaces/interfaces";
import { number } from "zod";
import { Post } from "../../models/Post";
import { searchPostReference } from "../../helpers/searchPostReference";




export const createPost = ( async (req: Request, res: Response) => {

    try{
        const detailsFilePath = path.join(__dirname, './../../../json/dataPostsDetails.json')

        const detailsData = JSON.parse(fs.readFileSync(detailsFilePath, 'utf-8')) 
        // Primeira parte cuida da parte de insercao em DB SQLITE
        const postId = uuidv4() as string
        const creatorId = req.body.inputAuthor as string
        const content = req.body.inputContent as string
        const likes = req.body.inputLikes as number 
        const dislikes = req.body.inputDislikes as number
        const today = new Date().toISOString()
    
        const [confirmAuthor] = await db("users").where("id", "LIKE", `%${creatorId}%`)

        if(!confirmAuthor){
            res.status(400)
            throw new Error('"400" Autor nao cadastrado')
        }

     if(content.length  <1 ||  content.length > 141){
        res.status(400)
        throw new Error('"400" Conteudo deve ter entre 2 e 140 caracteres ')
     }
        
        

        const postObj: Posts =  new Posts(
            postId ,
            creatorId,
            content,
            likes,
            dislikes,
            today,
            today
        )
 
        if(!postObj){
            res.status(400)
            throw new Error('400 Error ao criar post, confirme os dado')
        }

        
        const objDB:IPostDB ={
               id: postObj.getId(),
               creator_id: postObj.getCreatorId(),
               content: postObj.getContent(), 
               likes: postObj.getLikes(),
               dislikes: postObj.getDislikes(),
               created_at: postObj.getCreatedAt(),
                updated_at: today
        }

            await db("posts").insert(objDB)
            const idDetaills = uuidv4()
            const postImg = req.body.inputPostImg as string
            const tags= req.body.tags as string[]       
           const feedbackList =[] as string[]
           const totalVisits = 0 as number
           const totalLikes = 0 as number
           const totalFeedback = 0 as number
           const postReference = postObj.getId()

            const objJS: IPostDetaills ={
                id: idDetaills,
                postImg,
                tags,
                feedbackList,
                totalVisits,
                totalLikes,
                totalFeedback ,
                postReference
            }

            const newDetails = [...detailsData].push(objJS)

            const objJSON = JSON.stringify(newDetails)
            fs.writeFileSync(detailsFilePath, objJSON)

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


export const getAllPosts = async (req: Request, res: Response) => {
    const detailsFilePath = path.join(__dirname, '../../../src/json/dataPostsDetails.json');
  
    const detailsData = JSON.parse(fs.readFileSync(detailsFilePath, 'utf-8'));
  
    try {
      const q = req.query.q as string | undefined;
  
      if (!q) {
        const message = "LISTA DE POSTS CADASTRADO DO SISTEMA";
        const postsDB = await db("posts");
const result: Posts[] = postsDB.map(post =>(
    new Posts(
        post.id, 
        post.creator_id,
        post.content,
        post.likes,
        post.dislikes,
        post.created_at,
        post.updated_at 
    )
)
)

  

        res.status(200).send({ message, result });
      } else {


        const postDB= await db("posts").where("creator_id", "LIKE", `%${q}%`);
  
        if (!postDB) {
          res.status(404);
          throw new Error("404: NOME do Produto NÃO Encontrado");
        }
  
        const postDetails = searchPostReference(detailsData, postDB[0].id)[0];
  
        const postSelected: Post = new Post(
          postDB[0].id,
          postDB[0].creator_id,
          postDB[0].content,
          postDB[0].likes,
          postDB[0].dislikes,
          postDB[0].created_at,
          postDB[0].updated_at,
          postDetails.id,
          postDetails.postImg,
          postDetails.tags,
          postDetails.feedbackList,
          postDetails.totalVisits
        );
  
        res.status(200).send({ postSelected, message: "PRODUTO ENCONTRADO" });
      }
    } catch (error) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

/*
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
})*/