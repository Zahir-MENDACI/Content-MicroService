import * as admin from "firebase-admin"
import Content from "./Content";
import Episode from "./Episode";

class Serie extends Content{

  nb_episodes: number;
  episodes: Episode[];
  
    constructor(id: string, title: string, category: string, global_description: string, released_date: Date, poster: string, available_country: string[], active: boolean, nb_episodes: number, createdAt: Date, updatedAt: Date) {
      super(id, title, global_description, released_date, poster, createdAt, updatedAt, category, available_country, active)
      this.nb_episodes = nb_episodes
    }

    static serieConverter = {
        toFirestore(serie: Serie) {
          const returnValue: any = {
            id: serie.id,
            title: serie.title,
            category: serie.category,
            global_description: serie.global_description,
            released_date: serie.released_date,
            poster: serie.poster,
            available_country: serie.available_country,
            active: serie.active,
            nb_episodes: serie.nb_episodes,
            createdAt: serie.createdAt,
            updatedAt: serie.updatedAt
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
    
          const returnValue = new Serie(
            snapshot.id,
            data.title,
            data.category,
            data.global_description,
            formatedDate,
            data.poster,
            data.available_country,
            data.active,
            data.nb_episodes,
            data.createdAt,
            data.updatedAt
          );
          return returnValue;
        },
      };
}
export default Serie;