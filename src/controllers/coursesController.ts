import { Request, Response } from "express"
import {v4 as uuidv4} from 'uuid';

import { TCourse } from "../types/types"
import { courses } from "../dataTS/courses"
import { COURSE_STACK } from "../types/types"
import { createId } from "../helpers/createId";
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
})
