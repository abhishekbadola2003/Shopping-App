import { ProductModel } from "@shoppingapp/common";
import { Product } from "./product.model";
import {
  CreateProductDto,
  DeleteProductDto,
  AddImagesDto,
  DeleteImagesDto,
  UpdateProductDto,
} from "../Dtos/product.dtos";
import { buffer } from "stream/consumers";
import fs from "fs";
import path from "path";
import { title } from "process";

export class ProductService {
  constructor(public productModel: ProductModel) {}

  async create(createProductDto: CreateProductDto) {
    const images = this.generateProductImages(createProductDto.files);
    const product = new this.productModel({
      title: createProductDto.title,
      price: createProductDto.price,
      user: createProductDto.userId,
      images: images,
    });

    return await product.save();
  }

  async UpdateProduct(updateProductDto: UpdateProductDto) {
    return await this.productModel.findOneAndUpdate(
      { _id: updateProductDto.productId },
      { set: { title: updateProductDto.title, price: updateProductDto.price } },
      { new: true }
    );
  }

  async DeleteProduct(deleteProductDto: DeleteProductDto) {
    return await this.productModel.findByIdAndRemove({
      _id: deleteProductDto.productId,
    });
  }
  async addImages(addImagesDto: AddImagesDto) {
    const images = this.generateProductImages(addImagesDto.files);
    return await this.productModel.findOneAndUpdate(
      { _id: addImagesDto.productId },
      { $push: { images: { $each: images } } },
      { new: true }
    );
  }

  async deleteImages(deleteImagesDto: DeleteImagesDto) {
    return await this.productModel.findOneAndUpdate(
      { _id: deleteImagesDto.productId },
      { $pull: { images: { _id: { $in: deleteImagesDto.imagesIds } } } },
      { new: true }
    );
  }

  generateBase64Url(contentType: string, buffer: Buffer) {
    return `data:${contentType}; base64,${buffer.toString("base64")}`;
  }

  generateProductImages(
    files: CreateProductDto["files"]
  ): Array<{ src: string }> {
    let images: Array<Express.Multer.File>;

    if (typeof files === "object") {
      images = Object.values(files).flat();
    } else {
      images = files ? [...files] : [];
    }
    return images.map((file: Express.Multer.File) => {
      let srcobj = { src: this.generateBase64Url(file.mimetype, file.buffer) };
      fs.unlink(path.join("/upload/" + file.filename), () => {});
      return srcobj;
    });
  }
}
export const productService = new ProductService(Product);
