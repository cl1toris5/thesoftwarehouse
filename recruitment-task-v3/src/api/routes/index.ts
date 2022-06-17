import movies from "./movies";
import {Router} from "express";

const routes = Router();

routes.use('/movies', movies);

export default routes;
