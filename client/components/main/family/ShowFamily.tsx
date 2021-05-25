import React, { useState, useEffect } from "react";
import { useUser, useUserControl } from "../../../AuthProvider";
import { base_url, useField } from "../../../utils";
import axios from "axios";
import {
  FamilyHeader,
  FamilyContainer,
  DeleteFamily,
  Funds,
  FundsSection,
  AddExpense,
} from "../styled";
import { Hr, Input, Button } from "../../auth/styled";

const ShowFamily = ({ id }: { id: string }) => {
  const [family, setFamily] = useState({} as any);
  const { token, user } = useUser() as any;
  const { addFamilyToUser } = useUserControl() as any;
  const expenseName = useField("text");
  const expenseFunds = useField("number");

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${base_url}/api/family/${id}`);
      setFamily(res.data);
    })();
  }, []);

  const deleteFamily = async () => {
    await axios.delete(`${base_url}/api/family/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    addFamilyToUser("");
  };

  return (
    <FamilyContainer>
      <FamilyHeader>
        <h2>{family.name}</h2>
        {user.id === family.createdBy && (
          <DeleteFamily onClick={deleteFamily}>Delete family</DeleteFamily>
        )}
      </FamilyHeader>
      <Hr />
      <FundsSection>
        <Funds>
          <h3>Family Funds:</h3>
          <p>{family.funds}</p>
        </Funds>
        {user.family === family.id && 
        <AddExpense>
          <h3>Add Expense</h3>
          <Input {...expenseName} placeholder="Expense Name"/>
          <Input {...expenseFunds} placeholder="Expense Funds"/>
          <Button>Submit</Button>
        </AddExpense>}
      </FundsSection>
      <Hr />
    </FamilyContainer>
  );
};

export default ShowFamily;
