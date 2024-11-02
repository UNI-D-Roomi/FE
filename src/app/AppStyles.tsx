import { Global, css } from "@emotion/react";

const Styles = css`
  * {
    font-family: "Pretendard", "sans-seri";
  }
`;

const AppStyles = () => <Global styles={Styles}></Global>;

export default AppStyles;
