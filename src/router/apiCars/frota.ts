import express,  { Router } from "express";
import * as  frotaController from '../../controllers/apiCars/frotaController'


const router = express.Router()

router.get('/', frotaController.getAllCars)
router.post('/', frotaController.createCar)
router.put('/:idDetails', frotaController.editProductById)
router.get('/:idDetails', frotaController.getProductById)
router.delete("/:idDetails", frotaController.destroyProduct)

export default router