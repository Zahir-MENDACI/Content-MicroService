import express from "express";
import { Utils } from "../../utils/utils";
import { FilmsService } from "../services/films.services";



export class FilmsController {
    constructor() {
    }

 

    addFilm = async (req: express.Request, res: express.Response) => {
        const filmsService = FilmsService.getInstance();
        try {
            const addFilm = await filmsService.addFilm(req.body)
            res.status(200).send(addFilm);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    getAllFilms = async (req: express.Request, res: express.Response) => {
        const filmsService = FilmsService.getInstance();
        try {
            const listActions = Utils.getInstance().listActions(req.query.sort as string, req.query.range as string, req.query.filter as string);
            listActions.filter = {
                ...listActions.filter,
                country: req.user?.location
            }
            console.log(listActions.filter)

            // if (!req.user.active){
            //     res.status(401).send("Votre compte est suspendu");
            // }
            const films = await filmsService.getFilms(listActions)
            res.status(200).send(films);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    getFilmById = async (req: express.Request, res: express.Response) => {
        const filmsService = FilmsService.getInstance();
        try {
            const film = await filmsService.getFilmById(req.params)
            res.status(200).send(film);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    updateFilm = async (req: express.Request, res: express.Response) => {
        const filmsService = FilmsService.getInstance();
        try {
            const filmUpdated = await filmsService.updateFilm(req.body, req.params)
            res.status(200).send(filmUpdated);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    deleteFilm = async (req: express.Request, res: express.Response) => {
        const filmsService = FilmsService.getInstance();
        try {
            const filmDeleted = await filmsService.deleteFilm(req.params)
            res.status(200).send(filmDeleted);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }
}