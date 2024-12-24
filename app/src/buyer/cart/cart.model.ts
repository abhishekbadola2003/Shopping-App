import mongoose from "mongoose";
import { CartProductDoc, CartProductModel } from "@shoppingapp/common";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartProduct",
    },
  ],
  totalPrice: { type: Number, default: 0, required: true },

  customer_id: { type: String },
});

export const Cart = mongoose.model<CartProductDoc, CartProductModel>(
  "Cart",
  schema
);
