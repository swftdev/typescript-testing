import { deserialize, validate } from '@deepkit/type';
import axios from 'axios'

export type Film =  {
    id: string,
    title: string
    description: string
	director: string
	producer: string
	release_date: string
}

export async function getFilm(filmID?: string){
    const filmId = filmID ? filmID : "dc2e6bd1-8156-4886-adff-b39e6043af0c"
    const response = await axios.get(`https://ghibliapi.herokuapp.com/films/${filmId}`)

    // Not native typescript, also in alpha
    const film = deserialize<Film>(response.data);
    let validationErrors = validate<Film>(film)

    if (validationErrors.length > 0) throw new FilmValidationError() 

    return film
}

export class FilmValidationError extends Error{
    constructor(message?:string){
        super(message)
        this.name = "FilmValidationError"
    }
}