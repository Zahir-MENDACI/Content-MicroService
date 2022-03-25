import express from "express"
import { SeriesController } from "../series/controllers/series.controllers";


const router = express.Router();

const seriesController = new SeriesController();

router.post('/series', seriesController.addSerie);
router.get('/series', seriesController.getAllSeries);
router.get('/series/:id', seriesController.getSerieById);
router.put('/series/:id', seriesController.updateSerie);
router.delete('/series/:id', seriesController.deleteSerie);



export default {
    routes: router
}