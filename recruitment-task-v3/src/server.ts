import express, {Express} from "express";
import {config} from "./config";

export const startApp = async () => {
    const app: Express = express();
    app.listen(config.port, () => {
        console.log(`App listening on ${config.port}`);
    });
    try {
        const loaders = await import('./loaders');
        await loaders.default(app);
    } catch (e) {
        console.error(e);
    }
};
