import { ProductModel } from "@shoppingapp/common";
import { Product } from "./product.model";
import { CreateProductDto } from "../Dtos/product.dtos";
import { buffer } from "stream/consumers";
import fs from "fs";
import path from "path";

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
