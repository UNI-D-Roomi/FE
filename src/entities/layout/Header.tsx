import { colors } from "@/configs";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export const Header = () => {
  const [point, setPoint] = useState(0);

  // 임시
  useEffect(() => {
    const fetchPoint = async () => {
      // axios.get("/api/point").then(response => setPoint(response.data.point));
      setPoint(350); // 임시 값 설정
    };

    fetchPoint();
  }, []);

  return (
    <>
      <HeaderSpace />
      <HeaderContainer>
        <Logo to="/">
          <svg
            width="85"
            height="20"
            viewBox="0 0 85 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.342773 19V1.32422H7.56934C11.5488 1.32422 13.9902 3.57031 13.9902 7.18359C13.9902 9.61279 12.8794 11.3584 10.9385 12.2373L14.625 19H10.0596L6.8125 12.9209H4.49316V19H0.342773ZM4.49316 9.60059H6.69043C8.64355 9.60059 9.69336 8.84375 9.69336 7.18359C9.69336 5.52344 8.64355 4.69336 6.69043 4.69336H4.49316V9.60059ZM21.7178 19.2441C17.5674 19.2441 15.0527 16.4854 15.0527 12.4082C15.0527 8.33105 17.5674 5.57227 21.7178 5.57227C25.8682 5.57227 28.3828 8.33105 28.3828 12.4082C28.3828 16.4854 25.8682 19.2441 21.7178 19.2441ZM21.7422 16.1436C23.3047 16.1436 24.1836 14.6055 24.1836 12.3838C24.1836 10.1621 23.3047 8.62402 21.7422 8.62402C20.1309 8.62402 19.252 10.1621 19.252 12.3838C19.252 14.6055 20.1309 16.1436 21.7422 16.1436ZM36.1592 19.2441C32.0088 19.2441 29.4941 16.4854 29.4941 12.4082C29.4941 8.33105 32.0088 5.57227 36.1592 5.57227C40.3096 5.57227 42.8242 8.33105 42.8242 12.4082C42.8242 16.4854 40.3096 19.2441 36.1592 19.2441ZM36.1836 16.1436C37.7461 16.1436 38.625 14.6055 38.625 12.3838C38.625 10.1621 37.7461 8.62402 36.1836 8.62402C34.5723 8.62402 33.6934 10.1621 33.6934 12.3838C33.6934 14.6055 34.5723 16.1436 36.1836 16.1436ZM44.4482 19V5.74316H48.3545V8.16016H48.501C49.0625 6.54883 50.4297 5.57227 52.2607 5.57227C54.0918 5.57227 55.5078 6.57324 55.8496 8.16016H55.9961C56.5088 6.59766 58.0469 5.57227 60 5.57227C62.4902 5.57227 64.2236 7.25684 64.2236 10.0645V19H60.0977V10.9922C60.0977 9.64941 59.3164 8.91699 58.2178 8.91699C57.0215 8.91699 56.3135 9.77148 56.3135 11.041V19H52.3584V10.9434C52.3584 9.69824 51.6016 8.91699 50.5029 8.91699C49.3555 8.91699 48.5742 9.7959 48.5742 11.1387V19H44.4482ZM66.3115 19V5.74316H70.4375V19H66.3115ZM68.3867 4.15625C67.2148 4.15625 66.2627 3.27734 66.2627 2.17871C66.2627 1.08008 67.2148 0.201172 68.3867 0.201172C69.5586 0.201172 70.5352 1.08008 70.5352 2.17871C70.5352 3.27734 69.5586 4.15625 68.3867 4.15625ZM78.751 19.2441C74.6006 19.2441 72.0615 16.6562 72.0615 12.4326C72.0615 8.33105 74.625 5.57227 78.6045 5.57227C82.3154 5.57227 85.001 7.94043 85.001 12.335V13.3848H76.1143V13.458C76.1143 15.167 77.1641 16.2656 78.8242 16.2656C79.9473 16.2656 80.7773 15.7773 81.1191 14.9961H84.9521C84.4639 17.584 82.1934 19.2441 78.751 19.2441ZM76.1143 10.9678H81.168C81.1436 9.55176 80.1182 8.55078 78.7021 8.55078C77.2373 8.55078 76.1753 9.58838 76.1143 10.9678Z"
              fill="#E78F81"
            />
          </svg>
        </Logo>
        <PointWrapper>
          <StyledMonetizationOnIcon />
          <Point>{point}</Point>
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
  height: calc(100% - 88px);
  left: 0;
  top: 88px;
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
  padding: 0 20px;
`;

const PointWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  min-width: 80px;
  padding: 0 16px;
  height: 49px;
  right: 0;
  margin: 0 20px;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  background-color: ${colors.white};
`;

const Point = styled.span`
  color: ${colors.black};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.02em;
  padding-top: 3.5px;
  padding-right: 2px;
`;

const StyledMonetizationOnIcon = styled(MonetizationOnIcon)`
  color: ${colors.black};
  font-size: 20px;
  margin-right: 4px;
  vertical-align: middle;
`;
