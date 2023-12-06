import { STACKLIST } from "../types/types";

export interface IPostDB {
    id : string;
    creator_id: string;
    content:  string;
    likes: number;
    dislikes: number;
    created_at: string;
    updated_at: string;
}

export interface IProjectDB{
      id:string,
      projectName: string,
     author: string,
      stack: STACKLIST,
      score: number,
      description: string,
      deploy :string,
      repo:string,
      imgUrl:string ,
     likes :number,
     dislikes :number,
      createdAt: string,
      updateAt: string,
}

export  interface IPostDetails {
    id: string,
    postImg: string,
    tags: string[],
    feedbackList: string[],
    totalVisits: number,
    totalLikes: number,
    totalFeedback: number ,
    postReference: string
}

export interface ICourseDB  {
    id: string,
    name: string,
    description: "cursos",
    image_url: string,
    price: number
}