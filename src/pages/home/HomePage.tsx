import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Gauge, OrangeTwoButton, SubTitle } from "@/entities";
import { useNavigate } from "react-router";
import { useState } from "react";

const HomePage = () => {
  const { scene: roomieScene } = useGLTF("./RommieModel/roomie1.glb");
  const { scene: hungryScene } = useGLTF("./RommieModel/roomie_hungry.glb");
  const navigate = useNavigate();
  const hungry = 30; 

  // 모델을 중앙으로 이동
  roomieScene.position.set(0, 0, 0);
  hungryScene.position.set(0, 0, 0);

  const handleLeftClick = () => {
    navigate("/room", { state: { stage: 0, score: 0 } });
  };

  const handleRightClick = () => {
    navigate("/dish", { state: { stage: 0, score: 0 } });
  };

  const renderRoomie =()=>{
    if(hungry <= 30){
      return <primitive object={hungryScene} />; // 기본 모델 렌더링
    }
    else{
      return <primitive object={roomieScene} />; // 기본 모델 렌더링
    }
  }

  return (
    <>
      <TitleContainer>
        <SubTitle>오늘의 루미를 시작해보세요</SubTitle>
      </TitleContainer>
      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 0, 13], fov: 50 }} // 카메라를 뒤로 배치하고 fov 설정
        >
          <OrbitControls/>
          <ambientLight color={"#FFD700"} intensity={8} />
          {renderRoomie()}
        </Canvas>
      </CanvasContainer>
      <ButtonContainer>
        <Gauge percent={70} />
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
  font-weight: bold;
`;
const CanvasContainer = styled.div`
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 60vh;
`;
const ButtonContainer = styled.div`
  display: flex; // 추가: Flexbox 활성화
  flex-direction: column;
  justify-content: center; // 추가: 수평 중앙 정렬
  align-items: center; // 추가: 수직 중앙 정렬
  margin-top: 20px; // 버튼과 다른 요소 사이의 간격을 추가
`;
