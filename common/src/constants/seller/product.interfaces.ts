import { ProductDoc } from "@shoppingapp/common";
import mongoose from "mongoose";
import { UserDoc } from "../auth/user.interfaces";

export interface productDoc extends mongoose.Document {
  user: UserDoc | string;
  title: string;
  price: number;
  images: {
    src: string;
  }[];
}

export interface ProductModel extends mongoose.Model<ProductDoc> {}
