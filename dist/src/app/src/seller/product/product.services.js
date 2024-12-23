"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    create(createProductDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = this.generateProductImages(createProductDto.files);
            const product = new this.productModel({
                title: createProductDto.title,
                price: createProductDto.price,
                user: createProductDto.userId,
                images: images,
            });
            return yield product.save();
        });
    }
    generateBase64Url(contentType, buffer) {
        return `data:${contentType}; base64,${buffer.toString("base64")}`;
    }
    generateProductImages(files) {
        let images;
        if (typeof files === "object") {
            images = Object.values(files).flat();
        }
        else {
            images = files ? [...files] : [];
        }
        return images.map((file) => {
            let srcobj = { src: this.generateBase64Url(file.mimetype, file.buffer) };
            fs_1.default.unlink(path_1.default.join("/upload/" + file.filename), () => { });
            return srcobj;
        });
    }
}
exports.ProductService = ProductService;
exports.productService = new ProductService(product_model_1.Product);
