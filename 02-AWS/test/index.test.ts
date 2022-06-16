import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayEvent, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import { mockClient } from 'aws-sdk-client-mock'
import event from "../events/getUser.json"
import { handler } from '../index'

const ddbMock = mockClient(DynamoDBDocumentClient)

describe('Create User Handler', () => {
  beforeEach(() => {
    process.env.tableName = 'set'
    ddbMock.reset()
  })

  it('Handler should throw with missing table name', async () => {
    delete process.env.tableName

    try { await handler({} as APIGatewayEvent) }
    catch (e) { expect(e instanceof TypeError) }
  })

  it('Invalid Email Path should throw 502', async () => {
    const eventCopy = JSON.parse(JSON.stringify(event))
    eventCopy.pathParameters = JSON.stringify({ email: null })
    const response = await handler(eventCopy)
    expect(response.statusCode).toBe(502)
  })

  it('Handler should return with a 400 status code on UserNotFoundError', async () => {
    ddbMock.on(GetCommand).resolves({ Item: {} })
    const eventCopy = JSON.parse(JSON.stringify(event))
    const response: APIGatewayProxyStructuredResultV2 = await handler(eventCopy)
    expect(response.statusCode).toEqual(400)
    expect(JSON.parse(response.body as string).name).toEqual('UserNotFoundError')
  })

  it('Handler should return with a 400 status code on UserNotFoundError', async () => {
    const eventCopy = JSON.parse(JSON.stringify(event))
    ddbMock.on(GetCommand).resolves({ Item: { email: "Test", accounts: ["google"] } })

    const response: APIGatewayProxyStructuredResultV2 = await handler(eventCopy)
    expect(response.statusCode).toEqual(200)
  })
})