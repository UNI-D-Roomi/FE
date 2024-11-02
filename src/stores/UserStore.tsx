import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useUserStore = create<User.Store>()(
  immer((set) => ({
    point: 0,

    setPoint: (point: number) => {
      set((state) => {
        state.point = point;
      });
    },
  }))
);
