import * as admin from "firebase-admin"
import { CollectionReference, DocumentReference, DocumentSnapshot, Query, QuerySnapshot, WriteResult } from "firebase-admin/firestore";
import { FirebaseService } from "../../config/firebase";
import Film from "../../models/Film";
import { Utils } from "../../utils/utils";

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


    async getFilms(sort?: string[], range?: number[], filter?: any) {
        let returnValue: Film[] = []
        try {
            const dbRef: CollectionReference = this.db.collection("films").withConverter(Film.filmConverter)
            let query: Query
            query = Utils.getInstance().listActionsDAO(dbRef, sort, range, filter)
            const snapshot: QuerySnapshot = await query.get()
            for (const document of snapshot.docs){
                returnValue.push(document.data() as Film)
            }
            return returnValue
        } catch (error) {
            throw error
        }
    }

    async getFilmById(filmId: string) {
        let returnValue: Film = null
        try {
            const snapshot: DocumentSnapshot = await this.db.collection("films").doc(filmId).get()
            returnValue = snapshot.data() as Film
            return returnValue
        } catch (error) {
            throw error
        }
    }

    async updateFilm(filmId: string, film: Film) {
        try {
            const writeResult: WriteResult = await this.db.collection("films").doc(filmId).set(film, {merge: true})
            return "Film updated successfully"
        } catch (error) {
            throw error
        }
    }

    async deleteFilm(filmId: string) {
        try {
            const writeResult: WriteResult = await this.db.collection("films").doc(filmId).delete()
            return "Film deleted successfully"
        } catch (error) {
            throw error
        }
    }
}