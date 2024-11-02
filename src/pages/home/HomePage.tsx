import styled from "@emotion/styled";

import { BlueButton, OrangeTwoButton } from "@/entities";

const HomePage = () => {
  return (
    <>
      Home
      <BlueButton>Blue</BlueButton>
      <OrangeTwoButton
        rightHandler={() => {}}
        leftHandler={() => {}}
        leftText="Left"
        rightText="Right"
      />
    </>
  );
};

export default HomePage;
