import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { OrangeButton, SubTitle, Comment } from "@/entities";
import { useNavigate, useLocation } from "react-router";
import { useState, useRef } from "react";
import { PAGE_URL } from "@/configs";
import { useUserStore } from "@/stores/UserStore";

const DishPage = () => {
  // const { scene } = useGLTF("./roomie1.glb");
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState(location.state.stage); // 상태를 관리하는 변수 (0: 사진 업로드 전, 1: 설거지 시작, 2: 설거지 끝내기)
  const score = useRef(location.state.score);

  const globalRenderRoomie = useUserStore((state) => state.renderRoomie);

  const { scene: roomieScene } = useGLTF("./RoomieModel/roomie1.glb");
  const { scene: bubbleScene } = useGLTF("./RoomieModel/Roomie_bubble.glb");

  // 모델을 중앙으로 이동
  roomieScene.position.set(0, 0, 0);
  bubbleScene.position.set(0, 0, 0);

  const handleNext = () => {
    if (stage === 3) {
      navigate("/");
    }
    if (stage === 0)
      navigate(PAGE_URL.Camera, { state: { mode: "BEFOREDISH" } });
    if (stage === 2)
      navigate(PAGE_URL.Camera, { state: { mode: "AFTERDISH" } });
    setStage((prev) => prev + 1); // 단계 증가
  };

  const renderText = () => {
    switch (stage) {
      case 0:
        return (
          <>
            <SubTitle>
              설거지를 시작할까요?
              <br />
            </SubTitle>
            <SubTitle>
              설거지를 시작하기 전의 상태를
              <br />
            </SubTitle>
            <SubTitle>
              업로드해주세요
              <br />
            </SubTitle>
          </>
        );
      case 1:
        return (
          <>
            <SubTitle>
              설거지를 시작하려면
              <br />
            </SubTitle>
            <SubTitle>
              '시작하기' 버튼을 눌러주세요
              <br />
            </SubTitle>
          </>
        );
      case 2:
        return (
          <>
            <SubTitle>
              설거지를 끝내려면
              <br />
            </SubTitle>
            <SubTitle>
              '끝내기' 버튼을 눌러주세요.
              <br />
            </SubTitle>
          </>
        );
      case 3:
        return (
          <>
            <SubTitle>
              {score.current >= 30
                ? "설거지를 아주 잘하셨네요!!"
                : "설거지가 아직 부족한 것 같아요"}
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
    if (stage === 0 || stage === 1) {
      return globalRenderRoomie(); // Use global render logic for initial stages
    } else if (stage === 2 || stage === 3) {
      return (
        <group>
          <primitive object={roomieScene} />
          <primitive object={bubbleScene} /> {/* Add bubble effect */}
        </group>
      );
    } else {
      return null;
    }
  };

  const getButtonText = () => {
    switch (stage) {
      case 0:
        return "사진 업로드하기";
      case 1:
        return "홈으로 돌아가기";
      case 2:
        return "설거지 끝내기";
      case 3:
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
          {/* <ambientLight color={'#FFD700'} intensity={10} /> */}
          {/* <pointLight color={'#ffffff'} position={[10, 10, 10]} intensity={10} /> */}
          {/* <spotLight color={'#ffffff'} position={[0, 0, 0]} angle={0.15} penumbra={1} intensity={1} /> */}
          {renderRoomie()}
        </Canvas>
      </CanvasContainer>
      <ButtonContainer>
        <OrangeButton onClick={handleNext}>{getButtonText()}</OrangeButton>
      </ButtonContainer>
    </>
  );
};

export default DishPage;

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
  bottom: 30px;
  width: 100vw;
`;
