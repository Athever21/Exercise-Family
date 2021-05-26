import React, { useState, useEffect } from "react";
import { base_url, useField } from "../../../utils";
import axios from "axios";
import Loading from "../../Loading";
import { Admin } from "./styled";
import { Button, Input, FieldError } from "../../auth/styled";
import { useUser } from "../../../AuthProvider";

const AddFunds = ({family, changeFamily}: any) => {
  const { token } = useUser() as any;
  const amount = useField("number");
  const [error, setError] = useState("");

  const addFunds = async () => {
    try {
      const res = await axios.patch(
        `${base_url}/api/family/${family.id}`,
        { action: "ADD_FUNDS", funds: parseInt(amount.value) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        console.log(res.data);
      changeFamily(res.data);
    } catch (err) {
      setError(err.response.data);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="add">
      <div className="family-name">
        <h3>Name:</h3>
        <p>{family.name}</p>
        <h3>Current Funds:</h3>
        <p>{family.funds}</p>
      </div>
      <div className="add-input">
        {error && <FieldError>{error}</FieldError>}
        <h3>Add Funds: </h3>
        <Input {...amount} placeholder="Amount..." />
        <Button onClick={addFunds}>Add Funds</Button>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${base_url}/api/family`);
      setFamilies(res.data);
      setLoading(false);
    })();
  }, []);

  const changeFamily = (family: any) => {
    const index = families.findIndex((x: any) => x.id === family.id);
    const arr = families;
    arr[index] = family as never;

    setFamilies([...arr]);
  }

  if (loading) return <Loading />;

  return (
    <Admin>
      <h2>Add Funds To Families</h2>
      {families.map((x: any) => (
        <AddFunds key={x.id} family={x} changeFamily={changeFamily} />
      ))}
    </Admin>
  );
};

export default AdminPanel;
