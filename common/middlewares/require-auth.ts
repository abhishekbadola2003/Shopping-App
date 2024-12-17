import { Request, Response, NextFunction } from "express";
import User from "../../";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { currentUser } from "../../common/middlewares/current-user";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new NotAuthorizedError();

  const user = await User.findById(req.currentUser?.userId);

  if (!user) throw new NotAuthorizedError();

  next();
};
