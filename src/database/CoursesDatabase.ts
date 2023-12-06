import { BaseDatabase } from "./BaseDatabase";
import { TProductDB, TUserDB, USER_ACCOUNT } from "../types/types";
import { ICourseDB } from "../interfaces/interfaces";
// CRIACAO DO BASEDATABASE  serve para EXTRAIR A LOGICA ASSOCIADA A EXTRACAO DE INFO DO BANCO DE DADOS, A PARTE QUE FAZ A REQUISICAO DA INFO NAO PRECISA SABER COMO A LOGICA E EXECUTADA

export class CoursesDatabase extends BaseDatabase {
  public static TABLE_PRODUCTS = "products";

  public async getAllCourses(){
    const result: ICourseDB[] = await BaseDatabase.connection(
      CoursesDatabase.TABLE_PRODUCTS
    ).where("description", "LIKE", "cursos");

    const coursesDB = result
    return coursesDB
  }

  public async findCouseByName(q: string) {
      const result: ICourseDB[] | undefined[] = await BaseDatabase.connection(
        CoursesDatabase.TABLE_PRODUCTS).
        where("description", "LIKE", "cursos").
        andWhere("name", "LIKE", `${q}`);

      const coursesDB = result;
      return coursesDB;
    }

  public async insertCourse(course4Insert: ICourseDB) {
    await BaseDatabase.connection(CoursesDatabase.TABLE_PRODUCTS).insert(
      course4Insert
    );
  }

  public async updateCar(course4update: ICourseDB) {
    await BaseDatabase.connection(CoursesDatabase.TABLE_PRODUCTS).
      update(course4update).
      where("id", "LIKE", `${course4update.id}`);
  }


  public async deleteCourse (id4Delete:string){
    await BaseDatabase.connection(CoursesDatabase.TABLE_PRODUCTS).
    delete().where( "id", "LIKE" , `${id4Delete}`);
  }
}