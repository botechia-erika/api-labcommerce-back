import express, {Router} from 'express'
import * as projectsController from '../../controllers/apiSchool/projectsController'

const router = express.Router()
//router.get('/:id' , projectsController.getProjectById)
router.get('/', projectsController.getAllProjects)
router.post('/', projectsController.createProjects)
router.put('/:id' , projectsController.editProjectById)
//router.delete('/:id' , projectsController.destroyCourse)


export default router;