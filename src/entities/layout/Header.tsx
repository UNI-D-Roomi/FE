import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <>Header</>
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
