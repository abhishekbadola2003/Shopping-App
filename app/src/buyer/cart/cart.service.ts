import { CartModel, CartProductModel } from "@shoppingapp/common";
import { Cart } from "./cart.model";
import { CartProduct } from "./cart-product.model";

export class CartService {
  constructor(
    public cartModel: CartModel,
    public cartProductModel: CartProductModel
  ) {}

  async findOneByUserId(userId: string) {
    return await this.cartModel.findOne({ user: userId });
  }
}

export const cartService = new CartService(Cart, CartProduct);
