import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Object3D } from "three";

interface UserStore {
  point: number;
  gauge: number;
  isRibbon: boolean;
  name: string;
  hungryScene: Object3D | null;
  roomieScene: Object3D | null;
  ribbonScene: Object3D | null;
  roomieTalkMsg: string;

  setPoint: (point: number) => void;
  setGauge: (gauge: number) => void;
  setIsRibbon: (isRibbon: boolean) => void;
  setName: (name: string) => void;
  setScenes: (hungry: Object3D, roomie: Object3D, ribbon: Object3D) => void;
  renderRoomie: () => JSX.Element | null;
  setRoomieTalkMsg: (content: string) => void;
}

export const useUserStore = create<UserStore>()(
  immer((set, get) => ({
    point: 0,
    gauge: 0,
    name: "",
    isRibbon: false,
    hungryScene: null,
    roomieScene: null,
    ribbonScene: null,
    roomieTalkMsg: "",

    setPoint: (point: number) => {
      set((state) => {
        state.point = point;
      });
    },

    setGauge: (gauge: number) => {
      set((state) => {
        state.gauge = gauge;
      });
    },

    setIsRibbon: (isRibbon: boolean) => {
      set((state) => {
        state.isRibbon = isRibbon;
      });
    },

    setName: (name: string) => {
      set((state) => {
        state.name = name;
      });
    },

    setScenes: (hungry, roomie, ribbon) => {
      set((state) => {
        state.hungryScene = hungry;
        state.roomieScene = roomie;
        state.ribbonScene = ribbon;
      });
    },

    renderRoomie: () => {
      const { gauge, isRibbon, hungryScene, roomieScene, ribbonScene } = get();

      if (gauge <= 30 && hungryScene) {
        return <primitive object={hungryScene} />; // Hungry model
      } else if (isRibbon && ribbonScene) {
        return <primitive object={ribbonScene} />; // Ribbon model
      } else if (roomieScene) {
        return <primitive object={roomieScene} />; // Normal Roomie model
      } else {
        return null;
      }
    },

    setRoomieTalkMsg: (content: string) => {
      set((state) => {
        state.roomieTalkMsg = content;
      });
    },
  }))
);
