import axios, { AxiosError, AxiosResponse } from 'axios'
import { validate, deserialize } from '@deepkit/type';

import { FilmApiError, FilmValidationError } from './errors';

export type Film = {
    id: string,
    title: string
    description: string
    director: string
    producer: string
    release_date: string
}

export async function getFilm(filmID?: string) {
    const filmId = filmID ? filmID : "dc2e6bd1-8156-4886-adff-b39e6043af0c"
    let film: Film;
    let response: AxiosResponse;
    try {
        response = await axios.get(`https://ghibliapi.herokuapp.com/films/${filmId}`)

        let validationErrors = validate<Film>(response.data)
        if (validationErrors.length > 0) throw new FilmValidationError()

        film = deserialize<Film>(response.data)
    } catch (e) {
        if (e instanceof FilmValidationError) throw e
        if (e instanceof AxiosError) throw new FilmApiError()
        throw new Error("Unexpected Error has occured")
    }

    return film
}