import React from "react";
import { useUser } from "../../AuthProvider";
import { Container } from "./family/styled";

import CreateFamily from "./family/CreateFamily";
import ShowFamily from "./family/ShowFamily";
import Request from "./family/Request";
import JoinFamily from "./family/JoinFamily";

const Home = () => {
  const { user } = useUser() as any;

  return (
    <main>
      {user.family ? (
        <ShowFamily id={user.family} />
      ) : (
        <>
          {user.request ? (
            <Request />
          ) : (
            <Container>
              <CreateFamily />
              <JoinFamily />
            </Container>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
