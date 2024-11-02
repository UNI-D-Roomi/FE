import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Gauge, OrangeTwoButton, SubTitle } from "@/entities";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/stores/UserStore";

export interface RoomieResponse {
  id: number;
  hungerGage: number;
  lastFeedTime: string;
  isRibbon: boolean;
  beforeWashImageUrl: string;
  washingStartTime: string;
}

import { Comment } from "@/entities";

const HomePage = () => {
  const { scene: roomieScene } = useGLTF("./roomie1.glb");
  const { scene: hungryScene } = useGLTF("./roomie_hungry.glb");
  //const { scene: ribbonScene } = useGLTF("./roomie_ribbon.glb");

  const hungryGauge = useUserStore((state) => state.gauge);
  const setHungryGauge = useUserStore((state) => state.setGauge);
  const [isRibbon, setIsRibbon] = useState(false);

  const navigate = useNavigate();

  const dummyData: RoomieResponse = {
    id: 1,
    hungerGage: 50,
    lastFeedTime: "2024-11-02T16:00:00Z",
    isRibbon: true,
    beforeWashImageUrl: "example_url",
    washingStartTime: "2024-11-02T16:37:15.502Z",
  };

  useEffect(() => {
    const fetchRoomieCurrent = async () => {
      try {
        /*
        const response = await axios.get<RoomieResponse>(
          `${import.meta.env.VITE_SERVER_URL}/roomie/current`
        );

        if (response.data) {
          setHungryGauge(response.data.hungerGage);
          setIsRibbon(response.data.isRibbon);
        }
        */

        setHungryGauge(dummyData.hungerGage);
        setIsRibbon(dummyData.isRibbon);
      } catch (error) {
        console.error("Failed to fetch Roomie data:", error);
      }
    };

    fetchRoomieCurrent();
  }, [setHungryGauge]);

  // 모델을 중앙으로 이동
  roomieScene.position.set(0, 0, 0);
  hungryScene.position.set(0, 0, 0);
  //ribbonScene.position.set(0, 0, 0);

  const handleLeftClick = () => {
    navigate("/room", { state: { stage: 0, score: 0 } });
  };

  const handleRightClick = () => {
    navigate("/dish", { state: { stage: 0, score: 0 } });
  };

  const renderRoomie = () => {
    if (hungryGauge <= 30) {
      if (isRibbon) {
        return <primitive object={hungryScene} />; // 추후 수정 !!! 배고픈&리본 모델 렌더링
      } else {
        return <primitive object={hungryScene} />; // 배고픈 모델 렌더링
      }
    } else {
      if (isRibbon) {
        return <primitive object={roomieScene} />; // 추후 수정 !!! 기본&리본 모델 렌더링
      } else {
        return <primitive object={roomieScene} />; // 기본 모델 렌더링
      }
    }
  };

  return (
    <>
      <Comment>하이요</Comment>
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
