import express, { Router } from "express";
import * as bandsController from "../../controllers/apiMusic/bandsController";

const router = express.Router();

router.get("/", bandsController.getAllBands);
router.post("/", bandsController.createBand);
router.get("/:id", bandsController.getBandById);
router.delete("/:id", bandsController.destroyBand);
router.put("/:id", bandsController.editBand);

export default router;
