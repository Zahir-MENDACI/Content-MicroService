import express from 'express'
import cors from "cors"
import bodyParser from 'body-parser';
import 'dotenv/config';
import http from "http"

import routes from './routes/routes.js';
import { Utils } from './utils/utils.js';
// import { initOpenApi, openApiInstance } from './openapi.js';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());


const port = process.env.PORT || 7070;

app.use(async (req: express.Request | any, res: express.Response, next: express.NextFunction) => {
    Utils.getInstance().getUser(req.headers.authorization)
        .then((result) => {
            if (result.status === "active"){
                req.user = result
                next()
            } else if (result.status === "suspended"){
                res.status(401).send("Your account is suspended")
            } else {
                throw "Inexistant user"
            }
        }).catch(() => {
            res.status(403).send("Inexistant user")
        })
});

routes(app)

// initOpenApi(app, openApiInstance);

app.use((req: express.Request, res: express.Response) => {
    res.status(404).send({ url: req.originalUrl + ' not found !!' })
})

app.listen(port, () => {
    console.log(`Server Started at PORT ${port}`);
});