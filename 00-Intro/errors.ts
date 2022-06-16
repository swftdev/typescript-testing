export function setup(){
    if (process.env.uri === undefined) throw EnvError("Database connection string missing")
    if (process.env.environment === undefined) throw new AnotherEnvError("Environment var not set")
    return true
}

export function EnvError(msg: string){
    let error = new Error()
    error.message = msg
    error.name = "EnvError"
    return error
}

export class AnotherEnvError extends Error{
    constructor(message:string){
        super(message) 
        this.name = "AnotherEnvError"
    }
}