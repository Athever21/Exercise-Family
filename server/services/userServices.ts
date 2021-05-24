import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import CustomError from "../utils/Error";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Family, { IFamily } from "../models/Family";

interface UserRequest extends Request {
  user: IUser;
  token: string;
}

export const getAllUsers = async (_: any, res: Response) => {
  const users = await User.find({});
  return res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, name, role } = req.body;

  if (!username || !password || !name) {
    throw new CustomError(400, "Fields cannot be empty.");
  }

  const newUser = await User.createUser({ username, password, name, role });

  return res.json(newUser);
};

export const userMiddleware = async (
  req: UserRequest,
  _: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) throw new CustomError(400, "User not found");
  req.user = user;
  if (req.method === "GET") next();

  if (!req.token) throw new CustomError(401, "Unauthorized");

  const payload = jwt.verify(
    req.token,
    process.env.ACCESS_SECRET as string
  ) as {
    id: string;
  };

  if (user.id !== payload.id) throw new CustomError(403, "Forbidden");
  next();
};

export const getUser = async (req: UserRequest, res: Response) => {
  return res.json(req.user);
};

export const patchUser = async (req: UserRequest, res: Response) => {
  for (const key of Object.keys(req.body)) {
    if (req.user[key as keyof IUser]) {
      // @ts-ignore
      req.user[key] = req.body[key];
    }
  }
  if (req.body.password) {
    req.user.password = await argon2.hash(req.body.password);
  }
  await req.user.save();
  return res.json(req.user);
};

export const deleteUser = async (req: UserRequest, res: Response) => {
  await User.findByIdAndDelete(req.user.id);
  if (req.user.family) {
    const family = (await Family.findById(req.user.family)) as IFamily;
    if (req.user._id === family.createdBy) {
      for (const id of family.members) {
        const user = (await User.findById(id)) as IUser;
        user.family = "";
        await user.save();
      }
    } else {
      family.members = (family.members as string[]).filter(
        (x: string) => x !== req.user._id
      ) as string[];
    }
  }
  return res.json("deleted");
};
