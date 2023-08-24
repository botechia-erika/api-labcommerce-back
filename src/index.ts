
import dotenv from 'dotenv'
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
//import { arrayPersonRole} from './types/types';
import purchasesRouter from './routes/purchases'
import productsRouter from './routes/products'
import coursesRouter from './routes/courses'
import  accountsRouter from './routes/accounts';
import usersRouter from './routes/users'
dotenv.config();
const port = process.env.PORT||"3003"
// console.log(arrayPersonRole)
const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//app.use(express.static(path.resolve(__dirname, "./../public/")))
app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong")
})
app.use('/products', productsRouter)
app.use('/courses', coursesRouter)
app.use('/accounts', accountsRouter)
app.use('/users', usersRouter)
app.use('/purchases', purchasesRouter)

// rota raiz
app.get("/", (req: Request, res: Response) => {
    res.send(
        `<h1>Bem - vindo ao Labecommerce !</h1>`
    )
})


    
app.listen(port , () => {
    console.log(`Servidor rodando na porta ${port}`)
});