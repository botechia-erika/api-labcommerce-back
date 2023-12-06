
import express,  { Router } from "express";
import * as  postsController from '../../controllers/apiPosts/postsController'


const router = express.Router()
/* 
router.get("/" , purchasesController.getAllPurchases)
router.get("/:id" , purchasesController.getPurchaseById)
router.delete("/:id" , purchasesController.destroyPurchase)*/
router.post("/", postsController.createPost)
router.get("/" , postsController.getAllPosts)
router.get("/:id" , postsController.getPostById)
export default router
