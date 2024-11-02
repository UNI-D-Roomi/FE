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
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.02em;
  text-align: left;
`;

const Rank = styled(StyledSpan)`
  font-size: ${(props) => (props.isMyRank ? "20px" : "15px")};
`;

const Name = styled(StyledSpan)`
  flex: 1;
  text-align: center;
  left: 70px;
`;

const Point = styled(StyledSpan)`
  right: 0;
`;
