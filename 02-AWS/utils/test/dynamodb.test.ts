import { getUser } from '../dynamodb'
import { GetCommand } from '@aws-sdk/lib-dynamodb'

describe('DynamoDB Utils', () => {
    test('getUser returns properly formatted query', () => {
        // given
        const tableName = 'tableName'
        const email = 'Test.User@google.com'

        // when
        const result = getUser(tableName, email)

        // then
        expect(result instanceof GetCommand).toBe(true)
        expect(result.input).toStrictEqual({
            TableName: tableName,
            Key: {
                pk: `USER#${email.toLowerCase()}`,
                sk: `USER#${email.toLowerCase()}`
            }
        })
    })
})