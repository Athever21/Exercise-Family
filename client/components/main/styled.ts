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

export const CreateContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const input = `
  padding: 0.5rem;
  font-size: 1.2rem;
  background: var(--input);
  border: 1px solid #000;
  width: 100%;
`

export const CreateInput = styled.div`
  padding: 0.5rem;
  margin: 5rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 4rem;
    color: var(--main);
  }

  input {
    ${input}
    border-bottom: none;
  }
`

export const CreateButton = styled.button`
  ${input}
  background: var(--submit);
  border: 1px solid var(--submitBorder)
  border-top: none;

  &:hover {
    cursor: pointer;
    background: var(--submitHover);
  }
`

export const Error = styled.div`
  position: fixed;
  background: var(--error);
  top: 2rem;
  margin: 0 auto;
  padding: 0.5rem;
  font-size: 1.2rem;
`

export const FamilyContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  hr {
    margin: 0.5rem 0;
  }

  h2 {
    font-size: 2.5rem;
  }
`

export const FamilyHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
`

export const DeleteFamily = styled.button`
  padding: 0.5rem;
  margin-left: auto;
  font-size: 1.1rem;
  background: var(--error);
  border: 1px solid var(--errorBorder);

  &:hover {
    cursor: pointer;
    background: var(--errorHover);
  }
`

export const FundsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const Funds = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 2px solid var(--main);

  h3 {
    font-size: 3rem;
    margin-bottom: 1rem
  }

  p {
    font-size: 2rem;
  }
`

export const AddExpense = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;

  h3 {
    text-align: center;
    font-size: 2rem;
  }
`