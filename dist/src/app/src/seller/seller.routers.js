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
const express_1 = require("express");
const seller_services_1 = require("./seller.services");
const common_1 = require("@shoppingapp/common");
const uploader = new common_1.Uploader();
const middlewareOptions = {
    types: ["image/png", "image/jpeg"],
    fieldName: "image",
};
const multipleFilesMiddleware = uploader.uploadMultipleFiles(middlewareOptions);
const router = (0, express_1.Router)();
router.post("/product/new", common_1.requireAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, price } = req.body;
    if (!req.files)
        return next(new common_1.BadRequestError("images are required."));
    if (req.uploaderError)
        return next(new common_1.BadRequestError(req.uploaderError.message));
    const product = seller_services_1.sellerService.addProduct({
        title,
        price,
        userId: req.currentUser.userId,
        files: req.files,
    });
    res.status(201).send(product);
}));
