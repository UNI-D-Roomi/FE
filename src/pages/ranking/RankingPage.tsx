import { useEffect, useState } from "react";
import { SubTitle } from "@/entities";
import styled from "@emotion/styled";
import UserRankItem from "./element/UserRankItem";
import axios from "axios";

interface RankingItem {
  name: string;
  points: number;
}

const RankingPage = () => {
  const [memberId] = useState(1);
  const [myName] = useState("내 이름");
  const [myRank, setMyRank] = useState(0);
  const [myPoints, setMyPoints] = useState(0);
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  useEffect(() => {
    const fetchMyRanking = async () => {
      try {
        /*
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/grade/${memberId}/rank`
        );

        // 내 순위와 포인트 설정
        setMyRank(response.data.rank);
        setMyPoints(response.data.points);
        */

        const dummyRankData = { rank: 5, points: 500 };

        setMyRank(dummyRankData.rank);
        setMyPoints(dummyRankData.points);
      } catch (error) {
        console.error("순위 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    const fetchRankingData = async () => {
      try {
        /*
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/grade`
        );

        // 전체 순위 설정
        setRanking(response.data.ranking);
        */

        const dummyRankingData = [
          { name: "사용자 1", points: 1000 },
          { name: "사용자 2", points: 800 },
          { name: "사용자 3", points: 700 },
          { name: "사용자 4", points: 600 },
          { name: "내 이름", points: 500 }, // 내 순위
          { name: "사용자 6", points: 400 },
        ];

        setRanking(dummyRankingData);
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
`;
