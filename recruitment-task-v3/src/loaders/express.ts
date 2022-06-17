import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { Application } from 'express';
import {config} from "../config";
import routes from '../api/routes'

export default (app: Application): void => {
    app.set('trust proxy', true);
    app.use(cors());
    app.use(
        helmet({
            contentSecurityPolicy: {
                reportOnly: true,
            },
        })
    );
    app.use(bodyParser.json({ limit: '20mb' }));
    app.use(`/${config.endpointPrefix}`, routes);
};
