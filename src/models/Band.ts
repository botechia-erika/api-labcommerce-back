export class Band{
    private  id:string;
    private name:string;
    private nickname: string;
    private email : string;
    private password :string;
    private countryCode: string;
    private createdAt: string

    constructor(id:string, name: string,  nickname:string, password:string, email:string, countryCode:string, createdAt: string){
        this.id = id;
        this.name = name ;
        this.nickname=nickname;
        this.password = password;
        this.email = email;
        this.countryCode = countryCode;
        this.createdAt = createdAt  
     }

       public getId():string{
        return this.id
       }

       public setId (value:string):void{
            this.id = value
       }


       public getName():string{
        return this.name
       }

       public setName (value:string ):void{
            this.name = value
       }

       public getNickname():string{
        return this.nickname
       }

       public setNickname (value:string ):void{
            this.name = value
       }

       public getEmail():string{
        return this.email
       }

       public setEmail (value:string ):void{
            this.email = value
       }

       public getPassword():string{
        return this.password
       }

       public setPassword (value:string ):void{
            this.password = value
       }
       public getCountryCode():string{
        return this.countryCode
       }

       public setCountryCode (value:string ):void{
            this.countryCode = value
       }
       public getCreatedAt():string{
          return this.createdAt
         }
  
         public setCreatedAt (value:string ):void{
              this.createdAt = value
         }
}
