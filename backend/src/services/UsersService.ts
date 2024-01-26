import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { IUserAuth, IUserCreate } from "../interfaces/UserInterface";
import { AppError } from "../errors/appError";
import * as jwt from "jsonwebtoken";
import { userWithoutPassword } from "../validations/user";

export class UsersService {
  private repository = AppDataSource.getRepository(User);

  async create(user: IUserCreate) {
    const alreadyExists = await this.repository.existsBy({ email: user.email });

    if (alreadyExists) {
      throw new AppError(409, "E-mail already registered");
    }

    const userCreated = await this.repository.save(user);

    return userWithoutPassword.parse(userCreated);
  }

  async findAll() {
    const allUsers = await this.repository.find();

    return userWithoutPassword.array().parse(allUsers);
  }

  async auth(user: IUserAuth) {
    const findUser = await this.repository.findOneBy({
      email: user.email,
    });
    const genericError = new AppError(401, "Invalid email or password");

    if (!findUser) {
      throw genericError;
    }

    const passwordIsCorrect = bcrypt.compareSync(
      user.password,
      findUser.password
    );

    if (!passwordIsCorrect) {
      throw genericError;
    }

    const token = jwt.sign(
      { id: findUser.id, email: findUser.email },
      process.env.SECRET_KEY!,
      {
        expiresIn: "30 days",
      }
    );

    return token;
  }
}
