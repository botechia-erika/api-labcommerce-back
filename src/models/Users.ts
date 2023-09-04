
export enum ROLES  {
    NORMAL = "Normal",
    STUDENT="Student",
    OWNER="Owner",
    EMPLOYER="Employer",
    AUTHOR="Author",
    INSTRUCTOR="Instructor",
    BUYER="Buyer"

}


export class User{
    public readonly id:string;
    public name:string;
    public nickname: string;
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
}