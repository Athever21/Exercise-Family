import React from "react";
import { HeaderStyle, Title, Logout, Left, Hello } from "./styled";
import { useUser, useUserControl } from "../../AuthProvider";

const Header = () => {
  const { user } = useUser() as any;
  const { logout } = useUserControl() as any;

  return (
    <HeaderStyle>
      <Title>Family Funds</Title>
      <Left>
        <Hello>Hi, {user.name}!</Hello>
        <Logout onClick={logout}>Sign out</Logout>
      </Left>
    </HeaderStyle>
  );
};

export default Header;
