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
exports.createSong = void 0;
const knexDB_1 = require("../../database/knexDB");
const createId_1 = require("../../helpers/createId");
exports.createSong = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newName = req.body.inputName;
        const newId = req.body.id || undefined;
        const bandId = req.body.inputBand;
        const newImage = req.body.inputImage;
        const newPrice = req.body.inputPrice;
        const newDescription = req.body.inputDescription;
        if (typeof newName !== 'string') {
            res.status(400);
            throw new Error('400: O nome deve seguir o formato "MODELO MARCA ANO"');
        }
        if (!newImage.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=([a-zA-Z0-9_]+)|youtu\.be\/([a-zA-Z\d_]+))(?:&.*)?$/)) {
            res.status(400);
            throw new Error('400: A URL deve ser proveniente do YouTube e válida');
        }
        const newSong = {
            id: (0, createId_1.createId)(newId),
            name: newName
        };
        console.log(newSong);
        yield knexDB_1.db.raw(`
            INSERT INTO songs (id, name, band_id)
            VALUES
            ("${newSong.id}", "${newSong.name}","${bandId}" )
        `);
        const newProduct = {
            id: newSong.id,
            name: newName,
            image_url: newImage,
            description: newDescription,
            price: newPrice
        };
        yield (0, knexDB_1.db)('products').insert(newProduct);
        res.status(201).json("Música  cadastrada com sucesso");
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
//# sourceMappingURL=songsController.js.map