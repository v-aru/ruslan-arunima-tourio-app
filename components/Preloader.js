import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Preloader = styled.div`
  display: block;
  width: 50px;
  height: 50px;
  position: fixed;
  left: 50%;
  top: 50vh;
  margin-left: -40px;
  margin-top: -40px;
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    border-left: 6px solid #000;
    border-top: 6px solid #000;
    border-right: 6px solid rgba(0, 0, 0, 0);
    border-bottom: 6px solid rgba(0, 0, 0, 0);
    animation: ${rotate} 0.3s linear infinite;
  }
`;
