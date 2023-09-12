import express, {Router} from 'express'
import * as accountsController from '../../controllers/apiBank/accountsController';

const router = express.Router()

router.get('/', accountsController.getAllAccounts)
router.get('/:id/balance', accountsController.getAccountBalance)
router.post('/' , accountsController.createAccount)

router.put('/:id/balance' , accountsController.editAccountBalance)

export default router;