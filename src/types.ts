import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from "aws-lambda";

export type Event = APIGatewayProxyEvent;

export type Result = APIGatewayProxyResult;

export type Handler = (event: Event, context?: any) => Promise<Result>;

export type UserAuthenticatedContext = {
  accessToken: string;
  tokenPayload: { [key: string]: any };
  corsHeaders?: { [key: string]: any };
};

export type UserAuthenticatedHandler = (
  event: Event,
  context: UserAuthenticatedContext
  // context: any
) => Promise<Result>;
