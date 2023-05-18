import { Request } from "express";

export interface ConfirmAuthRequest extends Request {
  headers: {
    authorization: string;
  };
}


export type ErrorMessageObject =  {message: string, error: Error};
export type AuthObject = {name: string, password: string};

export type RequestWithAuth = Request<AuthObject>;
export type RequestQueryIDWithAuth = Request<{}, {}, {}, {id: number}> & ConfirmAuthRequest;
export type RequestBodyTextID = Request<{}, {}, {text: string, id: number}>;