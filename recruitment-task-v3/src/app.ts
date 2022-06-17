import express, {Router} from 'express';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';
import { startApp } from './server';
import {config} from "./config";
import apiRoutes from './api/routes';

class App {

    public app!: express.Application;

    constructor() {
        this.app = express();
        this.setConfig();
        this.startServer();
        this.setControllers();
    }

    private setConfig(): void {
        this.app.use(json());
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
    }

    private async startServer(): Promise<void> {
        await startApp();
    }

    private setControllers(): void {
        this.app.use(`/${config.endpointPrefix}`, apiRoutes);
    }
}

export default new App().app;
