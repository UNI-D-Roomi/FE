import { colors } from "@/configs";
import styled from "@emotion/styled";

export const Comment = styled.span`
  font: 19px;
  color: ${colors.red};

  position: fixed;
  top: 37%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 9;
`;
