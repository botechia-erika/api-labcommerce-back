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
    id: string,
    name: string, 
    score: number,
    status: number,
    repo: string,
    deploy: string,
    author: string,
    instructor: string
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