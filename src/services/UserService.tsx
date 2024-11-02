import { AxiosResponse } from "axios";
import { API, FORMAPI } from "@/configs";

export const UserService = () => {
  const URL = "/roomie";
  const upload = async (body: FormData) => {
    const { data } = (await FORMAPI.post(
      `/sign-in/storage`,
      body
    )) as AxiosResponse<string>;

    return data;
  };

  const startDish = async (url: string) => {
    await API.post(`${URL}/feed/wash-dish/before`, {
      deforeRoomImage: url,
    });
  };

  return { upload, startDish };
};
