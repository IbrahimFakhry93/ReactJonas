import styled, { css } from "styled-components";

// const test = css`
//   text-align: center;
// `;

// const Heading = styled.h1`
//   font-size: 30px;
//   /* font-size: ${(props) => (props.large ? "30px" : "5px")}; */
//   font-weight: 600;
//   background-color: yellow;
//   ${test}
// `;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  line-height:1.4
`;

export default Heading;