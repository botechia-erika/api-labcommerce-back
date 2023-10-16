import { BaseDatabase } from "./BaseDatabase";
import { TProductDB, TUserDB, USER_ACCOUNT } from "../types/types";
// CRIACAO DO BASEDATABASE  serve para EXTRAIR A LOGICA ASSOCIADA A EXTRACAO DE INFO DO BANCO DE DADOS, A PARTE QUE FAZ A REQUISICAO DA INFO NAO PRECISA SABER COMO A LOGICA E EXECUTADA

export class FrotaDataBase extends BaseDatabase {
  public static TABLE_PRODUCTS = "products";
  public async findCars(q: string | undefined) {
    let frotaDB;
    if (!q) {
      const result: TProductDB[] = await BaseDatabase.connection(
        FrotaDataBase.TABLE_PRODUCTS
      )
        .where("description", "LIKE", "Light")
        .orWhere("description", "LIKE", "Hatch")
        .orWhere("description", "LIKE", "Sedan")
        .orWhere("description", "LIKE", "Prime")
        .orWhere("description", "LIKE", "Lux");

      frotaDB = result;
      return frotaDB;
    } else {
      const result: TProductDB[] = await BaseDatabase.connection(
        FrotaDataBase.TABLE_PRODUCTS
      )
        .where("description", "LIKE", "Light")
        .orWhere("description", "LIKE", "Hatch")
        .orWhere("description", "LIKE", "Sedan")
        .orWhere("description", "LIKE", "Prime")
        .orWhere("description", "LIKE", "Lux")
        .andWhere("name", "LIKE", `${q}`);

      frotaDB = result;
      return frotaDB;
    }
    return frotaDB;
  }

  public async findCarById(id: string) {
    const result = await BaseDatabase.connection(FrotaDataBase.TABLE_PRODUCTS)
      .where("id", "like", `${id}`)
      .andWhere("description", "LIKE", `Light`)
      .orWhere("description", "LIKE", "Hatch")
      .orWhere("description", "LIKE", "Sedan")
      .orWhere("description", "LIKE", "Prime")
      .orWhere("description", "LIKE", "Lux");

    const carDB = result;
    return carDB;
  }
  public async insertCar(product4Insert: TProductDB) {
    await BaseDatabase.connection(FrotaDataBase.TABLE_PRODUCTS).insert(
      product4Insert
    );
  }

  public async updateCar(product4update: TProductDB) {
  await BaseDatabase.connection(FrotaDataBase.TABLE_PRODUCTS)
      .update(product4update)
      .where("id", "LIKE", `${product4update.id}`);
  }


  public async deleteCar (id4Delete:string){
      await BaseDatabase.connection(
    FrotaDataBase.TABLE_PRODUCTS
    ).delete().where( "id", "LIKE" , `${id4Delete}`);
  }
}
