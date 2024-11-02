import { colors } from "@/configs";
import styled from "@emotion/styled";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;

  color: white;

  border-radius: 7px;

  font-size: 19px;
  margin: 6px;
`;

export const BlueButton = styled(Button)`
  width: 332px;
  background-color: ${colors.blue};
`;

export const OrangeButton = styled(Button)`
  width: 332px;
  background-color: ${colors.orange};
`;

export const RedButton = styled(Button)`
  width: 332px;
  background-color: ${colors.red};
`;

const OrangeHalfButton = styled(OrangeButton)`
  width: 160px;
`;

const Container = styled.div`
  width: 332px;
  display: flex;
  justify-content: space-between;
`;

export const OrangeTwoButton = ({
  leftText,
  rightText,
  leftHandler,
  rightHandler,
}: {
  leftText: string;
  rightText: string;
  leftHandler: () => void;
  rightHandler: () => void;
}) => (
  <Container>
    <OrangeHalfButton onClick={leftHandler}>{leftText}</OrangeHalfButton>
    <OrangeHalfButton onClick={rightHandler}>{rightText}</OrangeHalfButton>
  </Container>
);
