import * as admin from "firebase-admin"
import Content from "./Content";

class Episode extends Content{
    description: string;
    num: number;
    duration: number;

    constructor(id: string, title: string, description: string, released_date: Date, num: number, duration: number, poster: string, active: boolean, createdAt: Date, updatedAt: Date) {
        super(id, title, undefined, released_date, poster, createdAt, updatedAt, undefined, undefined, active)
        this.description = description
        this.num = num
        this.duration = duration
    }

    static episodeConverter = {
        toFirestore(episode: Episode) {
            const returnValue: any = {
                id: episode.id,
                title: episode.title,
                description: episode.description,
                released_date: episode.released_date,
                num: episode.num,
                duration: episode.duration,
                active: episode.active,
                createdAt: episode.createdAt,
                updatedAt: episode.updatedAt
            };

            Object.keys(returnValue).forEach((key) => {

                if (returnValue[key] === undefined) {
                    delete returnValue[key];
                }
                if (returnValue[key] === null) {
                    returnValue[key] = null
                }
            })

            return returnValue;
        },

        fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot) {
            const data = snapshot.data();

            const returnValue = new Episode(
                snapshot.id,
                data.title,
                data.description,
                data.released_date,
                data.num,
                data.duration,
                data.poster,
                data.active,
                data.createdAt,
                data.updatedAt
            );
            return returnValue;
        },
    };
}
export default Episode;