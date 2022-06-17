import fs from "fs";
import {Movies} from "../../interfaces/movies.interface";
import ErrnoException = NodeJS.ErrnoException;
import {ErrorHandlers} from "../../enums/error-handlers";

export class MovieSaver {
    public static GetMoviesArray(): Movies[] {
        return JSON.parse(fs.readFileSync('data/db.json', 'utf-8'))?.movies as Movies[] ?? [];
    }

    public static Saver(body: Movies): void {
        fs.readFile('data/db.json', 'utf8', (error: ErrnoException | null, data: string) => {
            if (error) {
                throw new Error(ErrorHandlers.UNEXPECTED_ERROR)
            }
            const dataSource = JSON.parse(data);
            dataSource.movies.push(body);
            const dataToAdd = JSON.stringify(dataSource);
            fs.writeFile('data/db.json', dataToAdd, (error: ErrnoException | null) => {
                if (error) {
                    throw new Error(ErrorHandlers.UNEXPECTED_ERROR)
                }
            })
        })
    }
}
