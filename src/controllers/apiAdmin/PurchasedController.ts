import { Request, Response } from "express";
import { BaseDatabase } from "../../database/BaseDatabase";
import { createId } from "../../helpers/createId";
import { TUserDB, TUser } from "../../types/types";

import { User } from "../../models/User";

import { UserDataBase } from "../../database/UserDatabase";
import { UserBusiness } from "../../business/UserBusiness";
export class UserController{
/* -----------GET USERS ------------------- */
 public getUsers = async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string | undefined


    const userBusiness  = new UserBusiness()
    const result = await userBusiness.getUsers(q)

    if(result.length === 0){
      res.status(404)
      throw new Error('404 users nao encontrado')
    }
    res.status(200).json(result);
    }
   catch (error) {
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
}
public getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const userBusiness  = new UserBusiness()
    const result = await userBusiness.getUserById(id)


    res.status(200).json(result);
      
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
}
}



/* ----------------------- CREATE USER --------------------------- */
public createUser = async (req: Request, res: Response) => {
  try {
    const id21 = req.body.inputCpfCnpj as string  | undefined;
    const name = req.body.inputName as string | undefined;
    const nickname = req.body.inputNickname as string | undefined;
    const email = req.body.inputEmail as string | undefined;
    const password = req.body.inputPassword as string | undefined;
    const role = req.body.inputRole as string | undefined;
    const avatar = req.body.inputAvatar as string | undefined;
    const today = new Date().toISOString()

      
    const input = {
      id: id21,
      name: name,
      nickname: nickname,
      email: email,
      password: password,
      role: role,
      avatar: avatar


    }        

   const userBusiness = new UserBusiness()
   const result = userBusiness.createUser(input)

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

/* ------------------------EDIT USER ---------------------------- */

public editUserById = async (req: Request, res: Response) => {
  try {
    const id21 = req.params.id as string;
    const cpfCnpj = req.body.inputCpfCnpj as string | undefined;
    const name = req.body.inputName as string | undefined;
    const nickname = req.body.inputNickname as string | undefined;
    const email = req.body.inputEmail as string | undefined;
    const password = req.body.inputPasswordConfirm as string | undefined;
    const role = req.body.inputRole as string | undefined;
    const avatar = req.body.inputAvatar as string | undefined;
    const obj = {
      id: id21,
      name: name,
      nickname: nickname,
      email: email,
      password: password,
      role: role,
      avatar: avatar
    }
    const userBusiness = new UserBusiness()
    const result = userBusiness.editUser(obj)
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

public  destroyUser = async (req: Request, res: Response) => {
  try {
    
    const id4Delete = req.params.id as string 

    const userBusiness  = new UserBusiness()
    const result = await userBusiness.destroyUser(id4Delete)


    if (![result]) {
      res.status(404)
      throw new Error("usuário  nao encontrado");
    }

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
}