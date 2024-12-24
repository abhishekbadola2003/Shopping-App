import mongoose from "mongoose";
import { UserDoc } from "../user.interfaces";
import { CartProductDoc } from "./cart-product.interfaces";

export interface CartDoc extends mongoose.Document {
  user: UserDoc | string;
  products: Array<CartProductDoc | string>;
  totalPrice: number;
  customer_id?: string;
}

export interface CartModel extends mongoose.Model<CartDoc> {}
