import * as admin from "firebase-admin"
import Content from "./Content";

class Episode extends Content {
    description: string;
    num: number;
    duration: number;

    constructor(id: string, title: string, description: string, released_date: Date, url: string, num: number, duration: number, active: boolean, createdAt: Date, updatedAt: Date, poster?: string) {
        super(id, title, undefined, released_date, url, createdAt, updatedAt, undefined, undefined, active, poster)
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
                url: episode.url,
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

            let formatedDate;
            if (data.released_date) {
                formatedDate = data.released_date.toDate();
            }
            let formatedCreatedAt;
            if (data.createdAt) {
                formatedCreatedAt = data.createdAt.toDate();
            }
            let formatedUpdatedAt;
            if (data.updatedAt) {
                formatedUpdatedAt = data.updatedAt.toDate();
            }

            const returnValue = new Episode(
                snapshot.id,
                data.title,
                data.description,
                formatedDate,
                data.url,
                data.num,
                data.duration,
                data.active,
                formatedCreatedAt,
                formatedUpdatedAt
            );
            return returnValue;
        },
    };
}
export default Episode;