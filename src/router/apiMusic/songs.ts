import express, {Router} from 'express'
import * as songsController   from '../../controllers/apiMusic/songsController';

const router = express.Router()

//router.get('/', songsController.getAllSongs)
router.post('/', songsController.createSong)
/*router.get('/:id' , songsController.getSongById)
router.delete('/:id' , songsController.destroySong)
router.put('/:id' , songsController.editSong)
*/

export default router;