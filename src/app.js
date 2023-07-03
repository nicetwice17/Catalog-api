import express from 'express';
import dotenv from 'dotenv'

export class App {
    app;
    _PORT;
    router;
    constructor() {
        this.app = express();
        this.router = express.Router()
        this._PORT = dotenv.config().parsed?.BASE_URL;
    }

    useRoutes() {

    }

    useMiddleWare() {

    }

    useDB() {

    }

    init() {
        this.useMiddleWare()
        this.app.listen(this._PORT, () => {
            console.log(`Server is working on http://locahost:${this._PORT}`)
        })
    }
}

