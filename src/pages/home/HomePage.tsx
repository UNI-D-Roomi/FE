import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Gauge, OrangeTwoButton, SubTitle } from "@/entities";
import { useNavigate } from "react-router";

import { Comment } from "@/entities";

const HomePage = () => {
  const { scene } = useGLTF("./roomie1.glb");
  const navigate = useNavigate();
  scene.scale.set(0.7, 0.7, 0.7);

  // 모델을 중앙으로 이동
  scene.position.set(0, 0, 0);

  const handleLeftClick = () => {
    navigate("/room", { state: { stage: 0, score: 0 } });
  };

  const handleRightClick = () => {
    navigate("/dish", { state: { stage: 0, score: 0 } });
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
          <OrbitControls
          // enablePan={false}
          // enableZoom={false}
          // enableRotate={true}
          // maxPolarAngle={Math.PI / 2 }
          // minPolarAngle={Math.PI / 2}
          // maxAzimuthAngle={Math.PI / 4}   // 오른쪽 회전 제한
          />
          <ambientLight color={"#FFD700"} intensity={13} />
          <pointLight
            color={"#ffffff"}
            position={[10, 10, 10]}
            intensity={10}
          />
          <spotLight
            color={"#ffffff"}
            position={[0, 0, 0]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />
          <primitive object={scene} />
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
