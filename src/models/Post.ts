export class Post{
    private  id:string;
    private creator_id:string;
    private  content: string;
    private likes: number;
    private dislikes: number;
    private createdAt: string;
    private updatedAt: string;
    private idDetails: string;
    private detailsImg: string;
    private detailsTags: string[];
    private detailsFeedback: string[];
    private detailsViews: number;

    constructor(id:string, creator_id: string,  content:string, likes:number, dislikes:number, createdAt:string, updatedAt: string,
        idDetails:string , detailsImg: string, detailsTags:string[], detailsFeedback:string[], detailsViews: number){
        this.id = id;
        this.creator_id = creator_id ;
        this.content=content;
        this.likes = likes;
        this.dislikes =dislikes;
        this.createdAt = createdAt  ;
        this.updatedAt = updatedAt;
        this.idDetails = idDetails ;
        this.detailsImg = detailsImg ;
        this.detailsTags = detailsTags ;
        this.detailsFeedback = detailsFeedback ;    
        this.detailsViews = detailsViews ;
    }

       public getId():string{
        return this.id
       }


       public getCreatorId():string{
        return this.creator_id
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

           /* ----------------Getters and Setters referentes a JSON DATA-------------------- */ 

           public getIdDetails():string{
            return this.idDetails
           }
    
    
           public getDetailsImg():string{
            return this.detailsImg
           }
    
           public setDetailsImg(value:string ):void{
                this.detailsImg= value
           }
    
           public getDetailsITags():string[]{
            return this.detailsTags
           }
    
    
           public setDetailsTags (value:string[] ):void{
                this.detailsTags = value
           }
    
           public getDetailsFeebackl():string[]{
            return this.detailsFeedback
           }
    

           public setDetilsFeedback (value:string[]):void{
                this.detailsFeedback= value
           }


           public getDetailsViews():number{
            return this.detailsViews
           }


           public setDetailsViews (value:number):void{
            this.detailsViews = value
       }

}
