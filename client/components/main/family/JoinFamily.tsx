import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../../../utils";
import { Join, Info } from "./styled";
import { Button } from "../../auth/styled";
import { useUser, useUserControl } from "../../../AuthProvider";

const JoinFamily = () => {
  const { token, user } = useUser() as any;
  const { changeUser } = useUserControl() as any;
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${base_url}/api/family`);
      setFamilies(res.data);
    })();
  }, []);

  const addRequest = async (id: string) => {
    const res = await axios.patch(
      `${base_url}/api/users/${user.id}`,
      { request: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    changeUser(res.data);
  };

  if (!families.length) return <></>;

  return (
    <Join>
      <h2>Or Join</h2>
      {families.map((x: any) => (
        <div key={x.id}>
          <h3>{x.name} Family</h3>
          <Info>
            <h4>Created By: </h4>
            <p>{x.createdBy.name}</p>
          </Info>
          <Button onClick={() => addRequest(x.id)}>Join</Button>
        </div>
      ))}
    </Join>
  );
};

export default JoinFamily;
