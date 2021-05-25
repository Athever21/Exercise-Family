import styled from "styled-components";

const input = `
  padding: 0.5rem;
  margin: 0.5rem;
  font-size: 1.2rem;
  background: var(--input);
  border: 1px solid #000;
`;

export const Container = styled.div`
  width: 60%;
  margin: 1rem auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const H1 = styled.h1`
  color: var(--main);
  font-size: 4rem;
`;

export const H2 = styled.h2`
  color: #99B2DD;
  font-size: 3rem;
  text-align: center;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #214214;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background: var(--fields);
`;

export const Input = styled.input`
  ${input}
`;

export const Button = styled.button`
  ${input}
  background: var(--submit);
  border: 1px solid #--submitBorder;

  &:hover {
    cursor: pointer;
    background: var(--submitHover);
  }
`;

export const Change = styled.p`
  padding: 0.5rem;
  margin: 0.5rem;
  font-size: 1.2rem;
`;

export const ChangeSpan = styled.span`
  color: var(--change);
  text-decoration: underline;
  margin-left: 0.5rem;

  &:hover {
    color: var(--changeHover);
    cursor: pointer;
  }
`;

export const Hr = styled.hr`
  margin: 1rem 0.5rem;
  border: 1px solid var(--main);
`

export const Error = styled.div`
  position: fixed;
  background: var(--error);
  top: 2rem;
  margin: 0 auto;
  padding: 0.5rem;
  font-size: 1.2rem;
`

export const FieldError = styled.p`
  font-size: 1.1rem;
  color: var(--error);
  margin: 0.3rem 0.5rem;
`