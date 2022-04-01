import express from "express";
import { Utils } from "../../utils/utils";
import { EpisodesService } from "../services/episodes.services";
import { OpenApi, textPlain } from "ts-openapi";

export class EpisodesController {
    constructor() {
    }

    addEpisode = async (req: express.Request, res: express.Response) => {
        const episodesService = EpisodesService.getInstance();
        try {
            const addEpisode = await episodesService.addEpisode(req.body, req.params)
            res.status(200).send(addEpisode);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    
    getAllEpisodes = async (req: express.Request, res: express.Response) => {
        const episodesService = EpisodesService.getInstance();
        try {
            const listActions = Utils.getInstance().listActions(req.query.sort as string, req.query.range as string, req.query.filter as string);
            const episodes = await episodesService.getEpisodes(req.params, listActions)
            res.status(200).send(episodes);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    getEpisodeById = async (req: express.Request, res: express.Response) => {
        const episodesService = EpisodesService.getInstance();
        try {
            const episode = await episodesService.getEpisodeById(req.params)
            res.status(200).send(episode);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    updateEpisode = async (req: express.Request, res: express.Response) => {
        const episodesService = EpisodesService.getInstance();
        try {
            const episodeUpdated = await episodesService.updateEpisode(req.body, req.params)
            res.status(200).send(episodeUpdated);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    deleteEpisode = async (req: express.Request, res: express.Response) => {
        const episodesService = EpisodesService.getInstance();
        try {
            const episodeDeleted = await episodesService.deleteEpisode(req.params)
            res.status(200).send(episodeDeleted);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }
}