import { Request, Response } from 'express';
import { db } from '../../database/knexDB';
import { v4 as uuidv4 } from 'uuid';
import { matchDescriptionCategory } from '../../helpers/matchDescriptionCategory';
import { ICourseDB } from '../../interfaces/interfaces';
import { Product } from '../../models/Product';
import { STACKLIST } from '../../types/types';

export const createCourse = async (req: Request, res: Response) => {
    try {
        const { inputName, inputStack, inputImg, inputPrice } = req.body;
        const courseName: string = inputName + " " + inputStack    
        const courseId : string = uuidv4()
        


        if (typeof courseName !=  typeof 'string') {
            res.status(400)
            throw new Error('400: O nome do curso deve seguir o formato "NOME do curso + STACK"');
        }

        if (!inputImg.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
            res.status(400)
            throw new Error('400: A imagem deve corresponder a um endereço URL válido');
        }

        const newInstance :Product = new Product(
            courseId,
            courseName,
            "cursos",
            inputImg,
            Number(inputPrice)
        )

        const inputCourse : ICourseDB ={
            id: newInstance.getId(),
            name: newInstance.getName(),
            description: "cursos",      
            image_url: newInstance.getImageUrl(),
            price: newInstance.getPrice()
        }

        await db('products').insert(inputCourse);

        const newCourseDB = await db.raw(`SELECT * FROM products WHERE id LIKE "${newInstance.getId()}"`)


        const result: Product[] = newCourseDB.map(
            (course: ICourseDB) =>
              new Product(
                course.id,
                course.name,
                course.description,
                course.image_url,
                course.price
              )
          );

        res.status(201).send({message: 'Curso cadastrado com sucesso',
        result});
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Erro inesperado');
        }
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.q as string | undefined;

        if (!searchTerm) {
            const message = 'LISTA DE CURSOS CADASTRADOS NO SISTEMA';
            const resultDB = await db('products').where('description', 'LIKE', 'cursos');

            const result: Product[] = resultDB.map(
                (course: ICourseDB) =>
                  new Product(
                    course.id,
                    course.name,
                    course.description,
                    course.image_url,
                    course.price
                  )
              );

            res.status(200).send({ message, result });
        } else {
            if (searchTerm.length < 1 || searchTerm === '') {
                res.status(400).send('Pesquisa deve ter ao menos 1 caracter');
                return;
            }

            const resultDB = await db('products').where('name', 'LIKE', `%${searchTerm}%`).andWhere('description', 'LIKE', 'cursos');

            if (resultDB[0]) {
                res.status(404)
                throw new Error(`404: Nenhum curso encontrado para "${searchTerm}"`);
        
            }


            const result: Product[] = resultDB.map(
                (course: ICourseDB) =>
                  new Product(
                    course.id,
                    course.name,
                    course.description,
                    course.image_url,
                    course.price
                  )
              );

            res.status(200).send({ message: `Resultado para "${searchTerm}"`, result });
        }
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Erro inesperado');
        }
    }
};




export const getCourseById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const resultDB = await db('products').where('id', id).first();

        if (!resultDB) {
            res.status(404)
            throw new Error(`404: Curso não cadastrado, verifique o ID "${id}"`);
        } else {

            const result: Product = 
                  new Product(
                    resultDB.id,
                    resultDB.name,
                    resultDB.description,
                    resultDB.image_url,
                    resultDB.price
                  )
              

            res.status(200).send({message: "CURSO ENCONTRADO NO SISTEMA" , result });
        }
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Erro inesperado');
        }
    }
};

export const destroyCourse = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const productDelete = await db('products').where({ id }).first();

        if (!productDelete) {
            res.status(404).send('404: Produto não encontrado');
            return;
        }

        await db('products').where({ id }).delete();

        res.status(200).send({ message: `CURSO com id ${id} deletado com sucesso` });
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Erro inesperado');
        }
    }
};
export const editCourseById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {  inputImg, inputPrice } = req.body;
  
        const product4edit: ICourseDB[] = await db("products").where("id", id);
  
        if (!product4edit[0]) {
            res.status(404).send("404: CURSO NÃO Encontrado");
            return;
        }
  
        const oldImg: string = product4edit[0].image_url;
        const dataImg: string = inputImg ? inputImg : oldImg;
  
        const oldPrice: number = product4edit[0].price;
        const dataPrice: number = inputPrice !== undefined ? inputPrice : oldPrice;
  
        const newData: Product = new Product(id, product4edit[0].name, "cursos", dataImg, dataPrice);
  
        const data4Update: ICourseDB = {
            id: newData.getId(),
            name: newData.getName(),
            description: "cursos",
            image_url: newData.getImageUrl(),
            price: newData.getPrice(),
        };
  
        await db("products").where("id", id).update(data4Update);
  
        const resultDB = await db("products").where("id", id);
        const result: Product[] = resultDB.map(
            (courseDB: ICourseDB) =>
                new Product(courseDB.id, courseDB.name, courseDB.description, courseDB.image_url, courseDB.price)
        );
  
        res.status(200).send({ message: `Curso com id ${id} atualizado com sucesso`, result });
    } catch (error) {
        console.error(error);
  
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
