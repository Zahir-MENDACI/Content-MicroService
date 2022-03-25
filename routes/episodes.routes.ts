import express from "express"
import { EpisodesController } from "../episodes/controllers/episodes.controllers";


const router = express.Router();

const episodesController = new EpisodesController();

router.post('/series/:idSerie/episodes', episodesController.addEpisode);
router.get('/series/:idSerie/episodes', episodesController.getAllEpisodes);
router.get('/series/:idSerie/episodes/:id', episodesController.getEpisodeById);
router.put('/series/:idSerie/episodes/:id', episodesController.updateEpisode);
router.delete('/series/:idSerie/episodes/:id', episodesController.deleteEpisode);



export default {
    routes: router
}