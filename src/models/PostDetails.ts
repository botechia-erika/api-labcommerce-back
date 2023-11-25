export class PostDetails{


    private  id:string;
    private postImg:string;
    private  tags: string[];
    private feedbackList: string[];
    private totalVisits: number;
    private totalLikes: number;
    private totalFeedback: number;
    private postReference: string;
    constructor(id:string, postImg: string,  tags:string[], feedbackList:string[], totalVisits: number, totalLikes: number  ,  totalFeedback: number,  postReference:string  ){
        this.id = id;
        this.postImg = postImg ;
        this.tags=tags;
        this.feedbackList = feedbackList;
        this.totalVisits =totalVisits;
        this.totalLikes = totalLikes  ;
        this.totalFeedback = totalFeedback;
        this.postReference = postReference
    }

       public getId():string{
        return this.id
       }


       public getPostImg():string{
        return this.postImg
       }

       public setPostImg (value:string ):void{
            this.postImg= value
       }

       public getTags():string[]{
        return this.tags
       }

       public setTags (value:string []):void{
            this.tags = value
       }

       public getFeedbackList():string[]{
        return this.feedbackList
       }

       public setFeedbackList(value:string[]):void{
            this.feedbackList = value
       }
       public getTotalVisits():number{
        return this.totalVisits
       }

       public setTotalVisits (value:number):void{
            this.totalVisits = value
       }
       public getTotalFeedback():number{
          return this.totalFeedback
         }
  
         public setTotalFeedback(value:number ):void{
              this.totalFeedback = value
         }
         public getPostReference():string{
            return this.postReference
         }
    }
