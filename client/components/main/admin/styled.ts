import styled from "styled-components";

export const Admin = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 4rem;
    color: var(--main);
  }

  .add {
    padding: 1rem 0.5rem;
    width: 60%;
    margin: 1rem 0;
    border: 2px solid var(--change);
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .family-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 2px solid var(--main);

    h3 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.5rem;
    }
  }

  .add-input {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 1rem;

    h3 {
      font-size: 2rem;
    }
  }

  @media (max-width: 1100px) {
    .add {
      width: 90%;
    }
  }

  @media (max-width: 730px) {
    .add {
      grid-template-columns: 1fr;
    }

    .family-name {
      border-right: 0;
      border-bottom: 2px solid var(--main);
      padding-bottom: 0.5rem;
    }

    h2 {
      font-size: 3rem;
    }
  }

  @media (max-width: 557px) {
    h2 {
      font-size: 2.5rem;
    }
  }
`