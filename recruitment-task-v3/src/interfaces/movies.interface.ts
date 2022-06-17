export interface Genres {
    genres: string[],
    movies: Movies[],
}

export interface Movies {
    id: number,
    title: string,
    year: string,
    runtime: string,
    genres: string[],
    director: string,
    actors: string,
    plot: string,
    posterUrl: string,
}
