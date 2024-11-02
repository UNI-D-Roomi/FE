import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Gauge, OrangeTwoButton, SubTitle } from "@/entities";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/UserStore";

const HomePage = () => {
  const { scene: roomieScene } = useGLTF("./roomie1.glb");
  const { scene: hungryScene } = useGLTF("./roomie_hungry.glb");
  const navigate = useNavigate();

  const gauge = useUserStore((state) => state.gauge);
  const setGauge = useUserStore((state) => state.setGauge);

  // 모델을 중앙으로 이동
  roomieScene.position.set(0, 0, 0);
  hungryScene.position.set(0, 0, 0);

  const handleLeftClick = () => {
    navigate("/room", { state: { stage: 0, score: 0 } });
  };

  const handleRightClick = () => {
    navigate("/dish", { state: { stage: 0, score: 0 } });
  };

  const renderRoomie = () => {
    if (gauge <= 30) {
      return <primitive object={hungryScene} />; // 기본 모델 렌더링
    } else {
      return <primitive object={roomieScene} />; // 기본 모델 렌더링
    }
  };

  return (
    <>
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
        <Gauge percent={gauge} />
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
