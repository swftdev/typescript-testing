// import { Logger } from '@aws-lambda-powertools/logger'
import { GetCommand } from '@aws-sdk/lib-dynamodb'

// const logger = new Logger()

export function getUser(tableName: string, email: string): GetCommand {
    const params = {
      TableName: tableName,
      Key: {
        pk: `USER#${email.toLowerCase()}`,
        sk: `USER#${email.toLowerCase()}`
      }
    }
  
    // logger.info('getUser params', { params })
  
    return new GetCommand(params)
  }