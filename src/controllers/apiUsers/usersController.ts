import { Request, Response } from "express";
import { db } from "../../database/knexDB";
import { v4 as uuidv4 } from "uuid";
import { createId } from "../../helpers/createId";
import { TUserDB, TUser } from "../../types/types";


import { User } from "../../models/User";
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q as string | undefined;
    if (!searchTerm) {
      const message = "LISTA DE USERS CADASTRADO DO SISTEMA";
      const result: TUserDB[] = await db("users").whereNot("role", "LIKE" , "Bands")
      const usersDB = result;
      const users: User[] = usersDB.map(
        (userDB) =>
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
      res.status(200).json({message: "LISTA DE USUARIOS CADASTRADOS", result: users});
    } 
    if(searchTerm){
      const result: TUserDB[] = await db("users").where(
        "name",
        "LIKE",
        `%${searchTerm}%`
      ).whereNot("role", "LIKE" , "Bands")

      const userDB = [result]
      if (!result[0]) {
        res.status(404)
        throw new Error("404 USER NÃO ENCONTRADO" );
      } else {
        const usersDB = result;
        // criar array de users para instanciar em class User permitindo criar uma lista de usuarios em lugar de unico 
        const users: User[] = usersDB.map(
          (userDB) =>
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
        res
          .status(200)
          .json({ message: "Resultado para termo buscado", result: users });
      }
    }
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const idExists = await db("users").where("id", "LIKE", `${id}`).whereNot("role", "LIKE", "%Bands%");
    if (!idExists || idExists === undefined) {
      res.status(404);
      throw new Error("'404': User não encontrado");
    } else {
      const result = [idExists];
      res.status(200).json({ message: "USUARIO ENCONTRADO", result });
    }
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const cpfCnpj = req.body.inputCpfCnpj as string;
    const name = req.body.inputName as string | undefined;
    const nickname = req.body.inputNickname as string | undefined;
    const email = req.body.inputEmail as string | undefined;
    const password = req.body.inputPassword as string | undefined;
    const role = req.body.inputRole as string | undefined;
    const avatar = req.body.inputAvatar as string | undefined;

    const today = new Date().toISOString()

    const [userExists] = await db.raw(
      `SELECT id FROM users WHERE id="${cpfCnpj}"`
    );
    if (userExists) {
      res.status(400);
      throw new Error("id já esta em uso");
    }
    const [emailExists] = await db.raw(
      `SELECT email FROM users WHERE id="${cpfCnpj}"`
    );
    if (emailExists) {
      res.status(400);
      throw new Error("id já esta em uso");
    }
    const [nicknameExists] = await db.raw(
      `SELECT nickname FROM users WHERE id="${cpfCnpj}"`
    );
    if (nicknameExists) {
      res.status(400);
      throw new Error("id já esta em uso");
    }
    




    if (typeof email !== "string") {
      res.status(400).send("email invalido");
    }

    if (typeof password !== "string") {
      throw new Error("'password ' deve ser uma string");
    }
    // o método de string .match() verifica se existe o padrão,
    // caso exista ele retorna um array com os valores encontrados
    // caso não exista ele retorna null (por isso o !)
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
      )
    ) {
      throw new Error(
        "'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }
    const newUser: User = new User(
      cpfCnpj,
      name,
      nickname,
      email,
      password,
      today.toString(),
      avatar,
      role
    );
    /*         const user : User[] = new User(
            newUser.id,
            newUser.name,
            newUser.nickname,
            newUser.password,
            newUser.email, 
            today
        )*/
    await db.raw(`INSERT INTO users (id, name, nickname, email , password, created_at , avatar_img , role)
        VALUES ("${newUser.getId()}", "${newUser.getName()}", "${newUser.getNickname()}", "${newUser.getEmail()}", 
        "${newUser.getPassword()}" , "${newUser.getCreatedAt()}", "${newUser.getAvatar()}", "${newUser.getRole()}")`);



    const [userDB]: TUserDB[] = await db("users").where({id: `${newUser.getId()}`})
    const result = new User(
          userDB.id,
          userDB.name,
          userDB.nickname,
          userDB.password,
          userDB.email,
          userDB.created_at,
          userDB.avatar_img,
          userDB.role
        )
    
    res.status(201).json({ message: "usuario cadastrado com sucesso" , result});

  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};

export const editUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cpfCnpj = req.body.inputCpfCnpj as string;
    const name = req.body.inputName as string | undefined;
    const nickname = req.body.inputNickname as string | undefined;
    const email = req.body.inputEmail as string | undefined;
    const password = req.body.inputPasswordConfirm as string | undefined;
    const role = req.body.inputRole as string | undefined;
    const avatar = req.body.inputAvatar as string | undefined;

    if (name) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("Nome do produto deve ser do tipo string");
      }
    }

    if (nickname) {
      if (typeof nickname !== "string") {
        res.status(400);
        throw new Error("Descrição deve ser do tipo string");
      }
    }

    if (email) {
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("Novo email deve ser de tipo string");
      }
    }

    if (password) {
      if (typeof password == "string") {
        throw new Error("'new password ' deve ser uma string");
      }
    }
    if (password) {
      // o método de string .match() verifica se existe o padrão,
      // caso exista ele retorna um array com os valores encontrados
      // caso não exista ele retorna null (por isso o !)
      if (
        !password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
        )
      ) {
        throw new Error(
          "'new password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
        );
      }
    }
    const [user4edit] = await db("users").where("id" , "LIKE", `${id}`).whereNot("role", "like", "Bands")
      if ([user4edit]) {
      (user4edit.id = user4edit.id),
        (user4edit.name = name || user4edit.name),
        (user4edit.nickname = nickname || user4edit.nickname),
        (user4edit.email = email || user4edit.email),
        (user4edit.password = password || user4edit.password),
        (user4edit.role = role || user4edit.role),
        (user4edit.avatar_img = avatar || user4edit.avatar);
    }

    await db("users")
      .update(user4edit)
      .where({ id: `${id}` });

    res
      .status(201)
      .send({ message: "user atualizado com sucesso", result: user4edit });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};

export const destroyUser = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [users] = await db("users").where({ id: idToDelete });
    if (!users) {
      throw new Error("usuário  nao encontrado");
    }
    await db("users").delete().where({ id: idToDelete });
    res.status(200).json({ message: "users deletado com sucesso" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};
