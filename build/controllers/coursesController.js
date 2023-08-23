"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseById = exports.destroyCourse = exports.createCourse = exports.getAllCourses = void 0;
const courses_1 = require("../dataTS/courses");
const types_1 = require("../types/types");
const getIdB_1 = require("../helpers/getIdB");
exports.getAllCourses = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q === undefined) {
            res.status(200).json(courses_1.courses);
        }
        else {
            function buscaCursoPorNome(courses, q) {
                return courses.filter((course) => {
                    if (course.name.toUpperCase().includes(q.toUpperCase())) {
                        return course;
                    }
                });
            }
            const [result] = buscaCursoPorNome(courses_1.courses, q);
            if (result) {
                res.status(200).json({ message: "curso encontrado no nosso sistema", result });
            }
            else {
                res.status(200).json({ result: null, message: "curso NÃO encontrado" });
            }
        }
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
exports.createCourse = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newId = req.body.id;
        const newName = req.body.name;
        const newLessons = req.body.lessons || undefined;
        const newStack = req.body.stack || types_1.COURSE_STACK.BACK;
        const id = (0, getIdB_1.createId)(newId);
        const newCourse = {
            id,
            name: newName,
            lessons: newLessons,
            stack: newStack
        };
        courses_1.courses.push(newCourse);
        res.status(201).json({ message: 'curso agregado com sucesso', newCourse });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
exports.destroyCourse = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToDelete = req.params.id;
    const getIndex = courses_1.courses.findIndex((course) => course.id === idToDelete);
    if (getIndex != null) {
        courses_1.courses.splice(getIndex);
    }
    res.status(200).send("Item deletado com sucesso");
}));
exports.getCourseById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        function buscaAccountPorId(courses, id) {
            return courses.filter((account) => {
                if (account.id.toUpperCase().includes(id.toUpperCase())) {
                    return account;
                }
            });
        }
        const [result] = buscaAccountPorId(courses_1.courses, id);
        if (result) {
            res.status(200).json({ message: "curso encontrado no nosso sistema", result });
        }
        else {
            res.status(200).json({ result: null, message: "curso NÃO encontrado" });
        }
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=coursesController.js.map