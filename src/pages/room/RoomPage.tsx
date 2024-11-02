import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { OrangeButton, SubTitle, Comment } from "@/entities";
import { useNavigate, useLocation } from "react-router";
import { useRef, useState } from "react";
import { PAGE_URL } from "@/configs";

const RoomPage = () => {
  // const { scene } = useGLTF("./roomie1.glb");
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState(location.state.stage); // 상태를 관리하는 변수 (0: 사진 업로드 전, 1: 설거지 시작, 2: 설거지 끝내기)
  const score = useRef(location.state.score);

  const { scene: roomieScene } = useGLTF("./RoomieModel/roomie1.glb");
  const { scene: dustScene } = useGLTF("./RoomieModel/Roomie_dust.glb");

  // 모델을 중앙으로 이동
  roomieScene.position.set(0, 0, 0);
  dustScene.position.set(0, 0, 0);

  const handleNext = () => {
    navigate(PAGE_URL.Camera, { state: { mode: "ROOM" } });
    setStage((prev) => prev + 1); // 단계 증가
  };

  const renderText = () => {
    switch (stage) {
      case 0:
        return (
          <>
            <SubTitle>
              방 청소를 하셨나요?
              <br />
            </SubTitle>
            <SubTitle>
              청소 이후의 사진을 업로드해주세요
              <br />
            </SubTitle>
          </>
        );
      case 1:
        return (
          <>
            <SubTitle>
              청소를 아주 잘하셨네요!
              <br />
            </SubTitle>
            <SubTitle>
              점수는 {score.current}점 입니다
              <br />
            </SubTitle>
            <Comment>{location.state.comment}</Comment>
          </>
        );
      default:
        return null;
    }
  };

  const renderRoomie = () => {
    switch (stage) {
      case 0:
        return <primitive object={roomieScene} />; // 기본 모델 렌더링
      case 1:
        return (
          <group>
            <primitive object={roomieScene} />
            <primitive object={dustScene} />
          </group>
        );
      default:
        return null;
    }
  };

  const getButtonText = () => {
    switch (stage) {
      case 0:
        return "사진 업로드하기";
      case 1:
        return "홈으로 돌아가기";
      default:
        return null;
    }
  };

  return (
    <>
      <TitleContainer>{renderText()}</TitleContainer>

      <CanvasContainer>
        <Canvas
          camera={{ position: [0, 0, 13], fov: 50 }} // 카메라를 뒤로 배치하고 fov 설정
        >
          <OrbitControls />
          <ambientLight color={"#ffffff"} intensity={8} />
          {renderRoomie()}
        </Canvas>
      </CanvasContainer>
      <ButtonContainer>
        <OrangeButton onClick={handleNext}>{getButtonText()}</OrangeButton>
      </ButtonContainer>
    </>
  );
};

export default RoomPage;

const TitleContainer = styled.div`
  margin-top: 30px;
  margin-left: 3px;
  width: 100%;
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
