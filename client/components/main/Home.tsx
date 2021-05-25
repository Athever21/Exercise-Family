import React from "react";
import {useUser} from "../../AuthProvider";

import CreateFamily from "./family/CreateFamily";
import ShowFamily from "./family/ShowFamily";

const Home = () => {
  const {user} = useUser() as any;

  return(
    <main>
      {(user.family) ? <ShowFamily id={user.family}/> : <CreateFamily />}
    </main>
  )
}

export default Home;