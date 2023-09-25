

export class ProductPurchased{
    constructor(
        public id:string,
        public name: string,
        public quantity: number,
        public price: number,
        public discount: number,
        public totalPrice: number,
        public createdAt :string
    ){}
}