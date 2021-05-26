import React from "react";
import { useUser } from "../../AuthProvider";

import Header from "./Header";
import Home from "./Home";
import AdminPanel from "./admin/AdminPanel";

const Main = () => {
  const { user } = useUser() as any;

  return (
    <>
      <Header />
      {user.role === "Admin" ? <AdminPanel /> : <Home />}
    </>
  );
};

export default Main;
