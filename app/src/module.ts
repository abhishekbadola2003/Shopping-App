import * as dotenv from "dotenv";
dotenv.config();
import { Application } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import mongoose, { Error } from "mongoose";
import { json, urlencoded } from "body-parser";
import { errorHandler, currentUser } from "@shoppingapp/common";
import { authRouters } from "./auth/auth.routers";
export class AppModule {
  constructor(public app: Application) {
    app.set("trust-proxy", true);

    app.use(
      cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
      })
    );

    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use(
      cookieSession({
        signed: false,
        secure: false,
      })
    );

    Object.setPrototypeOf(this, AppModule.prototype);
  }
  async start() {
    if (!process.env.MONGO_URI) {
      throw new Error("mongo_uri must be defined");
    }
    if (!process.env.JWT_KEY) {
      throw new Error("jwt_key must be defined.");
    }
    try {
      await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
      throw new Error("database connection failed");
    }

    this.app.use(currentUser(process.env.JWT_KEY!));
    this.app.use(errorHandler);
    this.app.use(authRouters);
    this.app.listen(8080, () => console.log("OK! port: 8080"));
    mongoose.set("strictQuery", true);
  }
}
