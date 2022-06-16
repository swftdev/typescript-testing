export function UserNotFoundError(email: string): Error {
    const errorMessage = `The provided email ${email} is not associated with an existing user.`
    const error = new Error(errorMessage)
    error.name = 'UserNotFoundError'
    return error
}