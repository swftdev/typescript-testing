
export interface response {
    statusCode: 200 | 400
    message: string
}

export interface event {
    success: boolean

}

export function handler(event: event): response {
    let response: response;

    if (event.success) {
        response = { statusCode: 200, message: "it worked" }
    } else {
        response = { statusCode: 400, message: "it failed" }
    }

    return response;
}
