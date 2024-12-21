import { NextFunction } from "express";
import { AuthDto } from "./dtos/auth.dtos";
import { userService, UserService } from "./user/user.service";
import { AuthenticationService, BadRequestError } from "@shoppingapp/common";

export class AuthService {
  constructor(
    public userService: UserService,
    public authenticationService: AuthenticationService
  ) {}

  async signup(AuthDto: AuthDto) {
    const existingUser = await this.userService.findOneByEmail(AuthDto.email);
    if (existingUser) return { message: "Email is already taken." };

    const newUser = await this.userService.create(AuthDto);

    const jwt = this.authenticationService.generateJwt(
      { email: AuthDto.email, userId: newUser.id },
      process.env.JWT_KEY!
    );

    return { jwt };
  }

  async signin(signInDTO: AuthDto) {
    const user = await this.userService.findOneByEmail(signInDTO.email);
    if (!user) return { message: "wrong Credentials user odesn't exist" };

    const samePwd = this.authenticationService.pwdCompare(
      user.password,
      signInDTO.password
    );

    if (!samePwd) return { message: "wrong Credentials" };

    const jwt = this.authenticationService.generateJwt(
      { email: user.email, userId: user.id },
      process.env.JWT_KEY!
    );

    return { jwt };
  }
}
export const authService = new AuthService(
  userService,
  new AuthenticationService()
);
