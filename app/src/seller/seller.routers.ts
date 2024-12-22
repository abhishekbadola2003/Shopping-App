import { Response, Request, NextFunction, Router } from "express";
import {
  BadRequestError,
  Uploader,
  UploaderMiddlewareOptions,
} from "@shoppingapp/common";

const uploader = new Uploader();
const middlewareOptions: UploaderMiddlewareOptions = {
  types: ["image/png", "image/jpeg"],
  fieldName: "image",
};

const multipleFilesMiddleware = uploader.uploadMultipleFiles(middlewareOptions);

const router = Router();
router.post(
  "/product/new",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;

    if (!req.files) return next(new BadRequestError("images are required."));

    if (req.uploaderError)
      return next(new BadRequestError(req.uploaderError.message));
  }
);
