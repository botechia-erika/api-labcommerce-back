process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";
import dotenv from "dotenv";

dotenv.config({
  path: `${__dirname}/../config/${process.env.APP_ENV}`,
});

console.log(process.env.APP_FOO);
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";


import bandsRouter from "./router/apiMusic/bands";
import frotaRouter from "./router/apiCars/frota";
import songsRouter from "./router/apiMusic/songs";
import usersRouter from "./router/apiUsers/users";
import purchasesRouter from "./router/apiAdmin/purchases";
import phonesRouter from "./router/apiAdmin/phones";

//import purchasesRouter from './router/purchases'
const app = express();
import { ROLES } from "./models/User";
//import { Purchases, ProductPurchased } from './models/Purchases';
import morgan from "morgan";

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.resolve(__dirname, "./../public/")))
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.use("/phones", phonesRouter);
app.use("/frota", frotaRouter);
app.use("/songs", songsRouter);
app.use("/users", usersRouter);
app.use("/bands", bandsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("HomePage");
});

app.listen(3003, () => {
  console.log(`Servidor rodando na porta 3003 `);
});
