import axios from "axios";
import * as admin from "firebase-admin"
import { CollectionReference, DocumentReference, DocumentSnapshot, Query, QueryDocumentSnapshot, QuerySnapshot, WriteResult } from "firebase-admin/firestore";
import { FirebaseService } from "../../config/firebase";
import Episode from "../../models/Episode";
import Serie from "../../models/Serie";
import { Utils } from "../../utils/utils";

export class SeriesDAO {
    private static instance: SeriesDAO;
    db: admin.firestore.Firestore;

    constructor() {
        this.db = FirebaseService.getInstance().db;
        console.log("Created new instance of SeriesDAO");
    }

    static getInstance(): SeriesDAO {
        if (!SeriesDAO.instance) {
            SeriesDAO.instance = new SeriesDAO();
        }
        return SeriesDAO.instance;
    }



    async add(serie: Serie) {
        try {
            const docRef: DocumentReference = this.db.collection("series").withConverter(Serie.serieConverter).doc()
            serie.id = docRef.id
            await docRef.set(serie)
            return "Serie added successfully"
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    async getSeries(sort?: string[], range?: number[], filter?: any) {
        let returnValue: Serie[] = []
        try {
            const dbRef: CollectionReference = this.db.collection("series").withConverter(Serie.serieConverter)
            let query: Query
            query = Utils.getInstance().listActionsDAO(dbRef, sort, range, filter)
            const snapshot: QuerySnapshot = await query.get()
            for (const document of snapshot.docs){
                // const episodesSnapshot: QuerySnapshot = await this.db.collection("series").doc(document.id).collection("episodes").withConverter(Episode.episodeConverter).get()
                // serie.episodes = []
                // for(const episodeDocument of episodesSnapshot.docs){
                //     serie.episodes.push(episodeDocument.data() as Episode)
                //     returnValue.push(serie)
                // }
                const poster = await Utils.getInstance().getPoster(document.id)
                const serie: Serie = document.data() as Serie
                serie.poster = poster
                returnValue.push(serie)
            }
            return returnValue
        } catch (error) {
            throw error
        }
    }

    async getSerieById(serieId: string) {
        try {
            const snapshot: DocumentSnapshot = await this.db.collection("series").doc(serieId).withConverter(Serie.serieConverter).get()
            if (!snapshot.exists) return "Inexistant serie"
            const serie: Serie = snapshot.data() as Serie
            if (serie.active !== true) {
                return "Inexistant serie"
            }
            const poster = await Utils.getInstance().getPoster(snapshot.id)
            serie.poster = poster
            return serie
        } catch (error) {
            throw error
        }
    }

    async updateSerie(serieId: string, serie: Serie) {
        try {
            const writeResult: WriteResult = await this.db.collection("series").doc(serieId).withConverter(Serie.serieConverter).set(serie, {merge: true})
            return "Serie updated successfully"
        } catch (error) {
            throw error
        }
    }

    async deleteSerie(serieId: string) {
        try {
            const writeResult: WriteResult = await this.db.collection("series").doc(serieId).set({ active: false }, { merge: true })
            return "Serie deleted successfully"
        } catch (error) {
            throw error
        }
    }
}