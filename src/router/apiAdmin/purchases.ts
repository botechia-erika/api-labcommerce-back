
import express,  { Router } from "express";
import * as  purchasesController from './../../controllers/apiAdmin/purchasesController'


const router = express.Router()
/* 
router.get("/" , purchasesController.getAllPurchases)
router.get("/:id" , purchasesController.getPurchaseById)
router.delete("/:id" , purchasesController.destroyPurchase)*/
router.post("/", purchasesController.createPurchase)

export default router
