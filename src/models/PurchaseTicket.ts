

export class PurchasedTicket{
    constructor(
        private id:string,
        private buyerId: string, 
        private productId: string,
        private quantity: number,
        private finalPrice: number,
        private totalPaid: number,
        private totalPayments: number,
        private valuePayment :string,
        private startRentalAt: string[],
        private endRentalAt: string[],
        
    ){}
}