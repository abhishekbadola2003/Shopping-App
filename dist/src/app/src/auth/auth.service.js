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
exports.authService = exports.AuthService = void 0;
const user_service_1 = require("./user/user.service");
const common_1 = require("@shoppingapp/common");
class AuthService {
    constructor(userService, authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }
    signup(AuthDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userService.findOneByEmail(AuthDto.email);
            if (existingUser)
                return { message: "Email is already taken." };
            const newUser = yield this.userService.create(AuthDto);
            const jwt = this.authenticationService.generateJwt({ email: AuthDto.email, userId: newUser.id }, process.env.JWT_KEY);
            return { jwt };
        });
    }
    signin(signInDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOneByEmail(signInDTO.email);
            if (!user)
                return { message: "wrong Credentials user odesn't exist" };
            const samePwd = this.authenticationService.pwdCompare(user.password, signInDTO.password);
            if (!samePwd)
                return { message: "wrong Credentials" };
            const jwt = this.authenticationService.generateJwt({ email: user.email, userId: user.id }, process.env.JWT_KEY);
            return { jwt };
        });
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService(user_service_1.userService, new common_1.AuthenticationService());
