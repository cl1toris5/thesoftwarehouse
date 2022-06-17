import {NextFunction, Request, Response, Router} from 'express';
import {celebrate, Joi} from "celebrate";
import {Genres} from "../../enums/genres.enum";
import {MovieSaver} from "../services/movies-saver";
import {Movies} from "../../interfaces/movies.interface";
import {ErrorHandlers} from "../../enums/error-handlers";

const route = Router({ mergeParams: true });

route.post(
    '/',
    celebrate({
        body: {
            genres: Joi.array().items(Joi.string().valid(...Object.values(Genres))).required(),
            title: Joi.string().min(1).max(255).required(),
            year: Joi.number().required(),
            runTime: Joi.number().required(),
            director: Joi.string().min(1).max(255).required(),
            actors: Joi.string().optional(),
            plot: Joi.string().optional(),
            posterUrl: Joi.string().optional(),
        }
    }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await MovieSaver.Saver(req.body);
            res.sendStatus(200);
        } catch (e) {
            res.status(401).send(e);
        }
    }
);

route.get(
    '/',
    celebrate({
        params: Joi.object({
            duration: Joi.number().optional(),
            genres: Joi.array().items(Joi.string()).optional()
        }).allow(null)
    }),
    async (req: Request, res: Response, next: NextFunction) => {
        const { duration } = req.query;
        const genres = (req.query.genres as string).split(',').map((s: string) => s.toLowerCase().trim());
        const dataSource: Movies[] = MovieSaver.GetMoviesArray();

        try {
            if (!duration && !genres) {
                const randNumber: number = Math.floor(Math.random() * (dataSource.length - 0)) + 0;
                res.status(200).send(dataSource[randNumber]);
            } else if (duration && !genres) {
                const foundElement: Movies | undefined = dataSource.find((item: Movies) => +item.runtime >= +duration - 10 && +item.runtime <= +duration + 10);
                foundElement ? res.status(200).send(foundElement) : res.status(400).send(ErrorHandlers.UNEXPECTED_ERROR);
            } else if (!duration && genres) {
                const foundElements: Movies[] = dataSource.filter((item: Movies) => (genres as string[]).every((g: string) => {
                    return item.genres.map((i: string) => i.toLowerCase()).includes(g) && item.genres.length <= genres.length;
                }));
                res.status(200).send(foundElements);
            } else if (duration && genres) {
                const foundElements: Movies[] = dataSource.filter((item: Movies) => (genres as string[]).every((g: string) => {
                    return item.genres.map((i: string) => i.toLowerCase()).includes(g) && item.genres.length <= genres.length;
                })).filter((item: Movies) => +item.runtime >= +duration - 10 && +item.runtime <= +duration + 10);
                res.status(200).send(foundElements);
            } else {
                res.status(400).send(ErrorHandlers.UNEXPECTED_ERROR);
            }
        } catch (e) {
            res.status(400).send(ErrorHandlers.UNEXPECTED_ERROR);
        }
    }
)

export default route;
