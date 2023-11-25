export class Posts{
    private  id:string;
    private creator_id:string;
    private  content: string;
    private likes: number;
    private dislikes: number;
    private createdAt: string;
    private updatedAt: string;
    constructor(id:string, creator_id: string,  content:string, likes:number, dislikes:number, createdAt:string, updatedAt: string){
        this.id = id;
        this.creator_id = creator_id ;
        this.content=content;
        this.likes = likes;
        this.dislikes =dislikes;
        this.createdAt = createdAt  ;
        this.updatedAt = updatedAt;
    }

       public getId():string{
        return this.id
       }


       public getCreatorId():string{
        return this.creator_id
       }

       public setCreatorId (value:string ):void{
            this.creator_id= value
       }

       public getContent():string{
        return this.content
       }

       public setContent (value:string ):void{
            this.content = value
       }

       public getLikes():number{
        return this.likes
       }

       public setLikes (value:number):void{
            this.likes = value
       }
       public getDislikes():number{
        return this.dislikes
       }

       public setDislikes (value:number):void{
            this.dislikes = value
       }
       public getCreatedAt():string{
          return this.createdAt
         }
  
         public setCreatedAt (value:string ):void{
              this.createdAt = value
         }
         public getUpdateAt():string{
            return this.updatedAt
           }
    
           public setUpdateAt (value:string ):void{
                this.updatedAt = value
           }
}
