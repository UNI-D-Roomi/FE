import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { OrangeButton, RedButton, SubTitle } from "@/entities";
import styled from "@emotion/styled";
import { colors } from "@/configs";
import Item from "./element/Item";
import { ItemProps } from "./dto";

const StorePage = () => {
  const [currentStep, setCurrentStep] = useState("default");
  const [roomie, setRoomie] = useState("기본");
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const nav = useNavigate();

  const items: ItemProps[] = [
    { name: "리본", image: "리본 사진", price: 100 },
    { name: "선글라스", image: "선글라스 사진", price: 200 },
  ];

  const item = items[currentItemIndex];

  // 아이템 전환 함수
  const handleNextItem = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePreviousItem = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleApplyItem = async () => {
    try {
      // 서버 요청 : 아이템 착용 상태 이미지 가져오기
      /*
      const response = await axios.get("/api/roomie/item", {
        params: { itemId: item.image }, // 서버가 아이템 ID를 통해 이미지 반환
      });
      setRoomie(response.data.image); // 서버에서 받은 이미지를 설정
      */
      setRoomie(`${item.name} 착용 상태`);
      setCurrentStep("itemApplied");
    } catch (error) {
      console.error("아이템 착용 오류:", error);
    }
  };

  // 아이템 구매하기
  const handlePurchaseItem = async () => {
    try {
      /*
      // 서버 요청 예제: 포인트 차감 및 구매 처리
      const response = await axios.post("/api/points/deduct", {
        itemId: item.image, // 아이템 ID
        price: item.price, // 차감할 포인트
      });

      if (response.data.success) {
        setPoints(points - item.price); // 포인트 차감
        setCurrentStep("itemPurchased");
      } else {
        alert("포인트가 부족합니다.");
      }
      */
      //setPoints(points - item.price); // 포인트 차감
      setCurrentStep("itemPurchased");
    } catch (error) {
      console.error("아이템 구매 오류:", error);
    }
  };

  const handleBackToDefault = () => {
    setCurrentStep("default");
  };

  const handleBackToHome = () => {
    nav("/");
  };

  return (
    <Layout>
      {currentStep === "default" && (
        <>
          <SubTitle>
            모은 포인트로
            <br />
            루미를 꾸밀 아이템을 구매해보세요
          </SubTitle>
          <RoomieContainer>모델링 - {roomie}</RoomieContainer>
          <ItemContainer>
            <ArrowButton onClick={handlePreviousItem}>◀</ArrowButton>
            <Item name={item.name} image={item.image} price={item.price} />
            <ArrowButton onClick={handleNextItem}>▶</ArrowButton>
          </ItemContainer>
          <ButtonContainer>
            <OrangeButton onClick={handleApplyItem}>
              아이템 착용하기
            </OrangeButton>
          </ButtonContainer>
        </>
      )}

      {currentStep === "itemApplied" && (
        <>
          <SubTitle>
            모은 포인트로
            <br />
            루미를 꾸밀 아이템을 구매해보세요
          </SubTitle>
          <RoomieContainer>모델링 - {roomie}</RoomieContainer>
          <ButtonContainer>
            <OrangeButton onClick={handlePurchaseItem}>
              아이템 구매하기
            </OrangeButton>
            <OrangeButton onClick={handleBackToDefault}>
              아이템 착용 해제하기
            </OrangeButton>
          </ButtonContainer>
        </>
      )}

      {currentStep === "itemPurchased" && (
        <>
          <SubTitle>아이템을 구매했어요 !</SubTitle>
          <RoomieContainer>모델링 - {roomie}</RoomieContainer>
          <ButtonContainer>
            <RedButton onClick={handleBackToHome}>홈으로 돌아가기</RedButton>
          </ButtonContainer>
        </>
      )}
    </Layout>
  );
};

export default StorePage;

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 280px;
  width: 100vw;
  height: 300px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 130px;
  width: 230px;
  height: 160px;
  background-color: #d9d9d9;
  border-radius: 8px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 44px;
  width: 100vw;
`;
