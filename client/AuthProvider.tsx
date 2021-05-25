import React, { useState, useContext, useEffect } from "react";
import Loading from "./components/Loading";
import styled from "styled-components";
import { base_url } from "./utils";
import axios from "axios";

// @ts-ignore
const UserContext = React.createContext();
// @ts-ignore
const UserControlContext = React.createContext();

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`;

export const useUser = () => useContext(UserContext);
export const useUserControl = () => useContext(UserControlContext);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(`${base_url}/api/auth/login`, {
        username,
        password,
      });

      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      return err.response.data;
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post(`${base_url}/api/auth/refresh`);
      setToken(res.data.token);
      setUser(res.data.user);
    } catch {
      setToken("");
      setUser({});
      console.clear();
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await axios.post(`${base_url}/api/auth/logout`);
    setUser({});
    setToken("");
  };

  const addFamilyToUser = (family: any) => setUser((u) => ({ ...u, family }));

  useEffect(() => {
    refreshToken();
    setInterval(() => {
      refreshToken();
    }, 300000);
  }, []);

  if (loading)
    return (
      <Container>
        <Loading />
      </Container>
    );

  return (
    <UserContext.Provider value={{ user, token }}>
      <UserControlContext.Provider value={{ login, logout, addFamilyToUser }}>
        {...children}
      </UserControlContext.Provider>
    </UserContext.Provider>
  );
};
