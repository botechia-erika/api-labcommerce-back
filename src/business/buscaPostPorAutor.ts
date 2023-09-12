import { Post } from "../types/types"

export function buscaPostsPorAutor(posts:Post[], autorInformado:string){
    return posts.filter(
        (post:Post)=>{
            return post.autor === autorInformado
        }
    )
}