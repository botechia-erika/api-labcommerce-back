import express,  { Router } from "express";
import * as  productsController from './../controllers/productsController'


const router = express.Router()

router.get('/', productsController.getAllProducts)
router.post('/', productsController.createProduct)
router.put('/:id', productsController.editProductById)
router.get('/:id', productsController.getProductById)
router.delete("/:id", productsController.destroyProduct)

export default router