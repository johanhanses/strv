import { Handler } from '@netlify/functions'

// /.netlify/functions/hello-world
export const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: 'hello slangface'
  }
}
