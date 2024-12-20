import { NextFunction } from "express";
import { AuthDto } from "./dtos/auth.dtos";
import { UserService } from "./user/user.service";
import { AuthenticationService } from "@shoppingapp/common";
export declare class AuthService {
    userService: UserService;
    authenticationService: AuthenticationService;
    constructor(userService: UserService, authenticationService: AuthenticationService);
    signup(AuthDto: AuthDto, errCallback: NextFunction): Promise<string | void>;
    signin(signInDTO: AuthDto, errCallback: NextFunction): Promise<void | {
        jwt: string;
    }>;
}
export declare const authService: AuthService;
