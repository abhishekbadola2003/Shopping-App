import { UserModel } from "@shoppingapp/common";
import { User } from "./user.model";
import { CreateUserDtos } from "../dtos/auth.dtos";

export class UserService {
  constructor(public userModel: UserModel) {}
  async create(createUserDtos: CreateUserDtos) {
    const user = new this.userModel({
      email: createUserDtos.email,
      password: createUserDtos.password,
    });
    return await user.save();
  }
  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}

export const userService = new UserService(User);
