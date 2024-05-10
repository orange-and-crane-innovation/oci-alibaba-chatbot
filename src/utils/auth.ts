import { errorResponseBody } from './response';

export const unauthorized = (error: Error) => {
  console.error(error);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'text/plain',
  };

  return {
    statusCode: 401,
    headers,
    body: errorResponseBody(`401 Unauthorized - ${error.message}`),
  };
};
