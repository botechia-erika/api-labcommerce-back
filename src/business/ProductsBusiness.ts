import { ProductsDatabase } from "../database/ProductDatabase"
import { Product } from "../models/Product"
import {TNewProduct, TProductDB} from '../types/types'
import { matchDescriptionCategory} from '../helpers/matchDescriptionCategory'
export class ProductsBusiness{
    public async getAllProducts(q:string |undefined):Promise<Product[]>{
        if ((q && q.length < 0) || q === "") {
            throw new Error("Pesquisa deve ter ao menos 1 caracter");
          }
   
      const productsDatabase = new ProductsDatabase()
      const productsDB = await productsDatabase.findProducts(q)
  
      const products: Product[]|undefined[] = productsDB.map(
        (productDB: TProductDB | undefined) =>
          new Product(
          productDB.id,
          productDB.name,
          productDB.description,
          productDB.image_url,
          productDB.price,
          productDB.category
          )
      )  
  
    return products
}

    public async getProductById(id:string):Promise<Product[]>{
        const productsDatabase = new ProductsDatabase()
        const ProductDB: TProductDB[] | undefined[] = await productsDatabase.findProductById(id)
    
    
              const products: Product[]|undefined[] = ProductDB.map(
          (productDB: TProductDB | undefined) =>
            new Product(
            productDB.id,
            productDB.name,
            productDB.description,
            productDB.image_url,
            productDB.price,
            productDB.category
            )
        )  
    
return products    


    }

    public async  createProduct(newProduct:any):Promise<void>{

        if (typeof newProduct.name != typeof "string" ) {
            throw new Error ('400 nome do deve seguir o formato "MODELO MARCA ANO" ')
        }

        if( typeof newProduct.id !== typeof "string"){
            throw new Error ("400: placa deve ser alfa numerica")
        }

        if (newProduct.id && !newProduct.id.match(/[A-Z]{3}[-][0-9]{4}/g)) {
         
                throw new Error ("400: placa deve seguir o padrão AAA-0000")
        }

        if (!newProduct.image_url.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
    
            throw new Error ("400: imagem deve corresponder a endereço URL VALIDO")
        }
   
    const productsDatabase = new ProductsDatabase()
    const placaExiste: TNewProduct[] | undefined[] = await productsDatabase.findProductById(newProduct.id)



        if ([placaExiste]) {
  
            throw new Error("'placa' já cadastrada")
        } 
                  const product: Product =
                      new Product(
                        newProduct.id,
                        newProduct.name,
                        newProduct.description,
                        newProduct.image_url,
                        newProduct.price,
                      newProduct.category
                        );


                  const product4Insert:TProductDB = {
                    id: product.getId(),
                    name: product.getName(),
                    description: product.getDescription(),
                    image_url: product.getImageUrl(),
                    price:product.getPrice(),
                    category: product.getCategory()
                  }
        
                  await productsDatabase.insertProduct(product4Insert);
       
    
    }

    public async editProductById(product4Edit:any):Promise<void>{
        const productsDatabase = new ProductsDatabase();
        const idExists: TNewProduct[] | undefined[] = await productsDatabase.findProductById(product4Edit.id)
        if(![idExists]){
                throw new Error("404: Produto não cadastrado");
        }

            if (product4Edit.image_url !== undefined) {
                if (!product4Edit.image_url.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
        
                throw new Error ("400: imagem deve corresponder a endereço URL VALIDO")
                }
            }
    
            if(product4Edit.price){
                if(product4Edit.price && typeof product4Edit.price !== typeof Number){

                    throw new Error("400: Preço atualizado deve ser valor numerico valido")
                }
            }
    
           const list4edit: TNewProduct[] | undefined[] = await productsDatabase.findProductById(product4Edit.id);
       
            const product4edit: Product = new Product(
              list4edit[0].id,
              list4edit[0].name === product4Edit.name ? list4edit[0].name :  product4Edit.name,
              list4edit[0].description  =  matchDescriptionCategory(product4Edit.price),
              list4edit[0].image_url === product4Edit.image_url ? list4edit[0].image_url :  product4Edit.image_url,
              list4edit[0].price === product4Edit.price ? list4edit[0].price : product4Edit.price,
              list4edit[0].category === product4Edit.category ? list4edit[0].category :  product4Edit.category      
              ); 
            
            
            const product4update:TProductDB = {
                id: product4edit.getId(),
                name: product4edit.getName(),
                description: product4edit.getDescription(),
                image_url: product4edit.getImageUrl(),
                price: product4edit.getPrice(),
                category: product4edit.getCategory()
            }
    
                  
        await productsDatabase.insertProduct(product4update);
    }


    public async destroyProduct(id:string):Promise<void>{

          const productsDatabase = new ProductsDatabase();
          const id4delete: TProductDB[] | undefined[] =
            await productsDatabase.findProductById(id);
    
        
        if (!id4delete) {
            throw new Error("product  nao encontrado")
        }
    
        await productsDatabase.deleteProduct(id);
    }
}