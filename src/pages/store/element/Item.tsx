import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@/configs";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { ItemProps } from "../dto";

const Item = (item: ItemProps) => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setImage(item.image);
    setPrice(item.price);
  }, [item]);

  return (
    <ItemContainer>
      <Image>{image}</Image>
      <Price>
        <StyledMonetizationOnIcon />
        <span>{price}</span>
      </Price>
    </ItemContainer>
  );
};

export default Item;

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 140px;
  width: 140px;
  background-color: ${colors.white};
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: ${colors.black};
  top: 0;
  width: 110px;
  height: 110px;
`;

const StyledMonetizationOnIcon = styled(MonetizationOnIcon)`
  color: ${colors.black};
  font-size: 20px;
  margin-right: 4px;
  vertical-align: middle;
`;

const Price = styled.div`
  display: flex;
  color: ${colors.black};
  position: absolute;
  bottom: 6px;
  align-items: center;
  justify-content: center;

  span {
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    letter-spacing: -0.02em;
    padding-top: 3.5px;
  }
`;
