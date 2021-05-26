import styled from "styled-components";

export const HeaderStyle = styled.header`
  width: 100%;
  background: var(--header);
  display: flex;
  align-items: baseline;
  padding: 0.5rem 1rem;
`;

export const Title = styled.h1`
  font-family: 2.5rem;
  color: var(--title);
  margin-bottom: 0.5rem;
`;

export const Logout = styled.button`
  padding: 0.3rem 0.6rem;
  font-size: 1.1rem;
  background: var(--error);
  border: 1px solid var(--errorBorder);
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background: var(--errorHover);
  }
`;
export const Left = styled.div`
  margin-left: auto;
  display: flex;
  align-items: baseline;
`;

export const Hello = styled.p`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;