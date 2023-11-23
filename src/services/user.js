import { apiRequests } from "../utils/apiRequests";
import { userRoutes } from "../utils/routes";

const User = {
  login: (email, password) => {
    return apiRequests(userRoutes.login, "POST", {
      email,
      password,
    });
  },
};

export default User;
