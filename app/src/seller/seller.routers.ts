import { Response, Request, NextFunction, Router } from "express";
import { sellerService } from "./seller.services";
import {
  BadRequestError,
  CustomError,
  Uploader,
  UploaderMiddlewareOptions,
  requireAuth,
} from "@shoppingapp/common";
import { userInfo } from "os";
import { Result } from "express-validator";

const uploader = new Uploader();
const middlewareOptions: UploaderMiddlewareOptions = {
  types: ["image/png", "image/jpeg"],
  fieldName: "image",
};

const multipleFilesMiddleware = uploader.uploadMultipleFiles(middlewareOptions);

const router = Router();
router.post(
  "/product/new",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;

    if (!req.files) return next(new BadRequestError("images are required."));

    if (req.uploaderError)
      return next(new BadRequestError(req.uploaderError.message));

    const product = await sellerService.addProduct({
      title,
      price,
      userId: req.currentUser!.userId,
      files: req.files,
    });
    res.status(201).send(product);
  }
);

router.post(
  "/product/:id/update",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, price } = req.body;

    const product = await sellerService.updateProduct({
      title,
      price,
      userId: req.currentUser!.userId,
      productId: id,
    });
    if (product instanceof CustomError) return next(product);
  }
);

router.post(
  "/product/:id/delete",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await sellerService.deleteProduct({
      productId: id,
      userId: req.currentUser!.userId,
    });
    res.status(200).send(true);
  }
);

export { router as sellerRouters };
