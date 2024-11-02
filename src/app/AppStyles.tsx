import { colors } from "@/configs";
import { Global, css } from "@emotion/react";
import emotionReset from "emotion-reset";

const Styles = css`
  ${emotionReset}

  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }

  * {
    font-family: "Pretendard-Regular", sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  form,
  label,
  table {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1rem;
    vertical-align: baseline;
  }

  body {
    line-height: 1;
    font-family: "Pretendard Variable", "Gmarket Sans", sans-serif;
    background-color: #ffffff;
  }

  ol,
  ul {
    list-style: none;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;

const AppStyles = () => <Global styles={Styles}></Global>;

export default AppStyles;
