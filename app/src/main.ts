import { JwtPayload } from "@shoppingapp/common";
import { AppModule } from "./module";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtPayload;
    }
  }
}

const bootstrap = () => {
  const app = new AppModule(express());

  app.start();

  console.log("Shopping App Running!");
};

bootstrap();
