import express from "express"
import { FilmsController } from "../films/controllers/films.controllers";
import "../docs/films.doc"


const router = express.Router();

const filmsController = new FilmsController();

router.post('/films', filmsController.addFilm);
router.get('/films', filmsController.getAllFilms);
router.get('/films/:id', filmsController.getFilmById);
router.put('/films/:id', filmsController.updateFilm);
router.delete('/films/:id', filmsController.deleteFilm);

export default {
    routes: router
}