import { prismaClient } from "./../lib/db";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export type UserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type loginDto = Omit<UserDto, "firstName" | "lastName">;

const JWT_SECRET = "jwt-secret";

class UserService {
  private static async hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  private static async getUserByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: { email: email },
    });
    return user;
  }

  public static async createUser(payload: UserDto) {
    const { firstName, lastName, email, password } = payload;

    const hashedPassword = await this.hashPassword(password);

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
  }

  public static async loginUser(payload: loginDto) {
    const { email, password } = payload;
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      throw new Error("Password must be equal");
    }

    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);

    return token;
  }
}

export default UserService;
