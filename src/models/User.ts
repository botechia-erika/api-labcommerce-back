import { createId } from "../helpers/createId";
export enum ROLES {
  NORMAL = "Normal",
  STUDENT = "Student",
  OWNER = "Owner",
  EMPLOYER = "Employer",
  AUTHOR = "Author",
  INSTRUCTOR = "Instructor",
  BUYER = "Buyer",
  BANDS = "Bands'",
  ENTERPRISE = "Enterprise",
  VENDORS="Vendors"
}

type TUserForm = {
  id: string;
  registerName: string;
  nickname: string;
  password: string;
  role: string
};

export class User {
  private id: string;
  private registerName: string;
  private nickname: string;
  private email: string;
  private password: string;
  private createdAt: string;
  private avatar: string;
  private role: string;
  constructor(
    id: string,
    registerName: string,
    nickname: string,
    password: string,
    email: string,
    createdAt: string,
    avatar: string,
    role: string
  ) {
    this.id = id;
    this.registerName = registerName;
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



  public getregisterName(): string {
    return this.registerName;
  }

  public setregisterName(newregisterName: string) {
    this.registerName = newregisterName;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public setNickname(newNickname: string) {
    this.registerName = newNickname;
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

  }

  /*  public validatePassword (inputPassword: string){
        if(inputPassword === this.getPassword() ){
            return true 
        }else{
            return false
        }
       }*/

