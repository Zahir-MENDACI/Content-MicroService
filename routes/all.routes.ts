import express from "express"
import { FilmsController } from "../films/controllers/films.controllers";
import "../docs/films.doc"
import { Utils } from "../utils/utils";


const router = express.Router();

router.get('/all', Utils.getInstance().getAllContents);

export default {
    routes: router
}