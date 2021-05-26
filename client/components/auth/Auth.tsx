import React, { useState } from "react";
import { base_url, useField } from "../../utils";
import { useUserControl } from "../../AuthProvider";
import axios from "axios";
import {
  Container,
  H1,
  H2,
  Input,
  Button,
  Change,
  ChangeSpan,
  Fields,
  FieldError,
  Error,
  Hr,
} from "./styled";

const Auth = () => {
  const [loginState, setLoginState] = useState(true);
  const name = useField("name");
  const username = useField("text");
  const password = useField("password");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({} as any);
  const { login } = useUserControl() as any;

  const handleSubmit = async () => {
    setError("");
    setFieldError({});

    if (loginState) {
      const fieldErrors = {} as any;
      if (!username.value) fieldErrors.username = "This field cannot be empty";
      if (!password.value) fieldErrors.password = "This field cannot be empty";
      if (Object.keys(fieldErrors).length > 0) {
        setFieldError(fieldErrors);
      } else {
        const error = await login(username.value, password.value);
        if (error) setError(error.error);
        setTimeout(() => setError(""), 4000);
      }
    } else {
      const fieldErrors = {} as any;
      if (!name.value) fieldErrors.name = "This field cannot be empty";
      if (!username.value) fieldErrors.username = "This field cannot be empty";
      if (!password.value) fieldErrors.password = "This field cannot be empty";
      if (Object.keys(fieldErrors).length > 0) {
        setFieldError(fieldErrors);
      } else {
        try {
          await axios.post(`${base_url}/api/users`, {
            username: username.value,
            password: password.value,
            name: name.value,
          });

          name.value = "";
          username.value = "";
          password.value = "";
          setLoginState(true);
        } catch (err) {
          setError(err.response.data);
          setTimeout(() => setError(""), 4000);
        }
      }
    }
  };

  return (
    <Container>
      {error && <Error>{error}</Error>}
      <H1>Family Funds</H1>
      <Fields>
        <H2>{loginState ? "Sign In" : "Sign Up"}</H2>
        <Hr />
        {!loginState && (
          <>
            <Input {...name} placeholder="Name..." />
            {fieldError.name && <FieldError>{fieldError.name}</FieldError>}
          </>
        )}
        <Input {...username} placeholder="Username..." />
        {fieldError.username && <FieldError>{fieldError.username}</FieldError>}
        <Input {...password} placeholder="Password..." />
        {fieldError.password && <FieldError>{fieldError.password}</FieldError>}
        <Button onClick={handleSubmit}>
          {loginState ? "Login" : "Register"}
        </Button>
        <Change>
          {loginState ? "Not having account?" : "Already have account?"}
          <ChangeSpan onClick={() => setLoginState((l) => !l)}>
            {loginState ? "Register" : "Login"}
          </ChangeSpan>
        </Change>
      </Fields>
    </Container>
  );
};

export default Auth;
