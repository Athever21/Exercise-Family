import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser, useUserControl } from "../../../AuthProvider";
import { base_url } from "../../../utils";
import { RequestInfo } from "./styled";
import { Button } from "../../auth/styled";

const Request = () => {
  const [name, setName] = useState("");
  const { user, token } = useUser() as any;
  const { changeUser } = useUserControl() as any;

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${base_url}/api/family/${user.request}`);
      setName(res.data.name);
    })();
  }, []);

  const cancelRequest = async () => {
    const res = await axios.patch(
      `${base_url}/api/users/${user.id}`,
      { request: "" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    changeUser(res.data);
  };

  return (
    <RequestInfo>
      <p>Waiting for accept to {name} Family</p>
      <Button onClick={cancelRequest}>Cancel Request</Button>
    </RequestInfo>
  );
};

export default Request;
