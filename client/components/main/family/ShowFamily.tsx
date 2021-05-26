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
  ExpensesHistory,
  Members,
  AcceptMembers,
  Table,
} from "./styled";
import { Hr, Input, Button, FieldError } from "../../auth/styled";
import Loading from "../../Loading";

const ShowFamily = ({ id }: { id: string }) => {
  const [family, setFamily] = useState({} as any);
  const { token, user } = useUser() as any;
  const { addFamilyToUser } = useUserControl() as any;
  const expenseFunds = useField("number");
  const [expenseError, setExpenseError] = useState("");
  const [loading, setLoading] = useState(true);
  const [requests, setRequest] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${base_url}/api/family/${id}`);
      setFamily(res.data);
      setLoading(false);

      const { data } = await axios.post(`${base_url}/api/family/requests`, {
        id,
      });
      setRequest(data);
    })();
  }, []);

  const deleteFamily = async () => {
    await axios.delete(`${base_url}/api/family/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    addFamilyToUser("");
  };

  const addToFamily = async (userId: string) => {
    const res = await axios.patch(
      `${base_url}/api/family/${id}`,
      { action: "ADD_MEMBER", member: userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setFamily(res.data);
    setRequest((r: any) => r.filter((x: any) => x.id !== userId));
  };

  const reject = async (userId: string) => {
    await axios.post(
      `${base_url}/api/family/requests/reject`,
      { id: userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setRequest((r: any) => r.filter((x: any) => x.id !== userId));
  };

  const addExpense = async () => {
    setExpenseError("");
    if (!expenseFunds.value)
      return setExpenseError("Funds field cannot be empty");
    if (parseInt(expenseFunds.value) < 0)
      return setExpenseError("Funds field must be positive");

    try {
      const res = await axios.patch(
        `${base_url}/api/family/${id}`,
        { action: "REMOVE_FUNDS", funds: parseInt(expenseFunds.value) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      expenseFunds.value = "";
      setFamily((f: any) => ({
        ...f,
        fundsHistory: [...res.data.fundsHistory],
        funds: parseInt(res.data.funds),
      }));
    } catch (err) {
      setExpenseError(err.response.data.error);
      setTimeout(() => setExpenseError(""), 5000);
    }
  };

  if (loading) return <Loading />;

  return (
    <FamilyContainer>
      <FamilyHeader>
        <h2>{family.name} Family</h2>
        {user.id === family.createdBy && (
          <DeleteFamily onClick={deleteFamily}>Delete family</DeleteFamily>
        )}
      </FamilyHeader>
      <Hr />
      {/* @ts-ignore */}
      <FundsSection>
        <Funds>
          <h3>Family Funds:</h3>
          <p>{family.funds}</p>
        </Funds>
        {user.family === family.id && (
          <AddExpense>
            {expenseError && <FieldError>{expenseError}</FieldError>}
            <h3>Add Expense</h3>
            <Input {...expenseFunds} placeholder="Expense Funds" />
            <Button onClick={addExpense}>Submit</Button>
          </AddExpense>
        )}
      </FundsSection>
      <Hr />
      <ExpensesHistory>
        <h2>Funds History</h2>
        {family.fundsHistory.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Action Name</th>
                <th>User Name</th>
                <th>Funds</th>
              </tr>
            </thead>
            <tbody>
              {family.fundsHistory.map((x: any) => (
                <tr key={x._id}>
                  <th>
                    {x.action_name === "add" ? "Added Funds" : "Removed Funds"}
                  </th>
                  <th>{x.member.name}</th>
                  <th>
                    {x.action_name === "add" ? "+" : "-"}
                    {x.funds}
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="empty">History Empty</p>
        )}
      </ExpensesHistory>
      <Hr />
      <Members>
        <h2>Members</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {family.members.map((x: any) => (
              <tr key={x.id}>
                <th>{x.name}</th>
                <th>{family.createdBy === x.id ? "Owner" : "Member"}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Members>
      {user.id === family.createdBy && (
        <>
          <Hr />
          <AcceptMembers>
            <h2>Members Requests</h2>
            {requests.map((x: any) => (
              <div key={x.id} className="add-member">
                <p>{x.name}</p>
                <div className="buttons">
                  <Button onClick={() => addToFamily(x.id)}>Accept</Button>
                  <Button onClick={() => reject(x.id)} className="reject">Reject</Button>
                </div>
              </div>
            ))}
          </AcceptMembers>
        </>
      )}
    </FamilyContainer>
  );
};

export default ShowFamily;
