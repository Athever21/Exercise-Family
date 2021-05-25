import React, {useState} from "react";
import { useField, base_url } from "../../../utils";
import { useUser, useUserControl } from "../../../AuthProvider";
import axios from "axios";
import { CreateContainer, CreateInput, CreateButton, Error } from "../styled";

const CreateFamily = () => {
  const name = useField("text");
  const { token } = useUser() as any;
  const { addFamilyToUser } = useUserControl() as any;
  const [error, setError] = useState("");

  const createFamily = async () => {
    if (!name.value) return;

    try {
      const res = await axios.post(
        `${base_url}/api/family`,
        { name: name.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

        addFamilyToUser(res.data.id);
    } catch(err) {
      setError(err.response.data);
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <CreateContainer>
      {error && <Error>{error}</Error>}
      <CreateInput>
        <h2>Create Family</h2>
        <input {...name} placeholder="Family name..." />
        <CreateButton onClick={createFamily}>Create</CreateButton>
      </CreateInput>
    </CreateContainer>
  );
};

export default CreateFamily;
