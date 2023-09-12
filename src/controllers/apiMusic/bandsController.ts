import { Request, Response } from "express";
import { db } from "../../models/knexDB";

import { Band } from "../../models/Band";
import { createId } from "../../helpers/createId";
import { createBandEmail, createBandNickname, createBandPassword } from "../../business/bandsManager";
export const getAllBands =( async (req: Request, res: Response) => {
    try {
       const q = req.query.q as string || undefined
        if(!q){
        const message = "LISTA DE BANDAS E ARTISTAS CADASTRADOS NO SISTEMA"
        const result = await db("bands")
        res.status(200).send({ message, result})
    }
    if(q && q.length <= 1 ){
        res.status(400)
        throw new Error('"400": Pesquisa deve ter ao menos 1 caracter')
    }

    
    if(q){
        const [result]  = await db("bands").where("NAME" ,"LIKE" , `%${q}%`);
     
        if(!result){
            res.status(404);
            throw new Error("'404': BANDA NÃO ENCONTRADA")
    }
        res.status(200).send({message: "BANDA ENCONTRADA", result})
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
export const createBand = (async (req: Request, res: Response) => {

    try {
        const bandId = req.body.inputId as string || undefined
        const bandName = req.body.inputName as string || undefined
        const countryCode = req.body.inputCountry as string 
        const bandEmail = req.body.inputEmail as string || undefined
        const passwordConfirm = req.body.inputPassword as string || undefined
        const withoutSpace = bandName.replace(' ', '-')

        if(bandId){
            res.status(400)
            throw new Error("'id' para banda deve ser gerado automaticamente")
        }
        if(!bandName){
            res.status(400)
            throw new Error("'nome' da banda deve ser informado")
        }
        if(!countryCode){
            res.status(400)
            throw new Error("'código do país' da banda deve ser informado")
        }
        if(bandEmail){
            res.status(400)
            throw new Error("'email' para banda deve ser gerado automaticamente")
        }
        if(passwordConfirm){
            res.status(400)
            throw new Error("'password' da banda deve ser gerado automático")
        }

        const [nameDBBands]:string | undefined = await db.raw(`SELECT name FROM bands WHERE name like "${bandName}"`)
    
        if(nameDBBands){
            res.status(400)
            throw new Error('Nome já cadastrado no sistema.')
        }
    
        const [nameDBUsers] : string | undefined = await db.raw(`SELECT name FROM users WHERE name like "${bandName}"`)
    
        if(nameDBUsers){
            res.status(400)
            throw new Error('Nome já cadastrado no sistema')
        }
    
    
        const createBand: {id:string, name: string, nickname: string, email: string, password: string } = {
            id:createId(bandId),
            name: bandName,
            nickname: createBandNickname(countryCode, withoutSpace),
            email: createBandEmail(bandEmail, withoutSpace),
            password:createBandPassword(passwordConfirm , withoutSpace)
        }
        await db("users").insert(createBand)

         const createBandAccount :{id: string, name: string } ={
            id: createBand.id,
            name: createBand.name
         }

         await db("bands").insert(createBandAccount)

        res.status(201).json({message: "banda cadastrada com sucesso"})
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
});

export const editBand = (async (req: Request, res: Response) => {
    try {
        const bandId = req.params.id 
        const bandName = req.body.inputName as string || undefined
        const countryCode = req.body.inputCountry as string 
        const bandEmail = req.body.inputEmail as string || undefined
        const passwordConfirm = req.body.inputPassword as string || undefined
       
        const [bandsExists] = await db("bands").where("id" , "LIKE", `${bandId}`)
        if(!bandsExists){
            res.status(404);
            throw new Error("404: Banda não cadastrada");
        }


        const [band4edit] = await db.raw(`SELECT * FROM bands WHERE id="${bandId}"`);
        if (band4edit) {
                band4edit.id = bandId,
                band4edit.name = bandName||band4edit.name
        }
         await db("bands").update(band4edit).where({id :`${bandId}`})

         const [UBand4edit] = await db.raw(`SELECT * FROM users WHERE id="${bandId}"`);
         if (UBand4edit) {
            UBand4edit.id = bandId,
            UBand4edit.name = bandName||band4edit.name
            UBand4edit.nickname = createBandNickname(countryCode, bandName)
            UBand4edit.email = createBandEmail(bandEmail, bandName)
            UBand4edit.created_at = UBand4edit.created_at
         }

         await db("users").update(UBand4edit).where({id: `${bandId}`})



                res.status(200).send({message: "banda atualizado com sucesso"})
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


export const destroyBand = ( async (req: Request, res: Response) => {

    try {
        const id4delete = req.params.id

        const band4delete = await db("bands").where({ id: id4delete })
        if (!band4delete) {
            res.status(404)
            throw new Error("'404': banda não cadastrada")
        }
        await db("bands").delete().where({ id: `${id4delete}`})
        res.status(200).send({ message: 'banda deletado com sucesso' })
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


export const getBandById =( async (req: Request, res: Response) => {


    try {
        const id4Search = req.params.id
        const [result] = await db.raw(`
        SELECT * FROM bands 
        INNER JOIN users
        ON users.id = bands.id
        where bands.id = '${id4Search}'`)
       

        if (!result || result === null || result === undefined) {
            res.status(404)
            throw new Error( "banda  não Cadastrada , verifique o 'id' de busca")
        }
        else {

            res.status(200).send({ result: result })
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
