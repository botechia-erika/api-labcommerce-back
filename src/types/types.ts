import { db } from "../models/BaseDatabase";

/* ------------  AULA TYPESCRIPT 1 --------------------------- */

export type TCarro = {
  marca: string;
  modelo: string;
  ano: number | string;
};

/* ------------  INICIO AULA TYPESCRIPT 2 --------------------------- */

export type TPerson = {
  id: string | number;
  name: string;
  nickname: string;
  email: string;
  password: string;
  role: ROLE;
};

export enum ROLE {
  ADMIN = "Admin",
  NORMAL = "Normal",
  BUYER = "Buyer",
}

const usuario: TPerson = {
  id: 1,
  name: "Matheus",
  nickname: "matheus-user",
  email: "matheus@email.com",
  password: "123456",
  role: ROLE.ADMIN,
};

export enum ACCOUNT {
  "MENSAL",
  "ANUAL",
  "PROMO",
  "COMBO",
}
const teste = true;
type TAdminAccount = {
  nickname: string;
  permission: true;
};

const userAdmin: TAdminAccount = {
  nickname: "Muri",
  permission: teste,
};

type TNormalAccount = {
  nickname: string;
  permission: false;
};
const userNormal: TNormalAccount = {
  nickname: "Yuri",
  permission: false,
};

type TPersonAdmin = TPerson & TAdminAccount;
type TPersonNormal = TPerson & TNormalAccount;

const usuarioAdmin: TPersonAdmin = {
  id: 100,
  name: "Vitor",
  email: "vitor@gmail.com",
  password: "4321",
  role: ROLE.ADMIN,
  nickname: "Vitão",
  permission: true,
};
const usuarioNormal: TPersonNormal = {
  id: 101,
  name: "Vitor",
  email: "vitor@gmail.com",
  password: "4321",
  role: ROLE.NORMAL,
  nickname: "Vitão",
  permission: false,
};

export const arrayPersonRole: Array<TPersonAdmin | TPersonNormal> = [
  usuarioAdmin,
  usuarioNormal,
];
const arrayPersonRoles: (TPersonAdmin | TPersonNormal)[] = [
  usuarioAdmin,
  usuarioNormal,
];

type TPersonRainbow = {
  nome: string;
  idade: Number;
  corFavorita: RAINBOW_TABLE;
};

enum RAINBOW_TABLE {
  VIOLET = "VIOLET",
  INDIGO = "INDIGO",
  BLUE = "BLUE",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  ORANGE = "ORANGE",
  RED = "RED",
}

const pessoa: TPersonRainbow = {
  nome: "Astrodev",
  idade: 30,
  corFavorita: RAINBOW_TABLE.BLUE && RAINBOW_TABLE.INDIGO,
};

const homer: TPersonRainbow = {
  nome: "Homer Simpsons",
  idade: 39,
  corFavorita: RAINBOW_TABLE.YELLOW && RAINBOW_TABLE.ORANGE,
};

const barney: TPersonRainbow = {
  nome: "Barney",
  idade: 3,
  corFavorita: RAINBOW_TABLE.VIOLET && RAINBOW_TABLE.RED && RAINBOW_TABLE.GREEN,
};

export type Post = {
  autor: string;
  texto: string;
};

/* ------------  FINAL AULA TYPESCRIPT 2 --------------------------- */

/* ------------  INICIO API EXPRESS --------------------------- */
export enum COURSE_STACK {
  FRONT = "Front-end",
  BACK = "Back-end",
}

export type TCourse = {
  id: string;
  name: string;
  lessons: number;
  stack: COURSE_STACK;
};
/* ------------  FINAL AULA API-EXPRESS --------------------------- */

/* ------------  INICIO AULA APROFUNDAMENTO-EXPRESS --------------------------- */

export enum ACCOUNT_TYPE {
  BRONZE = "Bronze",
  SILVER = "Prata",
  GOLD = "Ouro",
  PLATINUM = "Platina",
  BLACK = "Black",
}

export type TAccount = {
  id: string;
  ownerName: string;
  balance: number;
  type: ACCOUNT_TYPE;
};
/* ------------  FINAL AULA APROFUNDAMENTO-EXPRESS --------------------------- */

/* ------------  INICIO AULA POO1 --------------------------- */

export type TUserDB = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  created_at: string;
  avatar_img: string;
  role: string;
};

// tipagem para criação (POST) sem created_at
export type TUserPost = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
};

export type TAccountDB = {
  id: string;
  balance: number;
  owner_id: string;
  created_at: string;
};

// tipagem para criação (POST) sem balance e created_at
export type TAccountDBPost = {
  id: string;
  owner_id: string;
};

/* ------------  FINAL AULA POO1 --------------------------- */

export type Task = {
  id: string;
  title: string;
  description: string;
  status: CURRENTSTATUS.INICIADA | CURRENTSTATUS.NAOINICIADA;
};

export enum CURRENTSTATUS {
  NAOINICIADA = 0,
  INICIADA = 1,
}

export type AUTHORS_TASKS = {
  id_task: string;
  id_author: string;
};

export type TProjects = {
  id: string;
  name: string;
  img: string;
  repo: string;
  url: string;
  release: number;
  modulos_idModulos: "MR";
};

export type TProductDB = {
  id: string;
  name: string;
  description: DESCRIPTION_CATEGORY;
  image_url: string;
  price: number;
};

export type TNewProduct = {
  id: string;
  name: string;
  description: string | undefined;
  image_url: string | undefined;
  price: number | undefined;
};
const Title = {
  name: "CONWAY",
  product: "AULAS",
  value: "LABENU",
};
type ADM = {
  name: "ERIKA-BOTECHIA";
  product: 8;
  key: "AUTORIZATION";
  AUTHORIZATHION: "CONWAY-ERIKA-BOTECHIA";
  LABENUMERO: "22124748";
  LABEMAIL: "BOTECHIAERI@GMAIL.COM" | "MENDONCABOTECHIA@PROTON.ME";
};

export type TItemPurchased = {
  id: string;
  productSearched: string;
  name: string;
  description: string;
  image_url: string;
  price: Number | string;
  quantity: number;
};

/*
export type TProductsDB = {
    product_id:string,
    quantity:number,
    priceUnity:number,
    totalItem:number
}*/

/*const purchaseDBNumber = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const dbFunciona = db;
        const lastPg = await dbFunciona.raw(`SELECT id FROM purchases ORDER BY DESC LIMIT 1`);
        
        console.log(newPurchaseId)
      } catch (err) {
        reject(err)
      }
    })
  }*/

// await dbFunciona("users").where({ id: `${buyerId}` });

/* -------------------------PROJETO PER SE ------------------------------ */

export enum DESCRIPTION_CATEGORY {
  LIGHT = "Light",
  HATCH = "Hatch",
  SEDAN = "Sedan",
  PRIME = "Prime",
  LUX = "Lux",
}

export type TUser = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  createdAt: string;
};

export type TPhoneDB = {
  id: string;
  id_user: string;
  phone_number: string;
};

export enum LabCATEGORIES {
  LAB1 = "LabFOOD",
  LAB3 = "LabFROTA",
  LAB4 = "LabTASKS",
  LAB5 = "LabQUOTES",
  LAB2 = "LabCLOTHES",
  LAB6 = "LabLISTS",
  LAB7 = "LabPROJECTS",
}
