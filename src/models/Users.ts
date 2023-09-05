import { createId } from "../helpers/createId";
export enum ROLES  {
    NORMAL = "Normal",
    STUDENT="Student",
    OWNER="Owner",
    EMPLOYER="Employer",
    AUTHOR="Author",
    INSTRUCTOR="Instructor",
    BUYER="Buyer"

}


type TUserForm = {
    id: string;
    name: string;
    nickname: string; 
    password: string;
    role:  ROLES.AUTHOR | ROLES.NORMAL |ROLES.BUYER| ROLES.EMPLOYER|ROLES.OWNER|ROLES.STUDENT| ROLES.INSTRUCTOR
}


export class User{
    private  id:string;
    private name:string;
    private nickname: string;
    private email : string;
    private password :string;
    private role: ROLES 

    constructor(id:string, name: string, nickname:string, password:string, role:ROLES){
        this.id = id;
        this.name = name ;
        this.nickname=nickname;
        this.password = password;
        this.role = ROLES.AUTHOR || ROLES.NORMAL ||ROLES.BUYER|| ROLES.EMPLOYER||ROLES.OWNER||ROLES.STUDENT|| ROLES.INSTRUCTOR
       }

       // metodos get e setter

       public getId():string{
        return this.id
       }

       public setId (newId:string | undefined){
            const idCreate = createId(newId)
            this.id = idCreate
       }


       public getName():string{
        return this.name
       }

       public setName (newName:string ){
            this.name = newName
       }

       public getNickname():string{
        return this.nickname
       }

       public setNickname (newNickname:string ){
            this.name = newNickname
       }

       public getEmail():string{
        return this.email
       }

       public setEmail (newEmail:string ){
            this.email = newEmail
       }

       public getRole():string{
        return this.role
       }

       public setRole (newRole:ROLES ){
            this.role = newRole
       }
       public getPassword():string{
        return this.password
       }

       public setPassword (newPassword:ROLES ){
            this.role = newPassword
       }
      /*  public validatePassword (inputPassword: string){
        if(inputPassword === this.getPassword() ){
            return true 
        }else{
            return false
        }
       }*/
  
}