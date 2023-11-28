import { STACKLIST } from "../types/types"


export class PurchaseItem{
    constructor(
      private  id:string,
      private  projectName: string,
      private author: string,
      private  stack: STACKLIST,
      private  score: number,
      private  description: string,
      private  deploy :string,
      private  repo:string,
      private  imgUrl:string ,
      private likes :number,
      private dislikes :number,
      private  createdAt: string,
      private  updateAt: string,
    ){}
    public getId():string{
        return this.id
       }

       public getProjectName():string{
        return this.projectName
       }

       public getAuthor():string{
        return this.author
       }

       public getStack():STACKLIST{
        return this.stack
       }
       public getScore():Number{
        return this.score
       }
       public getDescription():string{
          return this.description
         }

        public getDeploy():string{
            return this.deploy
           }
        public getRepo():string{
          return this.repo
         }

         public getImgUrl():string{
            return this.imgUrl
           }
  
         public getCreatedAt():string{
            return this.createdAt
           }
        
           public getUpdatedAt():string{
            return this.createdAt
           }

           public getLikes():number{
            return this.likes
           }
  
           public getDislikes():number{
            return this.dislikes
           }


       public setProjectName (value:string):void{
            this.projectName = value
       }

       public setStack(value:STACKLIST):void{
            this.stack= value
       }
       public setScore(value:number):void{
        this.score= value
     }  
      public setDescription(value:string):void{
     this.description= value
     }

     public setDeploy(value:string):void{
          this.deploy= value
     }
     public setRepo(value:string):void{
      this.repo= value
   }  
    public setImgUrl(value:string):void{
   this.imgUrl = value
    }

    public setLikes(value:number):void{
        this.likes= value
     }  

     public setDislikes(value:number):void{
        this.dislikes= value
     }  
     public setUpdateAt(value:string):void{
        this.updateAt = value
    }
}