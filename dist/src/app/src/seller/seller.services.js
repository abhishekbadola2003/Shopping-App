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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerService = exports.SellerService = void 0;
const product_services_1 = require("./product/product.services");
class SellerService {
    constructor(productService) {
        this.productService = productService;
    }
    addProduct(createProductDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productService.create(createProductDto);
        });
    }
}
exports.SellerService = SellerService;
exports.sellerService = new SellerService(product_services_1.productService);
