export class Phone{
    constructor(
     private id:string,
     private userId: string,  
     private phoneNumber:string 
     ){}

       public getId():string{
        return this.id
       }

       public setId(value:string):void{
           this.id = value
       }


       public getUserId():string{
        return this.userId
       }

       public setUserId (value:string):void{
            this.userId = value
       }

       public getPhoneNumber():string{
        return this.phoneNumber
       }

       public setPhoneNumber (value:string):void{
            this.phoneNumber = value
       }
}
