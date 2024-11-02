import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useUserStore = create<User.Store>()(
  immer((set) => ({
    point: 350,
    gauge: 70,
    isRibbon: false,

    setPoint: (point: number) => {
      set((state) => {
        state.point = point;
      });
    },

    setGauge: (gauge) => {
      set((state) => {
        state.gauge = gauge;
      });
    },

    setIsRibbon: (isRibbon: boolean) => {
      set((state) => {
        state.isRibbon = isRibbon;
      });
    },
  }))
);
