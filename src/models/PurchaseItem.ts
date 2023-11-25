

export class PurchaseItem{
    constructor(
      private  id:string,
      private  name: string,
      private quantity: number,
      private  price: number,
      private  discount: number,
      private  totalPrice: number,
      private  createdAt :string,
      private  startAt:string,
      private  endAt:string ,
      private  totalDays: number,
    ){}
    public getId():string{
        return this.id
       }

       public getName():string{
        return this.name
       }

       public getQuantity():Number{
        return this.quantity
       }

       public getPrice():Number{
        return this.price
       }
       public getDiscount():Number{
        return this.discount
       }
       public getTotalPrice():Number{
        return this.totalPrice
       }
       
       public getCreatedAt():string{
          return this.createdAt
         }
       public getStartAt():string{
          return this.startAt
         }

       public getEndAt():string{
          return this.endAt
         }

       public getTotalDays():number{
          return this.totalDays
         }
       public setName (value:string):void{
            this.name = value
       }

       public setIQuantity(value:number):void{
            this.quantity= value
       }
       public setIDiscount(value:number):void{
        this.discount= value
     }  
      public setITotalPrice(value:number):void{
     this.totalPrice= value
     }

     public setIStartAt(value:string):void{
          this.startAt= value
     }
     public setIEndAt(value:string):void{
      this.endAt= value
   }  
    public setITotalDays(value:number):void{
   this.totalDays= value
   }
   public calcTotalPriceValue():number{
      const calcTotal=  (this.quantity * this.price)
      const calcDiscount = calcTotal  * (this.discount / 100)
      const calcPriceWithDiscount = calcTotal - calcDiscount
      return calcPriceWithDiscount
   }
}
