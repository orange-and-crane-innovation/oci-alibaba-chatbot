import { Handler } from '../types';

const preflightResponse = (httpMethod: string) => {
  return {
    statusCode: 204,
    body: '',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, authorization',
      'Access-Control-Allow-Methods': `${httpMethod}, OPTIONS`,
    },
  };
};

const methodNotAllowedResponse = {
  statusCode: 405,
  body: 'Method not allowed',
};

export const withPreflightResponse = (httpMethod = 'GET', fn: Handler): Handler => {
  return async (event, context: { [key: string]: any }) => {
    if (event.httpMethod === 'OPTIONS') {
      return preflightResponse(httpMethod);
    }

    if (event.httpMethod !== httpMethod) {
      return methodNotAllowedResponse;
    }

    return fn(event, {
      ...context,
      corsHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, authorization',
        'Access-Control-Allow-Methods': `${httpMethod}, OPTIONS`,
      },
    });
  };
};
