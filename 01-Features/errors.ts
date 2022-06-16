export class FilmValidationError extends Error {
    constructor(message?: string) {
        super(message)
        this.name = "FilmValidationError"
    }
}

export class FilmApiError extends Error {
    constructor(message?: string) {
        super(message)
        this.name = "FilmApiError"
    }
}
