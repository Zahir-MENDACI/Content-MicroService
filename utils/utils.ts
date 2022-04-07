import * as admin from "firebase-admin"
import axios from "axios"
import express from "express"
import { FilmsController } from "../films/controllers/films.controllers";
import { SeriesController } from "../series/controllers/series.controllers";
import { FilmsService } from "../films/services/films.services";
import { SeriesService } from "../series/services/series.services";

export class Utils {
  private static instance: Utils;


  constructor() {
    console.log("Created new instance of Utils");
  }

  static getInstance(): Utils {
    if (!Utils.instance) {
      Utils.instance = new Utils();
    }
    return Utils.instance;
  }

  listActions(inputSort: string, inputRange: string, filter: string) {
    let parsedSort: string[];
    let parsedRange: number[];
    let parsedFilter: any;
    let startRange: number;
    let endRange: number;

    if (inputSort != null && inputSort != undefined && inputSort.length > 0) {
      parsedSort = JSON.parse(inputSort);
      console.log(parsedSort);
    }

    if (inputRange != null && inputRange != undefined && inputRange.length > 0) {
      parsedRange = JSON.parse(inputRange);
      startRange = +parsedRange[0];
      endRange = +parsedRange[1];
    }

    if (filter != null && filter != undefined && filter.length > 0) {
      parsedFilter = JSON.parse(filter);
      console.log(parsedFilter);
    }

    return { sort: parsedSort, range: parsedRange, filter: parsedFilter, startRange: startRange };
  }

  listActionsDAO(dbRef: FirebaseFirestore.CollectionReference, sort?: string[], range?: number[], filter?: any, resource?: string) {
    let keys: string[];
    let field: string;
    let order: string;
    let query: admin.firestore.Query;

    query = dbRef.where("active", "==", true);

    if (range !== undefined) {
      const start = range[0];
      const end = range[1];
      query = query.limit(end + 1 - start).offset(start);
    }



    if (sort || filter) {
      if (!(typeof filter == "undefined") && Object.keys(filter).length != 0) {
        keys = Object.keys(filter);
        keys.map((key) => {
          if (key === "country") {
            query = query.where("available_country", "array-contains", filter[key.toString()]);
          } else {
            query = query.where(key.toString(), "==", filter[key.toString()]);
          }
        });
      }
      if (sort) {
        field = sort[0];
        order = sort[1];
        if (field == "id") {
          field = "createdAt";
        }
        if (field) {
          if (filter != undefined) {
            keys = Object.keys(filter);
            if (!(keys.includes(field))) {
              query = query.orderBy(field, order == "DESC" ? "desc" : "asc");
            }
          } else {
            query = query.orderBy(field, order == "DESC" ? "desc" : "asc");
          }
        }
      }
    }

    return query;
  }

  async getUser(id: string) {
    return await axios.get(`http://localhost:6060/users/${id}`)
    .then((result) => {
      return result.data
    }).catch(e => {
      throw e
    })
  }

  async getAllContents(req: express.Request, res: express.Response){
    let returnValue;
    const listActions = Utils.getInstance().listActions(req.query.sort as string, req.query.range as string, req.query.filter as string);
    const films = await new FilmsService().getFilms(listActions)
    const series = await new SeriesService().getSeries(listActions)
    returnValue = {
      films: films,
      series: series
    }
    res.status(200).send(returnValue)
  }

  async getPoster (id: string){
    return await axios.get(`http://localhost:8080/postersByIdContent/${id}`)
    .then((res) => {
      return res.data.url
    }).catch((e) => {
      return null
    })
  }
  
}
