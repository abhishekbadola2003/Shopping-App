import { NextFunction } from "express";
import { AuthDto } from "./dtos/auth.dtos";
import { userService, UserService } from "./user/user.service";
import { AuthenticationService, BadRequestError } from "@shoppingapp/common";

export class AuthService {
  constructor(
    public userService: UserService,
    public authenticationService: AuthenticationService
  ) {}

  async signup(AuthDto: AuthDto, errCallback: NextFunction) {
    const existingUser = await this.userService.findOneByEmail(AuthDto.email);
    if (existingUser)
      return errCallback(
        new BadRequestError("user already exists with same email")
      );

    const newUser = await this.userService.create(AuthDto);

    const jwt = this.authenticationService.generateJwt(
      { email: AuthDto.email, userId: newUser.id },
      process.env.JWT_KEY!
    );

    return jwt;
  }

  async signin(signInDTO: AuthDto, errCallback: NextFunction) {
    const user = await this.userService.findOneByEmail(signInDTO.email);
    if (!user)
      return errCallback(
        new BadRequestError("user doesn't exist with this email.")
      );

    const samePwd = this.authenticationService.pwdCompare(
      user.password,
      signInDTO.password
    );

    if (!samePwd) return errCallback(new BadRequestError("wrong credentials"));

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
