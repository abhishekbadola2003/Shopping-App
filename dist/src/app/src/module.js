"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AppModule = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const mongoose_1 = __importStar(require("mongoose"));
const body_parser_1 = require("body-parser");
const common_1 = require("@shoppingapp/common");
const auth_routers_1 = require("./auth/auth.routers");
class AppModule {
    constructor(app) {
        this.app = app;
        app.set("trust-proxy", true);
        app.use((0, cors_1.default)({
            origin: "*",
            credentials: true,
            optionsSuccessStatus: 200,
        }));
        app.use((0, body_parser_1.urlencoded)({ extended: true }));
        app.use((0, body_parser_1.json)());
        app.use((0, cookie_session_1.default)({
            signed: false,
            secure: false,
        }));
        Object.setPrototypeOf(this, AppModule.prototype);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process.env.MONGO_URI) {
                throw new mongoose_1.Error("mongo_uri must be defined");
            }
            if (!process.env.JWT_KEY) {
                throw new mongoose_1.Error("jwt_key must be defined.");
            }
            try {
                yield mongoose_1.default.connect(process.env.MONGO_URI);
            }
            catch (err) {
                throw new mongoose_1.Error("database connection failed");
            }
            this.app.use((0, common_1.currentUser)(process.env.JWT_KEY));
            this.app.use(common_1.errorHandler);
            this.app.use(auth_routers_1.authRouters);
            this.app.listen(8080, () => console.log("OK! port: 8080"));
            mongoose_1.default.set("strictQuery", true);
        });
    }
}
exports.AppModule = AppModule;
