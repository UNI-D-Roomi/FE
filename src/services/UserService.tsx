import { AxiosResponse } from "axios";
import { API, FORMAPI } from "@/configs";
import { useUserStore } from "@/stores/UserStore";

export const UserService = () => {
  const URL = "/roomie";
  const setIsRibbon = useUserStore((state) => state.setIsRibbon);
  const setRoomieTalkMsg = useUserStore((state) => state.setRoomieTalkMsg);
  const setPoint = useUserStore((state) => state.setPoint);
  const setHungryGauge = useUserStore((state) => state.setGauge);

  const fetchRoomieCurrent = async () => {
    try {
      const response = await API.get<User.RoomieResponse>(`/roomie/home`);

      console.log(response);

      if (response.data) {
        setPoint(response.data.points);
        setHungryGauge(response.data.hungerGage);
        setIsRibbon(response.data.isRibbon);
        setRoomieTalkMsg(response.data.roomieTalkMsg);
      }
    } catch (error) {
      console.error("Failed to fetch Roomie data:", error);
    }
  };

  const upload = async (body: FormData) => {
    const { data } = (await FORMAPI.post(
      `/storage`,
      body
    )) as AxiosResponse<string>;

    return data;
  };

  const startDish = async (url: string) => {
    await API.post(
      `${URL}/feed/wash-dish/before`,
      {},
      {
        headers: {
          beforeWashImage: url,
        },
      }
    );
  };

  const endDish = async (url: string) => {
    const { data } = (await API.post(
      `${URL}/feed/wash-dish/after`,
      {},
      {
        headers: {
          afterWashImage: url,
        },
      }
    )) as AxiosResponse<{ score: number; comment: string }>;
    return data;
  };

  const endRoom = async (url: string) => {
    const { data } = (await API.post(
      `${URL}/feed/room`,
      {},
      {
        headers: {
          afterRoomImage: url,
        },
      }
    )) as AxiosResponse<{ score: number; comment: string }>;
    return data;
  };

  const setImg = async (url: string) => {
    await API.post(
      `/member/room-image`,
      {},
      {
        headers: {
          imageUrl: url,
        },
      }
    );
  };

  const buyRiboon = async () => {
    await API.put(`${URL}/buy-roomie`);

    setIsRibbon(true);
  };

  return {
    fetchRoomieCurrent,
    upload,
    startDish,
    endDish,
    endRoom,
    setImg,
    buyRiboon,
  };
};
