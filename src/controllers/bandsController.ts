import { Request, Response } from "express";
import { db } from "./../models/knexDB";
import { DESCRIPTION_CATEGORY, TProductDB } from '../types/types';
import { createId } from "../helpers/createId";
import { matchDescriptionCategory } from "../helpers/matchDescriptionCategory";

export const createBand = ( async (req: Request, res: Response) => {

    try {
        let newBand = undefined
        const newId = createId(newBand)
        const bandName = req.body.name as string || undefined
        const nickname = req.body.bandNickname as string | undefined
        const email = req.body.bandEmail as string | undefined
        const passwordConfirm = req.body.passwordConfirm as string | undefined
        const countryCode = req.body.countryCode as string 

       const withoutSpace = bandName.replace(' ', '-')

        const createBandAccess = (email:undefined|string, withoutSpace:string)=>{
            if(email !== undefined){
                res.status(400)
                throw new Error("email gerado como acesso a banda deve ser gerado de forma automatic")
            }else if(!bandName){
                res.status(400)
                throw new Error("nome da banda deve ser informado para cadastro")
            }else{
            const emailGerado = "bands@" + withoutSpace + ".play.add"
            return emailGerado
            }
         }

        
        const createBandNickname = (countryCode:string,  withoutSpace:string)=>{
            const nicknameGerado = (countryCode + "@" + withoutSpace )
            return nicknameGerado
            }
         

		
		if (passwordConfirm && passwordConfirm!= undefined) {
			throw new Error("'password' de acceso deve ser gerado automaticamente")
		}

        const createBandPassword = (passwordConfirm:string | undefined , withoutSpace:string)=>{
		if (!passwordConfirm && passwordConfirm!= undefined) {
			throw new Error("'password' de acceso deve ser gerado automaticamente")
		}else{
            const createPasswordBand = ("play@" + withoutSpace)
            return createPasswordBand
        }
    }
     

        const createBand: {id:string, name: string, nickname: string, email: string, password: string } = {
            id:createId(newBand),
            name: bandName,
            nickname: createBandNickname(countryCode, withoutSpace),
            email: createBandAccess(email, withoutSpace),
            password:createBandPassword(passwordConfirm , withoutSpace)
        }
        await db("users").insert(createBand)

         const createBandAccount :{id: string, name: string } ={
            id: createBand.id,
            name: createBand.name
         }

         await db("bands").insert(createBandAccount)

        res.status(201).json({message: "banda cadastrada com sucesso"})
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



export const getAllBands=( async (req: Request, res: Response) => {
    try {
       const searchTerm = req.query.q as string | undefined
        if(searchTerm === undefined){
        const message = "LISTA DE BANDAS E ARTISTAS CADASTRADOS DO SISTEMA"
        const result = await db.raw(`select * from bands`)
        res.status(200).json({ message, result: result})
    }else{
        const searchTerm = req.query.q as string | undefined


        if(searchTerm && searchTerm.length < 0 ||searchTerm === "" ){
            res.status(400)
            throw new Error('Pesquisa deve ter ao menos 1 caracter')
        }

       const [result] =await db("bands").where("name", "LIKE" , `%${searchTerm}%`)
        if(!result){
            res.status(404)
            throw new Error("404: NOME do Produto NÃO Encontrado")     
        }
        res.status(200).send({result : result, message: "PRODUTO ENCONTRADO"})
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


/*export const editProductById = (async (req: Request, res: Response) => {
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
    const id = req.params.id as string | []

    try {
        const result = await db.raw(`SELECT * FROM products WHERE id=${id}`)

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