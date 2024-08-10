import UserService, { UserDto, loginDto } from "../../services/user";

const queries = {
  login: async (_: any, payload: loginDto) => {
    const res = await UserService.loginUser(payload);
    return res;
  },
};

const mutations = {
  createUser: async (_: any, payload: UserDto) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
