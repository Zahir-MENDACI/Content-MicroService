import express from "express"
import allRoutes from "./all.routes";
import episodesRoutes from "./episodes.routes";
import filmsRoutes from "./films.routes";
import seriesRoutes from "./series.routes";


const routes = (app: express.Application) => {

    app.use('/', filmsRoutes.routes);
    app.use('/', seriesRoutes.routes);
    app.use('/', episodesRoutes.routes);
    app.use('/', allRoutes.routes);
    
}

export default routes