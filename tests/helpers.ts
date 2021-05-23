export const createUser = async (
  api: any,
  username?: string,
  password?: string,
  name?: string
) => {
  const res = await api
    .post("/api/users")
    .send({ username, password, name })
    .trustLocalhost();
  return res;
};

export const loginUser = async (
  api: any,
  username?: string,
  password?: string
) => {
  const res = await api
    .post("/api/auth/login")
    .send({ username, password })
    .trustLocalhost();
  const refreshToken =
    res.status !== 200 ? null : res.headers["set-cookie"][0].split(";")[0];

  return { res, refreshToken };
};

export const changeUser = async (
  api: any,
  id: string,
  token: string,
  fields: any
) => {
  const res = await api
    .patch(`/api/users/${id}`)
    .send({token,...fields})
    .trustLocalhost();
  return res;
};