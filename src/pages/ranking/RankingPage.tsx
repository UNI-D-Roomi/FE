import { useEffect, useState } from "react";
import { SubTitle } from "@/entities";
import styled from "@emotion/styled";
import UserRankItem from "./element/UserRankItem";
import { useUserStore } from "@/stores/UserStore";
import { API } from "@/configs";

interface RankingItem {
  name: string;
  points: number;
}

const RankingPage = () => {
  const [myRank, setMyRank] = useState(0);
  const [myPoints, setMyPoints] = useState(0);
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const myName = useUserStore((state) => state.name);

  useEffect(() => {
    const fetchMyRanking = async () => {
      try {
        const response = await API.get(`member/grade/self`);

        // 내 순위와 포인트 설정
        setMyRank(response.data.rank);
        setMyPoints(response.data.points);
      } catch (error) {
        console.error("순위 정보를 가져오는 데 실패했습니다:", error);
      }
    };
    const fetchRankingData = async () => {
      try {
        const response = await API.get(`member/grade`);
        setRanking(response.data);
      } catch (error) {
        console.error("순위 정보를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchMyRanking();
    fetchRankingData();
  }, []);

  return (
    <>
      <MyRankContainer>
        <SubTitle>나의 순위</SubTitle>
        <UserRankItem
          rank={myRank}
          name={myName}
          point={myPoints}
          isMyRank={true}
        />
      </MyRankContainer>
      <TotalRankContainer>
        <SubTitle>전체 순위</SubTitle>
        {ranking?.map((item, index) => (
          <UserRankItem
            key={index}
            rank={index + 1}
            name={item.name}
            point={item.points}
          />
        ))}
      </TotalRankContainer>
    </>
  );
};

export default RankingPage;

const MyRankContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TotalRankContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  height: 75%;
`;
