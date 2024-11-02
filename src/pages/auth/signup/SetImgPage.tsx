import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { BlueButton, Title } from "@/entities";
import { PAGE_URL } from "@/configs";

const SetImgPage = () => {
  return (
    <Container>
      <WidTitle>깨끗한 방 사진을</WidTitle>
      <WidTitle>한 장 추가해주세요.</WidTitle>
      <div style={{ height: "50px" }}></div>
      <Link to={PAGE_URL.Camera} state={{ mode: "SIGNIN" }}>
        <BlueButton>사진 추가하기</BlueButton>
      </Link>
    </Container>
  );
};

const WidTitle = styled(Title)`
  margin-top: 5px;
  width: 332px;
  font-weight: bold;
`;

const Container = styled.div`
  margin-top: 180px;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5px;

  > button {
    margin-top: 6px;
  }
`;

export default SetImgPage;
