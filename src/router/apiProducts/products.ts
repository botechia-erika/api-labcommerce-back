import express,  { Router } from "express";
import { ProductsController } from '../../controllers/apiProducts/productsController';


const productsController = new ProductsController();
const router = express.Router()
router.post('/', productsController.createProduct)
router.get("/:id", productsController.getProductById);
router.get('/', productsController.getAllProducts)
router.put('/:id', productsController.editProductById)
router.delete("/:id", productsController.destroyProduct)

export default router