import { colors } from "@/configs";
import styled from "@emotion/styled";

interface UserRankItemProps {
  rank: number;
  name: string;
  point: number;
  isMyRank?: boolean;
}

const UserRankItem = ({
  rank,
  name,
  point,
  isMyRank = false,
}: UserRankItemProps) => {
  return (
    <Container>
      <Rank isMyRank={isMyRank}>{rank}등</Rank>
      <Name isMyRank={isMyRank}>{name}</Name>
      <Point isMyRank={isMyRank}>{point}점</Point>
    </Container>
  );
};

export default UserRankItem;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: calc(100% - 80px);
  margin: 10px 40px;
  height: 22px;
`;

const StyledSpan = styled.span<{ isMyRank: boolean }>`
  position: absolute;
  color: ${(props) => (props.isMyRank ? `${colors.red}` : `${colors.black}`)};
  font-weight: 600;
  line-height: 24px;
  height: 22px;
  letter-spacing: -0.02em;
  text-align: left;
  font-size: ${(props) => (props.isMyRank ? "20px" : "15px")};
`;

const Rank = styled(StyledSpan)``;

const Name = styled(StyledSpan)`
  flex: 1;
  text-align: center;
  left: 70px;
`;

const Point = styled(StyledSpan)`
  right: 0;
`;
