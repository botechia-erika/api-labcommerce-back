import { UserDataBase } from "../database/UserDatabase"
import { User } from "../models/User"
import { TUserDB } from "../types/types"

export class  UserBusiness{
    public async getUsers(q:string |undefined):Promise<User[]>{



        const usersDatabase = new UserDataBase()
        const usersDB = await usersDatabase.findUsers(q)
    
        const users: User[] = usersDB.map((userDB:TUserDB|undefined) =>
                new User(
                  userDB.id,
                  userDB.name,
                  userDB.nickname,
                  userDB.password,
                  userDB.email,
                  userDB.avatar_img,
                  userDB.role  ,
                  userDB.created_at
        ))   
        return users
    }

public async createUser(string:any):Promise<void>{
     
    if (typeof string.email !== "string") {
      throw new Error("'email' deve ser uma string");
    }

    if (typeof string.password !== "string") {
      throw new Error("'password ' deve ser uma string");
    }
    // o método de string .match() verifica se existe o padrão,
    // caso exista ele retornSa um array com os valores encontrados
    // caso não exista ele retorna null (por isso o !)
    if(!string.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)){
        throw new Error(
        "'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }
    const usersDatabase = new UserDataBase()

    const [emailExists] : TUserDB[] | undefined[] = await usersDatabase.findUserByEmail(string.email)
    if (emailExists) {
    throw new Error("'email' já esta em uso");
    }
     const [nicknameExists] : TUserDB[] | undefined[] = await usersDatabase.findUserByNickname(string.nickname)

    if (nicknameExists) {
      throw new Error("'nickname' já esta em uso");
    }
const today =new Date().toISOString()

  
    const newUser: User = new User(
      string.id,
      string.name,
      string.nickname,
      string.password,
      string.email,
      string.avatar,
      string.role,
     today
    );


    const newUserDB :any ={
      id: newUser.getId(),
      name: newUser.getName(),
      nickname: newUser.getNickname(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      created_at: newUser.getCreatedAt(),
      avatar_img: newUser.getAvatar(),
      role: newUser.getRole()
    }
    await usersDatabase.insertUser(newUserDB) 
    return newUserDB
  }
    public async getUserById(id:string):Promise<User[]>{

    const usersDatabase = new UserDataBase()
    const usersDB: TUserDB[] | undefined[] = await usersDatabase.findUserById(id)

    const users: User[]|undefined[] = usersDB.map(
      (userDB: TUserDB | undefined) =>
        new User(
          userDB.id,
          userDB.name,
          userDB.nickname,
          userDB.password,
          userDB.email,
          userDB.avatar_img,
          userDB.role,
          userDB.created_at
        )
    );
    return users
    }
    public async editUser(obj:any):Promise<any>{

  
      if (obj.name) {
        if (typeof obj.name !== typeof "string") {
          throw new Error("Nome do produto deve ser do tipo string");
        }
      }
  
      if (obj.nickname) {
        if (typeof obj.nickname !== typeof "string") {
          throw new Error("Descrição deve ser do tipo string");
        }
      }
  
      if (obj.email) {
        if (typeof obj.email !== typeof "string") {
          throw new Error("Novo email deve ser de tipo string");
        }
      }
  
      if (obj.password) {
        if (typeof obj.password == typeof "string") {
          throw new Error("'new password ' deve ser uma string");
        }
      }
      if (obj.password) {
        // o método de string .match() verifica se existe o padrão,
        // caso exista ele retorna um array com os valores encontrados
        // caso não exista ele retorna null (por isso o !)
        if (
          !obj.password.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
          )
        ) {
          throw new Error(
            "'new password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
          );
        }
      }
  
      
    
      const usersDatabase = new UserDataBase()
      const user4EditDB: TUserDB[] | undefined[] = await usersDatabase.findUserById(obj.id)
  
  
      if(!user4EditDB){
        throw new Error('"404" usuario nao cadastrado')
      }
  
      const userDB: User[] = user4EditDB.map(
        (userDB: TUserDB | undefined) =>
          new User(
            userDB.id,
            userDB.name,
            userDB.nickname,
            userDB.password,
            userDB.email,
            userDB.created_at,
            userDB.avatar_img,
            userDB.role
          )
      );

  const user4Update:TUserDB = {
    id: userDB[0].getId(),
    name: userDB[0].getName(),
    nickname: userDB[0].getNickname(),
    password: userDB[0].getPassword() ,
    email: userDB[0].getEmail(),
    avatar_img:userDB[0].getAvatar(),
    role: userDB[0].getRole(),
    created_at: userDB[0].getCreatedAt()
  }
  
      await usersDatabase.updateUser(user4Update)
  
  return user4Update
    }
    public async destroyUser(id4Delete:string):Promise<void>{
  
      const usersDatabase = new UserDataBase();
      const [user4Delete]: TUserDB[] | undefined[] =await usersDatabase.findUserById(id4Delete);
   
      await usersDatabase.deleteUser(id4Delete)
    }
}