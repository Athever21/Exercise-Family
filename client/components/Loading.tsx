import React from "react";
import styled, { keyframes } from "styled-components";

const ldsRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
}
`;

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  left: 50%;
  transform: translateX(-50%);
`;

const Div = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
  animation-delay: ${(props: { delay: string }) => props.delay};
`;

const Loading = () => (
  <Container>
    <Div delay="-0.45s"></Div>
    <Div delay="-0.3s"></Div>
    <Div delay="-0.15s"></Div>
  </Container>
);

export default Loading;