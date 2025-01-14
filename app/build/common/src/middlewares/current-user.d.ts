import { Request, Response, NextFunction } from "express";
declare global {
  interface Req extends Request {
    session?: any;
    currentUser?: any;
  }
}
export declare const currentUser: (
  jwt_key: string
) => (req: Req, res: Response, next: NextFunction) => void;
