export class PurchasedItem{
     constructor (
      private readonly id: string,
      private readonly buyer: string,
      private readonly amount: number,
      private readonly createdAt : string, 
      private readonly purchaseId: string,
     ) {}
     public getId(): string {
      return this.id
     }
     public getBuyer():string{
      return this.buyer
     }
     public getAmount():number{
       return this.amount
     }
     public getCreatedAt():string{
      return this.createdAt
     }
     public getPurchaseId():string{
      return this.purchaseId
     }
}

export class PurchaseList{
    constructor(
        private readonly id:string,
        private  buyer: string,
        private  account: string,
        private  totalPrice: number,
        private numberOfPayment: number,
        private priceOfOnePayment: number ,
        private readonly paymentsList : PurchasedItem[]=[],
        private  paid :number,
    ){}
    public getId():string{
        return this.id
       }

       public getBuyer():string{
        return this.buyer
       }

       public getAccount():string{
        return this.account
       }

       public getTotalPrice():number{
         return this.totalPrice
       }


       public getNumberOfPayments():number{
         return this.numberOfPayment
       }

       public getPriceOfPOnePayment():Number{
        return this.priceOfOnePayment
       }
       public getPaid():Number{
        return this.paid
       }

       public setBuyer (value:string):void{
            this.buyer = value
       }

       public setIAccount(value:string):void{
            this.account= value
       }
       public setTotallPrice(value:number):void{
        this.totalPrice= value
     }  
      public setINumberOfPayments(value:number):void{
     this.numberOfPayment= value
     }

     public setPriceOfOnePayment(value:number):void{
          this.priceOfOnePayment= value
     }
     public setPaid(value:number):void{
      this.paid= value
     }
   public addPurchasedItems(purchasedItem:PurchasedItem):void{
     this.paymentsList.push(purchasedItem)
     }
}
