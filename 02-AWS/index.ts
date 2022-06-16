// import { Logger } from '@aws-lambda-powertools/logger'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, GetCommandOutput } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'

import { getUser } from './utils/dynamodb'
import { UserNotFoundError } from './utils/errors'

// const logger = new Logger()
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } })

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyStructuredResultV2> {
    if (typeof process.env.tableName === 'undefined') throw new Error('tableName environment variable must be set.')
    // logger.info('Incoming Request', { event })

    let response: { body: string; statusCode: 200 | 400 | 502 }
    const tableName = process.env.tableName
    const email = event?.pathParameters?.email || ''

    try {
        const getUserCommand: GetCommand = await getUser(tableName, email)
        const getUserResponse: GetCommandOutput = await ddbDocClient.send(getUserCommand)
        if (getUserResponse.Item?.email === undefined) throw UserNotFoundError(email)

        // logger.info(`Successfully found user in DynamoDB.`)
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: `User was found`,
            })
        }
    } catch (error) {
        if (error instanceof Error &&
            (error.name === 'UserNotFoundError')) {
            response = {
                statusCode: 400,
                body: JSON.stringify(error)
            }
        } else {
            response = { statusCode: 502, body: "An Error has occurred..." }
        }
    }
    return {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'Get'
        },
        ...response
    }
}
