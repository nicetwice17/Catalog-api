import express from 'express';
import dotenv from 'dotenv'
import { Server } from 'http';
import 'reflect-metadata';
import { AuthRouter } from './routes/authRoutes.js';
import mongoose from 'mongoose';
import { ProductsRouter } from './routes/productsRoutes.js';
import { UsersRouter } from './routes/usersRoutes.js';


export class App {
    _app;
    _PORT;
    _router;
    _server;
    constructor() {
        this._app = express();
        this._router = express.Router()
        this._PORT = dotenv.config().parsed?.BASE_PORT;
        this._server = Server;
    }

    useRoutes() {
        const authRoutes = new AuthRouter(this._router).getRoutes();
        const productsRoutes = new ProductsRouter(this._router).getRoutes();
        const usersRoutes = new UsersRouter(this._router).getRoutes();

        this._app.use('/', authRoutes);
        this._app.use('/products', productsRoutes);
        this._app.use('/users', usersRoutes);
    }

    useMiddleWare() {
        this._app.use(express.json());
        this._app.use(express.urlencoded());
    }

    useDB() {

        const database = process.env.MONGOLAB_URI;
        mongoose
        .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("e don connect"))
        .catch((err) => console.log(err));
    }

    init() {
        this.useMiddleWare();
        this.useRoutes();
        this.useDB();
        this._app.listen(this._PORT, () => {
            console.log(`Server is working on http://locahost:${this._PORT}`)
        })
    }
}

