import styled from "@emotion/styled";
import { BeatLoader } from "react-spinners";

import { Background } from "@/entities";
import { colors } from "@/configs";

export const Loading = () => {
  return (
    <>
      <Background />
      <LoadingWrapper>
        <img src="./logo/Roomie.png" width={170}></img>
        <BeatLoader color={colors.yellow} size={30} speedMultiplier={1} />
      </LoadingWrapper>
    </>
  );
};

export const LoadingWrapper = styled.div`
  background-color: ${colors.blue};

  position: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 40px;

  width: 100%;
  height: 100%;

  font-size: 30px;
  color: white;
  font-weight: bold;

  z-index: 40;
`;
