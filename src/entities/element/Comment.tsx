//import { colors } from "@/configs";
import { colors } from "@/configs";
import styled from "@emotion/styled";

export const Comment = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: white;

  position: fixed;
  top: 72%;
  left: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  transform: translate(-50%, -50%);

  z-index: 9;

  border-radius: 8px;
  width: 250px;
  height: 70px;
  background-color: ${colors.blue};

  word-break: keep-all;
  white-space: normal;
  overflow-wrap: break-word;

  ::after {
    content: "";
    position: absolute;
    left: 120px;
    top: -20px;
    border-bottom: 21px solid ${colors.blue};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
`;
