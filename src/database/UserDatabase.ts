import { BaseDatabase } from "./BaseDatabase";
import { TUserDB, USER_ACCOUNT } from "../types/types";
// CRIACAO DO BASEDATABASE  serve para EXTRAIR A LOGICA ASSOCIADA A EXTRACAO DE INFO DO BANCO DE DADOS, A PARTE QUE FAZ A REQUISICAO DA INFO NAO PRECISA SABER COMO A LOGICA E EXECUTADA


export class UserDataBase extends BaseDatabase {
  public static TABLE_USERS = "users";
  public async findUsers(q: string | undefined) {
    let usersDB;
    if (!q) {
      const message = "LISTA DE USERS CADASTRADO DO SISTEMA";
      const result: TUserDB[] = await BaseDatabase.connection(
        UserDataBase.TABLE_USERS
      ).whereNot("role", "LIKE", "Bands");
      usersDB = result;
      return usersDB;
    } else {
      const result = await BaseDatabase.connection(UserDataBase.TABLE_USERS)
        .where("name", "LIKE", `%${q}%`)
        .whereNot("role", "LIKE", "Bands");

      usersDB = result;
      return usersDB;
    }
  }

  public async findUserById(id: string) {
    const result = await BaseDatabase.connection(
      UserDataBase.TABLE_USERS
    ).where("id", "like", `${id}`);

    const userDB = result;
    return userDB;
  }

  public async findUserByNickname(nickname: string) {
    const result = await BaseDatabase.connection(
      UserDataBase.TABLE_USERS
    ).where("nickname", "like", `${nickname}`);

    const userDB = result;
    return userDB;
  }

  public async findUserByEmail(email: string) {
    const result = await BaseDatabase.connection(
      UserDataBase.TABLE_USERS
    ).where("id", "like", `${email}`);

    const userDB = result;
    return userDB;
  }
  public async insertUser(newUserDB: TUserDB) {
    const result = await BaseDatabase.connection(
      UserDataBase.TABLE_USERS
    ).insert(newUserDB);
  }

  public async updateUser(user4EditDB: TUserDB) {
    const result = await BaseDatabase.connection(
      UserDataBase.TABLE_USERS
    ).update(user4EditDB).
    where("id", "LIKE", `${user4EditDB.id}`);
  }

  public async deleteUser (id4Delete:string){
    const result = await BaseDatabase.connection(
    UserDataBase.TABLE_USERS
    ).delete().where( "id", "LIKE" , `${id4Delete}`);
  }
}