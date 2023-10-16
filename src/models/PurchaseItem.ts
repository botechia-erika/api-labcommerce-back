

export class PurchasedItem{
    constructor(
        private id:string,
        private buyerId: string, 
        private productId: string,
        private quantity: number,
        private finalPrice: number,
        private totalPaid: number,
        private totalPayments: number,
        private valueOfPayment :number,
        private startRentalAt: [],
        private endRentalAt: [],
        
    ){}
    public getId(): string {
        return this.id;
      }
    
    
    
      public getBuyerId(): string {
        return this.buyerId;
      }
    

    
      public getProductId(): string {
        return this.productId;
      }
    
      public setProductId(value: string):void {
        this.productId = value;
      }
    
      public getQuantity(): number {
        return this.quantity;
      }
    
      public setQuantity(value: number):void {
        this.quantity = value;
      }
    
      public getFinalPrice():number {
        return this.finalPrice;
      }
    
      public setFinalPrice(value: number): void {
        this.finalPrice = value;
      }
    
      public getTotalPaid():number {
        return this.totalPaid;
      }
    
      public setTotalPaid(value: number): void {
        this.totalPaid = value;
      }
    
      public getTotalPayments():number {
        return this.totalPayments;
      }
    
      public setTotalPayments(value: number): void {
        this.totalPayments = value;
      }

      public getValueOfPayment():number {
        return this.valueOfPayment;
      }
    
      public setValueOfPayment(value: number): void {
        this.valueOfPayment = value;
      }
      public getStartRental():[] {
        return this.startRentalAt;
      }
    
      public getEndRental():[] {
        return this.endRentalAt;
      }
      public SetEndRentalAt(value:[] ): void {
        this.endRentalAt = value;
      }
    
}
    

