import { Handler, HandlerEvent } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent) => {
  const reqBody = event?.body ? JSON.parse(event.body) : {};
  console.log(reqBody);
  return { statusCode: 202, body: JSON.stringify({ message: 'Hello World', reqBody: reqBody || {} }) };
};

export { handler };
