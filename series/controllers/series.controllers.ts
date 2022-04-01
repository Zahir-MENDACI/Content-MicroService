import express from "express";
import { Utils } from "../../utils/utils";
import { SeriesService } from "../services/series.services";

export class SeriesController {
    constructor() {
    }

    addSerie = async (req: express.Request, res: express.Response) => {
        const seriesService = SeriesService.getInstance();
        try {
            const addSerie = await seriesService.addSerie(req.body)
            res.status(200).send(addSerie);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    getAllSeries = async (req: express.Request, res: express.Response) => {
        const seriesService = SeriesService.getInstance();
        try {
            const listActions = Utils.getInstance().listActions(req.query.sort as string, req.query.range as string, req.query.filter as string);
            const series = await seriesService.getSeries(listActions)
            res.status(200).send(series);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    getSerieById = async (req: express.Request, res: express.Response) => {
        const seriesService = SeriesService.getInstance();
        try {
            const serie = await seriesService.getSerieById(req.params)
            res.status(200).send(serie);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    updateSerie = async (req: express.Request, res: express.Response) => {
        const seriesService = SeriesService.getInstance();
        try {
            const serieUpdated = await seriesService.updateSerie(req.body, req.params)
            res.status(200).send(serieUpdated);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    deleteSerie = async (req: express.Request, res: express.Response) => {
        const seriesService = SeriesService.getInstance();
        try {
            const serieDeleted = await seriesService.deleteSerie(req.params)
            res.status(200).send(serieDeleted);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }
}