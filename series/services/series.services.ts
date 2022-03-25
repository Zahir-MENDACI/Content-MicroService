import Serie from "../../models/Serie";
import { SeriesDAO } from "../daos/series.daos";

export class SeriesService {
    private static instance: SeriesService;
    dao: SeriesDAO;

    constructor() {
        this.dao = SeriesDAO.getInstance();
    }

    static getInstance(): SeriesService {
        if (!SeriesService.instance) {
            SeriesService.instance = new SeriesService();
        }
        return SeriesService.instance;
    }


    async addSerie(body: any) {
        try {
            const serie = new Serie(undefined, body.title, body.category, body.global_description, new Date(body.released_date), body.nb_episodes, new Date(), new Date())
            return await this.dao.add(serie)
        } catch (error) {
            throw error
        }
    }

    async getSeries(resources: { sort: string[], range: number[], filter: object }) {
        try {
            const series = this.dao.getSeries(resources.sort, resources.range, resources.filter)
            return series
        } catch (error) {
            throw error
        }
    }

    async getSerieById(params: any) {
        try {
            const serieId: string = params.id
            const serie = this.dao.getSerieById(serieId)
            return serie
        } catch (error) {
            throw error
        }
    }

    async updateSerie(body: any, params: any) {
        try {
            const serieId: string = params.id
            const serie = new Serie(undefined, body.title, body.category, body.global_description, new Date(body.released_date), body.nb_episodes, undefined, new Date())
            return await this.dao.updateSerie(serieId, serie)
        } catch (error) {
            throw error
        }
    }

    async deleteSerie(params: any) {
        try {
            const serieId = params.id
            return await this.dao.deleteSerie(serieId)
        } catch (error) {
            throw error
        }
    }
}