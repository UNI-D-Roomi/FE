import { AxiosResponse } from "axios";
import { API, setAccess, storeAccess } from "@/configs";

export const AuthService = () => {
  const signin = async (body: User.SignInReqDto) => {
    const {
      data: { accessToken },
    } = (await API.post(
      `${URL}/signin`,
      body
    )) as AxiosResponse<User.SignInResDto>;

    setAccess(accessToken);
    storeAccess(accessToken);
  };

  return { signin };
};
