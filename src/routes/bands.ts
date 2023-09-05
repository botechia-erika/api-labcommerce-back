import express, {Router} from 'express'
import {getAllBands, createBand}   from '../controllers/bandsController';

const router = express.Router()

router.get('/', getAllBands)
router.post('/', createBand)
//router.get('/:id' , playlistsController.getAccountById)
//router.delete('/:id' , playlistsController.destroyAccount)
//router.put('/:id' , playlistsController.editAccount)


export default router;