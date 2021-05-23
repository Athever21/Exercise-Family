import { Request, Response } from "express";
import CustomError from "../utils/Error";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomError(400, "Missing username or password");
  }

  const user = await User.findOne({ username });

  if (!user) throw new CustomError(400, "User not found");
  if (!(await User.validatePassword(password, user.password as string)))
    throw new CustomError(400, "Incorrect password");

  const refresh_token = jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
  const access_token = jwt.sign(
    { id: user._id },
    process.env.ACCESS_SECRET as string,
    { expiresIn: "5m" }
  );

  res.cookie("refreshToken", refresh_token, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 604800000),
  });
  return res.json({ token: access_token, user });
};

export const refreshToken = async (req: Request, res: Response) => {
  const refresh_token = req.cookies.refreshToken;

  if (!refresh_token) throw new CustomError(401, "Unauthorized");

  const payload = jwt.verify(
    refresh_token,
    process.env.REFRESH_SECRET as string
  ) as { id: string };
  const user = (await User.findById(payload.id)) as IUser;
  const access_token = jwt.sign(
    { id: user._id },
    process.env.ACCESS_SECRET as string,
    { expiresIn: "5m" }
  );

  return res.json({ token: access_token, user });
};

export const logout = async (_: Request, res: Response) => {
  res.clearCookie("refreshToken");
  return res.send("logged out");
};
