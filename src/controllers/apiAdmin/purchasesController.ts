import { Request, Response } from "express";
import { db } from "../../models/knexDB";
import { createId } from "../../helpers/createId";
import { User } from "../../models/User";
import { Phone } from "../../models/Phone";
import { Account } from "../../models/Account";
import { ROLE, TUserDB } from "../../types/types";



import fs from 'fs';
export const createPurchaseTicket = ( async (req: Request, res: Response) => {
interface User {
  cpfCnpj: string;
  name?: string;
  nickname?: string;
  email?: string;
  password?: string;
  role?: string;
  avatar?: string;
}

interface Product {
  purchaseId: string;
  purchaseProduct: string;
  quantity: number;
  finalPrice: number;
  createdAt: string;
}

interface Payment {
  totalPaid: number;
  rest2Pay: number;
}

interface RentalAccount {
  newAccountId?: undefined;
  balance: number;
  ownerId?: string;
}

const defineOwnerId = (ownerId: string | undefined, cpfCnpj: string): string => {
  return ownerId ?? cpfCnpj;
};

const createTicket = (req: Request, res: Response): void => {
  const {
    inputCpfCnpj,
    inputName,
    inputNickname,
    inputEmail,
    inputPassword,
    inputRole,
    inputAvatar,
    inputId,
    inputProduct,
    inputQuantity,
    inputFinalPrice,
    inputTotalPaid,
    accountId,
    inputOwnerId,
  } = req.body;

  const user: User = {
    cpfCnpj: inputCpfCnpj as string,
    name,
    nickname,
    email,
    password,
    role,
    avatar,
  };

  const product: Product = {
    purchaseId: inputId as string,
    purchaseProduct: inputProduct as string,
    quantity: inputQuantity as number,
    finalPrice: inputFinalPrice as number,
    createdAt: new Date().toISOString(),
  };

  const payment: Payment = {
    totalPaid: inputTotalPaid as number,
    rest2Pay: product.finalPrice - inputTotalPaid as number,
  };

  const rentalAccount: RentalAccount = {
    newAccountId: undefined,
    balance: payment.rest2Pay,
    ownerId: defineOwnerId(inputOwnerId as string, user.cpfCnpj),
  };

  const ticket = {
    ...user,
    ...product,
    ...payment,
    ...rentalAccount,
  };

  const ticketJSON = JSON.stringify(ticket);

  fs.writeFile('ticket.json', ticketJSON, (err) => {
    if (err) {
      console.error('Erro ao gerar o ticket de pagamento.');
      res.status(500).send('Erro ao gerar o ticket de pagamento.');
    } else {
      console.log('Ticket de pagamento gerado com sucesso.');
      res.status(200).send('Ticket de pagamento gerado com sucesso.');
    }
  });
};
})

/*
export const destroyPurchase = ( async (req: Request, res: Response) => {

        try {
            const id4Delete = req.params.id
    
            const [purchaseDelete] = await db("purchases").where({ id: id4Delete })
            
            if (!purchaseDelete) {
                res.status(404);
                throw new Error("purchase  nao encontrado")
            }
            await db.raw(`DELETE FROM products_purchases WHERE purchases_id="${purchaseDelete}"`)
            res.status(200).json({ message: 'pedido cancelado com sucesso' })
        }
        catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    })*/
