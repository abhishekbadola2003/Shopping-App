import { Request, Response, NextFunction } from "express";
declare global {
  interface Req extends Request {
    session?: any;
    currentUser?: any;
  }
}
export declare const currentUser: (
  jwt_key: string
) => (req: Request, res: Response, next: NextFunction) => void;
