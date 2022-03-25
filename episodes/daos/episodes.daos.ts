import * as admin from "firebase-admin"
import { CollectionReference, DocumentReference, DocumentSnapshot, Query, QuerySnapshot, WriteResult } from "firebase-admin/firestore";
import { FirebaseService } from "../../config/firebase";
import Episode from "../../models/Episode";
import { Utils } from "../../utils/utils";

export class EpisodesDAO {
    private static instance: EpisodesDAO;
    db: admin.firestore.Firestore;

    constructor() {
        this.db = FirebaseService.getInstance().db;
        console.log("Created new instance of EpisodesDAO");
    }

    static getInstance(): EpisodesDAO {
        if (!EpisodesDAO.instance) {
            EpisodesDAO.instance = new EpisodesDAO();
        }
        return EpisodesDAO.instance;
    }



    async add(idSerie: string, episode: Episode) {
        try {
            const docRef: DocumentReference = this.db.collection("series").doc(idSerie).collection("episodes").withConverter(Episode.episodeConverter).doc()
            episode.id = docRef.id
            await docRef.set(episode)
            return "Episode added successfully"
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    async getEpisodes(idSerie: string, sort?: string[], range?: number[], filter?: any) {
        let returnValue: Episode[] = []
        try {
            const dbRef: CollectionReference = this.db.collection("series").doc(idSerie).collection("episodes").withConverter(Episode.episodeConverter)
            let query: Query
            query = Utils.getInstance().listActionsDAO(dbRef, sort, range, filter)
            const snapshot: QuerySnapshot = await query.get()
            for (const document of snapshot.docs){
                returnValue.push(document.data() as Episode)
            }
            return returnValue
        } catch (error) {
            throw error
        }
    }

    async getEpisodeById(idSerie: string, episodeId: string) {
        let returnValue: Episode = null
        try {
            const snapshot: DocumentSnapshot = await this.db.collection("series").doc(idSerie).collection("episodes").doc(episodeId).get()
            returnValue = snapshot.data() as Episode
            return returnValue
        } catch (error) {
            throw error
        }
    }

    async updateEpisode(idSerie: string, episodeId: string, episode: Episode) {
        try {
            const writeResult: WriteResult = await this.db.collection("series").doc(idSerie).collection("episodes").doc(episodeId).set(episode, {merge: true})
            return "Episode updated successfully"
        } catch (error) {
            throw error
        }
    }

    async deleteEpisode(idSerie: string, episodeId: string) {
        try {
            const writeResult: WriteResult = await this.db.collection("series").doc(idSerie).collection("episodes").doc(episodeId).delete()
            return "Episode deleted successfully"
        } catch (error) {
            throw error
        }
    }
}