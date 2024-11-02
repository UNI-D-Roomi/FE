import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Gauge, OrangeTwoButton, SubTitle } from "@/entities";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/stores/UserStore";

export interface RoomieResponse {
  memberId: number;
  loginId: string;
  name: string;
  points: number;
  roomImageUrl: string;
  roomieId: number;
  hungerGage: number;
  lastFeedTime: string;
  isRibbon: boolean;
  beforeWashImageUrl: string;
  washingStartTime: string;
  roomieTalkMsg: string;
}

import { Comment } from "@/entities";

const HomePage = () => {
  const { scene: roomieScene } = useGLTF("./RoomieModel/roomie1.glb");
  const { scene: hungryScene } = useGLTF("./RoomieModel/roomie_hungry.glb");
  const { scene: ribbonScene } = useGLTF("./RoomieModel/Roomie_ribbon.glb");

  const point = useUserStore((state) => state.point);
  const setPoint = useUserStore((state) => state.setPoint);
  const hungryGauge = useUserStore((state) => state.gauge);
  const setHungryGauge = useUserStore((state) => state.setGauge);
  const isRibbon = useUserStore((state) => state.isRibbon);
  const setIsRibbon = useUserStore((state) => state.setIsRibbon);
  const setScenes = useUserStore((state) => state.setScenes);
  const renderRoomie = useUserStore((state) => state.renderRoomie);
  const [roomieTalkMsg, setRoomieTalkMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Set scenes in Zustand store
    setScenes(hungryScene, roomieScene, ribbonScene);
  }, [hungryScene, roomieScene, ribbonScene, setScenes]);

  const dummyData: RoomieResponse = {
    memberId: 1,
    loginId: "testId123",
    name: "홍길동",
    points: 1400,
    roomImageUrl: "https://roomie.com/room/1",
    roomieId: 1,
    hungerGage: 70,
    lastFeedTime: "string",
    isRibbon: true,
    beforeWashImageUrl: "string",
    washingStartTime: "2024-11-02T20:22:30.244Z",
    roomieTalkMsg: "string",
  };

  useEffect(() => {
    const fetchRoomieCurrent = async () => {
      try {
        /*
        const response = await axios.get<RoomieResponse>(
          `${import.meta.env.VITE_SERVER_URL}/roomie/home`
        );

        if (response.data) {
          setPoint(response.data.points);
          setHungryGauge(response.data.hungerGage);
          setIsRibbon(response.data.isRibbon);
          setRoomieTalkMsg(response.data.roomieTalkMsg);
        }
        */

        setPoint(dummyData.points);
        setHungryGauge(dummyData.hungerGage);
        setIsRibbon(dummyData.isRibbon);
        setRoomieTalkMsg(dummyData.roomieTalkMsg);
      } catch (error) {
        console.error("Failed to fetch Roomie data:", error);
      }
    };

    fetchRoomieCurrent();
  }, [setHungryGauge]);

  // 모델을 중앙으로 이동
  roomieScene.position.set(0, 0, 0);
  hungryScene.position.set(0, 0, 0);
  ribbonScene.position.set(0, 0, 0);

  const handleLeftClick = () => {
    navigate("/room", { state: { stage: 0, score: 0, comment: "" } });
  };

  const handleRightClick = () => {
    navigate("/dish", { state: { stage: 0, score: 0, comment: "" } });
  };

  return (
    <>
      <Comment>"하이요"</Comment>
      <TitleContainer>
        <SubTitle>오늘의 루미를 시작해보세요</SubTitle>
      </TitleContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 0, 13], fov: 50 }} // 카메라를 뒤로 배치하고 fov 설정
        >
          <OrbitControls />
          <ambientLight color={"#FFD700"} intensity={8} />
          {renderRoomie()}
        </Canvas>
      </CanvasContainer>
      <ButtonContainer>
        <Gauge percent={hungryGauge} />
        <OrangeTwoButton
          leftText="방 청소하기"
          rightText="설거지하기"
          leftHandler={handleLeftClick}
          rightHandler={handleRightClick}
        />
      </ButtonContainer>
    </>
  );
};

export default HomePage;

const TitleContainer = styled.div`
  margin-top: 30px;
  margin-left: 3px;
`;
const CanvasContainer = styled.div`
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 60vh;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 60px;
  width: 100vw;
`;
