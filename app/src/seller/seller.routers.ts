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
  multipleFilesMiddleware,
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
  "/product/:id/add-images",
  requireAuth,
  multipleFilesMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.files) return next(new BadRequestError("images are required"));

    if (req.uploaderError)
      return next(new BadRequestError(req.uploaderError.message));

    const result = await sellerService.addProductImages({
      productId: id,
      userId: req.currentUser!.userId,
      files: req.files,
    });
    if (result instanceof CustomError) return next(result);

    res.status(200).send(result);
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

router.post(
  "/product/:id/delete-images",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { imagesIds } = req.body;
    const result = await sellerService.deleteProductImages({
      productId: id,
      userId: req.currentUser!.userId,
      imagesIds,
    });

    if (result instanceof CustomError) return next(result);

    res.status(200).send(result);
  }
);
export { router as sellerRouters };
