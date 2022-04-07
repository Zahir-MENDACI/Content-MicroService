import * as admin from "firebase-admin"
import Content from "./Content";

class Film extends Content{
  duration: number;
  
    constructor(id: string, title: string, category: string, global_description: string, released_date: Date, url: string, available_country: string[], active: boolean, duration: number, createdAt: Date, updatedAt: Date, poster?: string) {
      super(id, title, global_description, released_date, url, createdAt, updatedAt, category, available_country, active, poster)
      this.duration = duration
    }

    static filmConverter = {
        toFirestore(film: Film) {
          const returnValue: any = {
            id: film.id,
            title: film.title,
            category: film.category,
            global_description: film.global_description,
            released_date: film.released_date,
            url: film.url,
            available_country: film.available_country,
            active: film.active,
            duration: film.duration,
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
          let formatedCreatedAt;
          if (data.createdAt) {
            formatedCreatedAt = data.createdAt.toDate();
          }
          let formatedUpdatedAt;
          if (data.updatedAt) {
            formatedUpdatedAt = data.updatedAt.toDate();
          }
    
          const returnValue = new Film(
            snapshot.id,
            data.title,
            data.category,
            data.global_description,
            formatedDate,
            data.url,
            data.available_country,
            data.active,
            data.duration,
            formatedCreatedAt,
            formatedUpdatedAt
          );
          return returnValue;
        },
      };
}
export default Film;