import { createId } from "../helpers/createId";
export enum ROLES {
  NORMAL = "Normal",
  STUDENT = "Student",
  OWNER = "Owner",
  EMPLOYER = "Employer",
  AUTHOR = "Author",
  INSTRUCTOR = "Instructor",
  BUYER = "Buyer",
}

type TUserForm = {
  id: string;
  name: string;
  nickname: string;
  password: string;
  role:
    | ROLES.AUTHOR
    | ROLES.NORMAL
    | ROLES.BUYER
    | ROLES.EMPLOYER
    | ROLES.OWNER
    | ROLES.STUDENT
    | ROLES.INSTRUCTOR;
};

export class User {
  private id: string;
  private name: string;
  private nickname: string;
  private email: string;
  private password: string;
  private createdAt: string;
  private avatar: string;
  private role: string;
  constructor(
    id: string,
    name: string,
    nickname: string,
    password: string,
    email: string,
    createdAt: string,
    avatar: string,
    role: string
  ) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.password = password;
    this.email = email;
    this.createdAt = createdAt;
    this.avatar = avatar;
    this.role = role;
  }

  // metodos get e setter

  public getId(): string {
    return this.id;
  }

  public setId(newId: string | undefined) {
    const idCreate = createId(newId);
    this.id = idCreate;
  }

  public getName(): string {
    return this.name;
  }

  public setName(newName: string) {
    this.name = newName;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public setNickname(newNickname: string) {
    this.name = newNickname;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(newEmail: string) {
    this.email = newEmail;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(newPassword: string): void {
    this.password = newPassword;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public setAvatar(value: string): void {
    this.avatar = value;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(value: string): void {
    this.role = value;
  }
  public getCreatedAt(): string {
    return this.createdAt;
  }

  public setCreatedAt(newCreatedAt: string) {
    this.createdAt = newCreatedAt;
  }

  /*  public validatePassword (inputPassword: string){
        if(inputPassword === this.getPassword() ){
            return true 
        }else{
            return false
        }
       }*/
}
