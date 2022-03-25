import * as admin from "firebase-admin"
import Content from "./Content";
import Episode from "./Episode";

class Serie extends Content{

  id: string;
  title: string;
  category: string;
  global_description: string;
  released_date: Date;
  nb_episodes: number;
  createdAt: Date;
  updatedAt: Date;
  
    constructor(id: string, title: string, category: string, global_description: string, released_date: Date, nb_episodes: number, createdAt: Date, updatedAt: Date) {
      super(id, title, category, global_description, released_date, createdAt, updatedAt)
      this.nb_episodes = nb_episodes
    }

    static serieConverter = {
        toFirestore(film: Serie) {
          const returnValue: any = {
            id: film.id,
            title: film.title,
            category: film.category,
            global_description: film.global_description,
            released_date: film.released_date,
            nb_episodes: film.nb_episodes,
            createdAt: film.createdAt,
            updatedAt: film.updatedAt
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
            data.nb_episodes,
            data.createdAt,
            data.updatedAt
          );
          return returnValue;
        },
      };
}
export default Serie;