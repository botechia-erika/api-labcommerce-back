import { IPostDetaills } from "../interfaces/interfaces"

export function searchPostReference(detailsData:IPostDetaills[], id:string){
    return detailsData.filter(
        (post:IPostDetaills)=>{
            if( post.postReference ===(id)){
                return post
            }
        }
    )
}