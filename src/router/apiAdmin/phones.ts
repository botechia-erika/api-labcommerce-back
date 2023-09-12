import express,  { Router } from "express";
import* as phonesController from '../../controllers/apiAdmin/phonesController'


const router = express.Router()

router.get("/" , phonesController.getAllPhones)
router.get("/:id", phonesController.getPhonesById)
router.post("/" , phonesController.createPhone)
export default router