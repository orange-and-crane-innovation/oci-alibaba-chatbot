import JWT from "jsonwebtoken";

import { UserAuthenticatedHandler } from "../types";
import { unauthorized } from "./auth";

export const verifyAuthToken = (fn: UserAuthenticatedHandler) => {
  return async (event, context: { [key: string]: any }) => {
    try {
      // let accessToken =
      //   event.headers.authorization ||
      //   event.multiValueQueryStringParameters.key[0];
      // if accessToken starts with 'Bearer ', remove it
      // accessToken = accessToken.startsWith("Bearer ")
      //   ? accessToken.substring(7)
      //   : accessToken;
      // console.log('accessToken', process.env.API_CLIENT_SECRET, accessToken);
      // const verify = JWT.verify(accessToken, process.env.API_CLIENT_SECRET);
      return fn(event, { ...context });
    } catch (err) {
      return unauthorized(err);
    }
  };
};
