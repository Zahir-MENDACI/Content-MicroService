import Film from "../../models/Film";
import { FilmsDAO } from "../daos/films.daos";


export class FilmsService {
    private static instance: FilmsService;
    dao: FilmsDAO;

    constructor() {
        this.dao = FilmsDAO.getInstance();
    }

    static getInstance(): FilmsService {
        if (!FilmsService.instance) {
            FilmsService.instance = new FilmsService();
        }
        return FilmsService.instance;
    }


    async addFilm(body: any) {
        try {
            const film = new Film(undefined, body.title, body.category, body.global_description, new Date(body.released_date), body.duration, new Date(), new Date())
            return await this.dao.add(film)
        } catch (error) {
            throw error
        }
    }

    async getFilms(resources: { sort: string[], range: number[], filter: object }) {
        try {
            const films = this.dao.getFilms(resources.sort, resources.range, resources.filter)
            return films
        } catch (error) {
            throw error
        }
    }

    async getFilmById(params: any) {
        try {
            const filmId: string = params.id
            const film = this.dao.getFilmById(filmId)
            return film
        } catch (error) {
            throw error
        }
    }

    async updateFilm(body: any, params: any) {
        try {
            const filmId: string = params.id
            const film = new Film(undefined, body.title, body.category, body.global_description, new Date(body.released_date), body.duration, undefined, new Date())
            return await this.dao.updateFilm(filmId, film)
        } catch (error) {
            throw error
        }
    }

    async deleteFilm(params: any) {
        try {
            const filmId = params.id
            return await this.dao.deleteFilm(filmId)
        } catch (error) {
            throw error
        }
    }
}