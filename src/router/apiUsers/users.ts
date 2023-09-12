import express,  { Router } from "express";
import * as  usersController from '../../controllers/apiUsers/usersController'


const router = express.Router()

router.get('/', usersController.getAllUsers)
router.post('/', usersController.createUser)
router.put('/:id', usersController.editUserById)
router.get('/:id', usersController.getUserById)
router.delete("/:id", usersController.destroyUser)

export default router