import express, {Router} from 'express'
import * as coursesController from '../../controllers/apiSchool/coursesController'

const router = express.Router()
router.get('/:id' , coursesController.getCourseById)
router.get('/', coursesController.getAllCourses)
router.post('/', coursesController.createCourse)
router.put('/:id', coursesController.editCourseById)
router.delete('/:id', coursesController.destroyCourse)


export default router;

