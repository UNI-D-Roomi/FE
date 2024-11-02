import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useUserStore = create<User.Store>()(
  immer((set) => ({
    point: 350,

    setPoint: (point: number) => {
      set((state) => {
        state.point = point;
      });
    },
  }))
);
