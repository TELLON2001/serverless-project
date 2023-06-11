import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Query DynamoDB
    const params = {
      TableName: 'restapi-table',
      Key: { id: 'ID' },
    };
    const { Item } = await dynamoDB.get(params).promise();

    // Process the event and return a response
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello, world!', item: Item }),
    };
    return response;
  } catch (error) {
    // Handle any errors and return an error response
    console.error('Error:', error);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
    return response;
  }
};
