import express, {Router} from 'express'
import * as accountsController from './../controllers/accountsController';

const router = express.Router()

router.get('/', accountsController.getAllAcounts)
router.post('/', accountsController.createAccount)
router.get('/:id' , accountsController.getAccountById)
router.delete('/:id' , accountsController.destroyAccount)
router.put('/:id' , accountsController.editAccount)


export default router;