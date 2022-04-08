import * as admin from "firebase-admin"
import { CollectionReference, DocumentReference, DocumentSnapshot, Query, QuerySnapshot, WriteResult } from "firebase-admin/firestore";
import { FirebaseService } from "../../config/firebase";
import Film from "../../models/Film";
import { Utils } from "../../utils/utils";
import axios from "axios"
import Serie from "../../models/Serie";
import Episode from "../../models/Episode";

export class FilmsDAO {
    private static instance: FilmsDAO;
    db: admin.firestore.Firestore;

    constructor() {
        this.db = FirebaseService.getInstance().db;
        console.log("Created new instance of FilmsDAO");
    }

    static getInstance(): FilmsDAO {
        if (!FilmsDAO.instance) {
            FilmsDAO.instance = new FilmsDAO();
        }
        return FilmsDAO.instance;
    }



    async add(film: Film) {
        try {
            const docRef: DocumentReference = this.db.collection("films").withConverter(Film.filmConverter).doc()
            film.id = docRef.id
            await docRef.set(film)
            return "Film added successfully"
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    /* const country = ["France", "Other"]
            let genres: string[] = []
            const url = "https://drive.google.com/file/d/1G8KnN6cFRdjZsM7zaqVPAJ93JeSy8IhD/view?usp=sharing"
            await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=732be66a12708c89d1d1aa5e307e60a8")
                .then((results) => {
                    for (const result of results.data.genres) {
                        genres.push(result.name)
                    }
                })
            await axios.get("https://api.themoviedb.org/3/tv/popular?api_key=732be66a12708c89d1d1aa5e307e60a8")
                .then(async (results) => {
                    for (const result of results.data.results) {
                        const docRef: DocumentReference = this.db.collection("series").withConverter(Serie.serieConverter).doc()
                        const serie = new Serie(docRef.id, result.name, genres[Math.floor(Math.random() * genres.length)], result.overview, new Date(result.first_air_date), url, [country[Math.floor(Math.random() * country.length)]], true, undefined, new Date(), new Date())
                        await docRef.set(serie)
                        await axios.post("http://localhost:8080/posters", {
                            idContent: serie.id,
                            urlMorning: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
                            urlEvening: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
                        })
                        await axios.get(`https://api.themoviedb.org/3/tv/${result.id}/season/1?api_key=732be66a12708c89d1d1aa5e307e60a8`)
                            .then(async (resultEpisodes) => {
                                for (const episodeData of resultEpisodes.data.episodes) {
                                    const docRefEpisode: DocumentReference = this.db.collection("series").doc(docRef.id).collection("episodes").doc().withConverter(Episode.episodeConverter)
                                    const episode = new Episode(docRefEpisode.id, episodeData.name, episodeData.overview, new Date(episodeData.air_date), url, episodeData.episode_number, Math.floor(Math.random() * (100 - 30 + 1) + 20), true, new Date(), new Date())
                                    await docRefEpisode.set(episode)
                                    await axios.post("http://localhost:8080/posters", {
                                        idContent: episode.id,
                                        urlMorning: `https://image.tmdb.org/t/p/w500${episodeData.still_path}`,
                                        urlEvening: `https://image.tmdb.org/t/p/w500${episodeData.still_path}`,
                                    })
                                }
                                await this.db.collection("series").doc(docRef.id).set({ nb_episodes: resultEpisodes.data.episodes.length }, { merge: true })
                            })

                    }
                })
                */


    async getFilms(sort?: string[], range?: number[], filter?: any) {
        let returnValue: Film[] = []
        try {

            const dbRef: CollectionReference = this.db.collection("films").withConverter(Film.filmConverter)
            let query: Query
            query = Utils.getInstance().listActionsDAO(dbRef, sort, range, filter)
            const snapshot: QuerySnapshot = await query.get()
            for (const document of snapshot.docs) {
                const poster = await Utils.getInstance().getPoster(document.id)
                const film = document.data() as Film
                film.poster = poster
                returnValue.push(film)
            }
            return returnValue
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getFilmById(filmId: string) {
        try {
            const snapshot: DocumentSnapshot = await this.db.collection("films").doc(filmId).withConverter(Film.filmConverter).get()
            const poster = await Utils.getInstance().getPoster(snapshot.id)
            const film: Film = snapshot.data() as Film
            film.poster = poster
            return film
        } catch (error) {
            throw error
        }
    }

    async updateFilm(filmId: string, film: Film) {
        try {
            const writeResult: WriteResult = await this.db.collection("films").doc(filmId).set(film, { merge: true })
            return "Film updated successfully"
        } catch (error) {
            throw error
        }
    }

    async deleteFilm(filmId: string) {
        try {
            const writeResult: WriteResult = await this.db.collection("films").doc(filmId).set({ active: false }, { merge: true })
            return "Film deleted successfully"
        } catch (error) {
            throw error
        }
    }
}