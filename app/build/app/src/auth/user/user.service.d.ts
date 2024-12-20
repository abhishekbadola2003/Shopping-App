import { UserModel } from "@shoppingapp/common";
import { AuthDto } from "../dtos/auth.dtos";
export declare class UserService {
    userModel: UserModel;
    constructor(userModel: UserModel);
    create(AuthDto: AuthDto): Promise<import("@shoppingapp/common").UserDoc & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneByEmail(email: string): Promise<(import("@shoppingapp/common").UserDoc & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
}
export declare const userService: UserService;
