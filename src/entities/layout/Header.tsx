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
      <HeaderSpace />
      <HeaderContainer>
        <Logo to="/">Roomie</Logo>
        <PointWrapper>
          <span className="span">포인트 : &nbsp;</span>
          <Point>{point}</Point>
          <span className="span">점</span>
        </PointWrapper>
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
  top: 88px;

  overflow-y: auto;
`;

const HeaderSpace = styled.div`
  position: fixed;
  width: 100vw;
  height: 40px;
  left: 0;
  top: 0;
  background-color: ${colors.blue};
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 48px;
  left: 0;
  top: 40px;
  background-color: ${colors.blue};
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

const PointWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  min-width: 110px;
  padding: 0 16px;
  height: 48px;
  right: 0;
  margin: 0 20px;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  background-color: ${colors.white};

  .span {
    color: ${colors.black};
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.02em;
  }
`;

const Point = styled.span`
  color: ${colors.black};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.02em;
`;
