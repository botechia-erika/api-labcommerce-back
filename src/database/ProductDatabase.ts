import { BaseDatabase } from "./BaseDatabase";
import { TProductDB} from "../types/types";
// CRIACAO DO BASEDATABASE  serve para EXTRAIR A LOGICA ASSOCIADA A EXTRACAO DE INFO DO BANCO DE DADOS, A PARTE QUE FAZ A REQUISICAO DA INFO NAO PRECISA SABER COMO A LOGICA E EXECUTADA

export class ProductsDatabase extends BaseDatabase {
  public static TABLE_PRODUCTS = "products";
  public async findProducts(q: string | undefined) {
    let productsDB;
    if (!q) {
      const result: TProductDB[] = await BaseDatabase.connection(
        ProductsDatabase.TABLE_PRODUCTS
      )
      productsDB = result;
      return productsDB;
    } else {
      const result: TProductDB[] = await BaseDatabase.connection(
        ProductsDatabase.TABLE_PRODUCTS
      )
        .where("name", "LIKE", `${q}`);

      productsDB = result;
      return productsDB;
    }
    return productsDB;
  }

  public async findProductById(id: string) {
    const result = await BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS)
      .where("id", "like", `${id}`)
     
    const productDB = result;
    return productDB;
  }
  public async insertProduct(product4Insert: TProductDB) {
    await BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).insert(
      product4Insert
    );
  }

  public async updateProduct(product4update: TProductDB) {
  await BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS)
      .update(product4update)
      .where("id", "LIKE", `${product4update.id}`);
  }


  public async deleteProduct (id4Delete:string){
      await BaseDatabase.connection(
    ProductsDatabase.TABLE_PRODUCTS
    ).delete().where( "id", "LIKE" , `${id4Delete}`);
  }
  public async findProductsByCategory(category: string) {
    const result = await BaseDatabase.connection(
      ProductsDatabase.TABLE_PRODUCTS
    ).where("category", "like", `%${category}%`)
    return result
  }
}
