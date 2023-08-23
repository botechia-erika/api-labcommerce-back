import express, {Router} from 'express'
import * as coursesController from './../controllers/coursesController'

const router = express.Router()

router.get('/', coursesController.getAllCourses)
router.post('/', coursesController.createCourse)
router.get('/:id' , coursesController.getCourseById)
router.delete('/:id' , coursesController.destroyCourse)


export default router;