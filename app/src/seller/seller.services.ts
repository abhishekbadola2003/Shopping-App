import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from "./Dtos/product.dtos";
import { productService, ProductService } from "./product/product.services";
import { BadRequestError, NotAuthorizedError } from "@shoppingapp/common";

export class SellerService {
  constructor(public productService: ProductService) {}

  async addProduct(createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const product = await this.productService.getOneById(
      updateProductDto.productId
    );
    if (!product) return new BadRequestError("product not found! ");
    if (product.user.toString() !== updateProductDto.userId) {
      return new NotAuthorizedError();
    }
    return await this.productService.UpdateProduct(updateProductDto);
  }

  async deleteProduct(deleteProductDto: DeleteProductDto) {
    const product = await this.productService.getOneById(
      updateProductDto.product
    );
  }
}

export const sellerService = new SellerService(productService);
