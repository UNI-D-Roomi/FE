import { colors } from "@/configs";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

export const Header = () => {
  const [point, setPoint] = useState(0);

  // 임시
  useEffect(() => {
    const fetchPoint = async () => {
      // axios.get("/api/point").then(response => setPoint(response.data.point));
      setPoint(34); // 임시 값 설정
    };

    fetchPoint();
  }, []);

  return (
    <>
      <HeaderContainer>
        <Logo to="/">Roomie</Logo>
        <Point>포인트 : {point}점</Point>
      </HeaderContainer>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

const Container = styled.main`
  position: fixed;

  width: 100vw;

  left: 0;
  top: 48px;

  overflow-y: auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 48px;
  left: 0;
  top: 0;
  background-color: skyblue;
`;

const Logo = styled(Link)`
  color: ${colors.red};
  padding: 0 20px;
  font-family: Pretendard;
  font-size: 25px;
  font-weight: 800;
  line-height: 40px;
  letter-spacing: -0.02em;
  text-align: left;
`;

const Point = styled.span`
  color: ${colors.red};
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.02em;
  margin-left: auto;
  padding: 0 20px;
`;
