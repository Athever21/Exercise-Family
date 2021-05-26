import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 4rem;
    text-align: center;
    color: var(--main);
  }
`;

export const Create = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const input = `
  padding: 0.5rem;
  font-size: 1.2rem;
  background: var(--input);
  border: 1px solid #000;
  width: 100%;
`;

export const CreateInput = styled.div`
  padding: 0.5rem;
  margin-top: 5rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    ${input}
    margin-top: 1rem;
    border-bottom: none;
  }

  @media (max-width: 900px) {
    width: 80%;
  }
`;

export const CreateButton = styled.button`
  ${input}
  background: var(--submit);
  border: 1px solid var(--submitBorder)
  border-top: none;

  &:hover {
    cursor: pointer;
    background: var(--submitHover);
  }
`;

export const Error = styled.div`
  position: fixed;
  background: var(--error);
  top: 2rem;
  margin: 0 auto;
  padding: 0.5rem;
  font-size: 1.2rem;
`;

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
`;

export const FamilyHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
`;

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
`;

export const FundsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Funds = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 2px solid var(--main);

  h3 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 2rem;
  }
`;

export const AddExpense = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;

  h3 {
    text-align: center;
    font-size: 2rem;
  }
`;
export const ExpensesHistory = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .empty {
    text-align: center;
    font-size: 3rem;
    margin: 1rem 0 2rem 0;
  }

  thead {
    font-size: 2rem;
  }
`;

export const Members = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  thead {
    font-size: 2.5rem;
  }

  tbody {
    font-size: 2rem;
  }
`;

export const AcceptMembers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .add-member {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem;
    background: var(--join);

    p {
      font-size: 2rem;
    }

    .buttons {
      margin-left: auto;

      .reject {
        background: var(--error);
          border: 1px solid var(--errorBorder);

          &:hover {
            background: var(--errorHover);
          }
        }
      }
    }
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-style: hidden;
  margin: 1rem 0;

  th {
    border: 2px solid var(--main);
    padding: 0.5rem 0;
  }
`;

export const Join = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-top: 1rem;
  }

  div {
    display: flex;
    width: 60%;
    align-items: center;
    padding: 0.5rem;
    font-size: 2rem;
    margin: 0.5rem 0;
    background: var(--join);

    button {
      margin: 0 0.5rem 0 auto;
    }
  }

  @media (max-width: 1310px) {
    div {
      width: 80%;
    }
  }

  @media (max-width: 710px) {
    div {
      flex-direction: column;
      justify-content: ceneter;

      button {
        margin: auto;
      }
    }
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: center;

  p {
    margin-left: 0.5rem;
  }
`;

export const RequestInfo = styled.h3`
  text-align: center;
  padding-top: 2rem;
  width: 70%;
  font-size: 2.5rem;
  margin: 0 auto;

  button {
    background: var(--error);
    border: 1px solid var(--errorBorder);

    &:hover {
      background: var(--errorHover);
    }
  }
`;
