import { JwtPayload } from "../constants/global";
export declare class AuthenticationService {
    generateJwt(payload: JwtPayload, JWT_KEY: string): string;
    pwdtoHash(password: string): Promise<string>;
    pwdCompare(storedPassword: string, suppliedPassword: string): Promise<boolean>;
    verifyJwt(jwtToken: string, JWT_KEY: string): JwtPayload;
}
