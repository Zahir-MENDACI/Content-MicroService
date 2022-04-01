import Episode from "../../models/Episode";
import { EpisodesDAO } from "../daos/episodes.daos";

export class EpisodesService {
    private static instance: EpisodesService;
    dao: EpisodesDAO;

    constructor() {
        this.dao = EpisodesDAO.getInstance();
    }

    static getInstance(): EpisodesService {
        if (!EpisodesService.instance) {
            EpisodesService.instance = new EpisodesService();
        }
        return EpisodesService.instance;
    }


    async addEpisode(body: any, params: any) {
        try {
            const idSerie: string = params.idSerie
            const episode = new Episode(undefined, body.title, body.description, new Date(body.released_date), body.num, body.duration, undefined, true, new Date(), new Date())
            return await this.dao.add(idSerie, episode)
        } catch (error) {
            throw error
        }
    }

    async getEpisodes(params: any, resources: { sort: string[], range: number[], filter: object }) {
        try {
            const idSerie: string = params.idSerie
            const episodes = this.dao.getEpisodes(idSerie, resources.sort, resources.range, resources.filter)
            return episodes
        } catch (error) {
            throw error
        }
    }

    async getEpisodeById(params: any) {
        try {
            const idSerie: string = params.idSerie
            const idEpisode: string = params.id
            const episode = this.dao.getEpisodeById(idSerie, idEpisode)
            return episode
        } catch (error) {
            throw error
        }
    }

    async updateEpisode(body: any, params: any) {
        try {
            const idSerie: string = params.idSerie
            const idEpisode: string = params.id
            const episode = new Episode(body.id, body.title, body.description, new Date(body.released_date), body.num, body.duration, undefined, body.status, undefined, new Date())
            return await this.dao.updateEpisode(idSerie, idEpisode, episode)
        } catch (error) {
            throw error
        }
    }

    async deleteEpisode(params: any) {
        try {
            const idSerie: string = params.idSerie
            const idEpisode = params.id
            return await this.dao.deleteEpisode(idSerie, idEpisode)
        } catch (error) {
            throw error
        }
    }
}