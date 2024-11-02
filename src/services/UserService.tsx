import { AxiosResponse } from "axios";
import { API, FORMAPI } from "@/configs";

export const UserService = () => {
  const URL = "/roomie";
  const upload = async (body: FormData) => {
    const { data } = (await FORMAPI.post(
      `/storage`,
      body
    )) as AxiosResponse<string>;

    return data;
  };

  const startDish = async (url: string) => {
    await API.post(`${URL}/feed/wash-dish/before`, {
      deforeDishImage: url,
    });
  };

  const endDish = async (url: string) => {
    const { data } = (await API.post(`${URL}/feed/wash-dish/after`, {
      afterDishImage: url,
    })) as AxiosResponse<{ score: number; comment: string }>;
    return data;
  };

  const endRoom = async (url: string) => {
    const { data } = (await API.post(`${URL}/feed/room`, {
      afterRoomImage: url,
    })) as AxiosResponse<{ score: number; comment: string }>;
    return data;
  };

  const setImg = async (url: string) => {
    await API.post(`${URL}/member/room-image`, {
      imageUrl: url,
    });
  };

  return { upload, startDish, endDish, endRoom, setImg };
};
