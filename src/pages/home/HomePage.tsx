import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Gauge, OrangeTwoButton, SubTitle } from "@/entities";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useUserStore } from "@/stores/UserStore";
import { UserService } from "@/services/UserService";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

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
import { Link } from "react-router-dom";
import { colors, PAGE_URL } from "@/configs";

const HomePage = () => {
  const { scene: roomieScene } = useGLTF("./RoomieModel/roomie1.glb");
  const { scene: hungryScene } = useGLTF("./RoomieModel/roomie_hungry.glb");
  const { scene: ribbonScene } = useGLTF("./RoomieModel/Roomie_ribbon.glb");

  const hungryGauge = useUserStore((state) => state.gauge);

  const setScenes = useUserStore((state) => state.setScenes);
  const renderRoomie = useUserStore((state) => state.renderRoomie);
  const roomieTalkMsg = useUserStore((state) => state.roomieTalkMsg);

  console.log(hungryGauge);

  const navigate = useNavigate();

  const { fetchRoomieCurrent } = UserService();

  useEffect(() => {
    // Set scenes in Zustand store
    setScenes(hungryScene, roomieScene, ribbonScene);
  }, [hungryScene, roomieScene, ribbonScene, setScenes]);

  useEffect(() => {
    fetchRoomieCurrent();
  }, []);

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
      <Link to={PAGE_URL.Ranking}>
        <StyledMilitaryTechIcon />
      </Link>

      <Comment>"{roomieTalkMsg}"</Comment>
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

const StyledMilitaryTechIcon = styled(MilitaryTechIcon)`
  position: absolute;

  top: 30px;
  right: 20px;

  color: ${colors.red};
  font-size: 60px;
`;

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
