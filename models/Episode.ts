import * as admin from "firebase-admin"

class Episode {
    id: string;
    title: string;
    description: string;
    num: number;
    duration: number;

    constructor(id: string, title: string, description: string, num: number, duration: number) {
        this.id = id
        this.title = title
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
                num: episode.num,
                duration: episode.duration
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
                data.num,
                data.duration
            );
            return returnValue;
        },
    };
}
export default Episode;