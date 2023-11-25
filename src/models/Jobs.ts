
export class Band{
    private  id:string;
    private name:string;
    private nickname: string;
    private enterprise : string;
    private password :string;
    private countryCode: string;
    private createdAt: string;
    private skillsRequired: string[];
    private applicationUrl: string;
    private status: number;

    constructor(id:string, name: string,  nickname:string, password:string, enterprise:string, countryCode:string, createdAt: string,
        skillsRequired: string[], appllicationUrl : string, status:number,){
        this.id = id;
        this.name = name ;
        this.nickname=nickname;
        this.password = password;
        this.enterprise = enterprise;
        this.countryCode = countryCode;
        this.createdAt = createdAt;
        this.skillsRequired = skillsRequired ;
        this.applicationUrl = appllicationUrl;
        this.status = status;
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

       public getEnterprise():string{
        return this.enterprise
       }

       public setEnterprise (value:string ):void{
            this.enterprise = value
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
         public getSkillsRequireds():string[]{
            return this.skillsRequired
           }
    
           public setSkillsRequired (value:string[] ):void{
                this.skillsRequired = value
           }
           public getApplicationUrl():string[]{
            return this.skillsRequired
           }
    
           public setApplicationUrl(value:string[] ):void{
                this.skillsRequired = value
           }
           public getStatus():number{
            return this.status 
         }
    
           public setStatus(value:number ):void{
                this.status = value
           }
}



