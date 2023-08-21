import express, {Application} from 'express'
import productsRouter from './../routes/products'

export class Server{
    private app: Application;
    private port : string;
    private apiPaths={
        productsApi: '/products'
    }
    
    constructor(){
    this.app=express();
    this.port=process.env.PORT||"3003";
    }


    routes(){
        this.app.use(this.apiPaths.productsApi, productsRouter)
        this.routes()
    }


    listen(){
        this.app.listen(this.port ,() =>{
            console.log('EXPRESS WS ON PORT '+ this.port)
        })
    }
}