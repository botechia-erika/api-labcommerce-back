import express,  { Router } from "express";
import * as  purchasesController from './../controllers/purchasesController'


const router = express.Router()

router.get("/" , purchasesController.getPurchaseById)
router.get("/:id" , purchasesController.getPurchaseById)
router.delete("/:id" , purchasesController.destroyPurchase)
router.post("/purchases", purchasesController.createPurchase)

export default router