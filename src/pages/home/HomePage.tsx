import styled from "@emotion/styled";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { OrangeTwoButton, SubTitle } from "@/entities";
import { useNavigate } from "react-router";

const HomePage = () => {
  const { scene } = useGLTF("./roomie1.glb");
  const navigate = useNavigate();
  scene.scale.set(0.7, 0.7, 0.7); 

  // 모델을 중앙으로 이동
  scene.position.set(0, 0, 0);

  const handleLeftClick = () => {
    navigate('/room');
  };

  const handleRightClick = () => {
    navigate('/dish');
  };

  return <>
      <TitleContainer>
        <SubTitle>오늘의 루미를 시작해보세요</SubTitle>
      </TitleContainer>
      <CanvasContainer>
          <Canvas camera={{ position: [0, 0, 13], fov: 50 }}  // 카메라를 뒤로 배치하고 fov 설정
          >
            <OrbitControls
              // enablePan={false} 
              // enableZoom={false} 
              // enableRotate={true} 
              // maxPolarAngle={Math.PI / 2 } 
              // minPolarAngle={Math.PI / 2} 
              // maxAzimuthAngle={Math.PI / 4}   // 오른쪽 회전 제한
            />
            <ambientLight color={'#FFD700'} intensity={13} />
            <pointLight color={'#ffffff'} position={[10, 10, 10]} intensity={10} />
            <spotLight color={'#ffffff'} position={[0, 0, 0]} angle={0.15} penumbra={1} intensity={1} />
            <primitive object={scene} />

        </Canvas>
      </CanvasContainer>
      <ButtonContainer>
        <OrangeTwoButton 
          leftText="방 청소하기" 
          rightText="설거지하기" 
          leftHandler={handleLeftClick} 
          rightHandler={handleRightClick} 
        />
      </ButtonContainer>
      
  </>;
};

export default HomePage;

const TitleContainer = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  font-weight: bold;
`;
const CanvasContainer = styled.div`
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 60vh;
`;
const ButtonContainer = styled.div`
  display: flex;               
  justify-content: center;     
  align-items: center;         
  margin-top: 20px;           
`;