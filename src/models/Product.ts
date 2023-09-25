export class Product{
    constructor(
     private id:string,
     private name: string,  
     private description:string,
     private imageUrl :string ,
     private price: number
     ){}

       public getId():string{
        return this.id
       }


       public getName():string{
        return this.name
       }

       public getDescription():string{
        return this.description
       }

       public setDescription (value:string):void{
            this.description = value
       }
       public getImageUrl():string{
        return this.imageUrl
       }

       public setImageUrl (value:string):void{
            this.imageUrl = value
       }
       public getPrice():number{
        return this.price
       }

       public setPrice (value:number):void{
            this.price = value
       }
}

