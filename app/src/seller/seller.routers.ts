import { Response, Request, NextFunction, Router } from "express";

const router = Router();
router.post(
  "/product/new",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;
  }
);
