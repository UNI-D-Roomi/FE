import { colors } from "@/configs";
import styled from "@emotion/styled";

export const Gauge = ({ percent }: { percent: number }) => (
  <Bar>
    <Title1>허기짐</Title1>
    <Title2>배부름</Title2>
    <Progress percent={percent} />
  </Bar>
);

const Bar = styled.div`
  position: relative;

  height: 23px;
  width: 320px;
  background-color: white;
  border: 2px solid ${colors.red};
  border-radius: 7px;
  margin-bottom: 5px;
`;

const Progress = styled(Bar)<{ percent: number }>`
  z-index: 10;
  position: absolute;
  top: 0px;
  left: 0px;
  border: 0px solid ${colors.red};
  height: 19px;

  border-radius: 3px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;

  width: ${(props) => props.percent}%;

  background-color: ${colors.red};
`;

const Title1 = styled.span`
  position: absolute;
  top: -20px;
  left: 0px;
  color: ${colors.red};
`;

const Title2 = styled.span`
  position: absolute;
  top: -20px;
  right: 0px;
  color: ${colors.red};
`;
