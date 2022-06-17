import expressLoader from './express';
import { Application } from 'express';

export default async (app: Application): Promise<void> => {
    expressLoader(app);
};
