import React from "react";
import {hot} from "react-hot-loader";
import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const H1 = styled.h1`
  font-size: 7rem;
  color: var(--main);
`

const App = () => {
  return(
    <Div>
      <H1>Hello World!</H1>
    </Div>
  )
}

export default hot(module)(App);