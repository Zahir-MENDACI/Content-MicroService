import * as admin from "firebase-admin"
import { CollectionReference, DocumentReference, DocumentSnapshot, Query, QuerySnapshot, WriteResult } from "firebase-admin/firestore";
import { FirebaseService } from "../../config/firebase";
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
                returnValue.push(document.data() as Serie)
            }
            return returnValue
        } catch (error) {
            throw error
        }
    }

    async getSerieById(serieId: string) {
        let returnValue: Serie = null
        try {
            const snapshot: DocumentSnapshot = await this.db.collection("series").doc(serieId).get()
            returnValue = snapshot.data() as Serie
            return returnValue
        } catch (error) {
            throw error
        }
    }

    async updateSerie(serieId: string, serie: Serie) {
        try {
            const writeResult: WriteResult = await this.db.collection("series").doc(serieId).set(serie, {merge: true})
            return "Serie updated successfully"
        } catch (error) {
            throw error
        }
    }

    async deleteSerie(serieId: string) {
        try {
            const writeResult: WriteResult = await this.db.collection("series").doc(serieId).delete()
            return "Serie deleted successfully"
        } catch (error) {
            throw error
        }
    }
}