import { JwtPayload } from "@shoppingapp/common";
declare global {
    namespace Express {
        interface Request {
            currentUser?: JwtPayload;
        }
    }
}
