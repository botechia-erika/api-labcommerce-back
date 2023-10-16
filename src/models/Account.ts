export class Account {
    constructor(
        private id: string,
        private balance: number,
        private owner: string,
        private category: string
    ) {}

    public getId(): string {
        return this.id
    }

    public getBalance(): number {
        return this.balance
    }

    public setBalance(value: number): void {
        this.balance = value
    }

    public getOwner(): string {
        return this.owner
    }

    public setOwnerId(value: string): void {
        this.owner = value
    }

    public getCategory(): string {
        return this.category
    }

    public setCategory(value: string): void {
        this.category = value
    }
}