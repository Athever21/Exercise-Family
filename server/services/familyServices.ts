import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/Error";
import jwt from "jsonwebtoken";
import Family, { IFamily } from "../models/Family";
import User, { IUser } from "../models/User";

interface FamilyRequest extends Request {
  family: IFamily;
  user: IUser;
  token: string;
}

export const getFamilies = async (_: Request, res: Response) => {
  const families = await Family.find({});
  return res.json(families);
};

export const createFamily = async (req: FamilyRequest, res: Response) => {
  if (!req.token) throw new CustomError(401, "Unauthorized");

  const { id } = jwt.verify(req.token, process.env.ACCESS_SECRET as string) as {
    id: string;
  };

  const family = new Family({
    ...req.body,
    createdBy: id,
    members: [id],
  });
  const user = (await User.findById(id)) as IUser;
  user.family = family._id;
  await user.save();
  await family.save();

  return res.json(family);
};

export const familyMiddleware = async (
  req: FamilyRequest,
  _: Response,
  next: NextFunction
) => {
  const family = await Family.findById(req.params.id);
  if (!family) throw new CustomError(400, "Family not found");
  req.family = family;

  if (req.method === "GET") return next();

  if (!req.token) throw new CustomError(401, "Unauthorized");

  const { id } = jwt.verify(req.token, process.env.ACCESS_SECRET as string) as {
    id: string;
  };
  req.user = (await User.findById(id)) as IUser;

  if (!family.members.includes(req.user._id) && req.user.role !== "Admin")
    throw new CustomError(403, "Forbidden");
  return next();
};

export const getFamily = async (req: FamilyRequest, res: Response) => {
  return res.json(req.family);
};

export const patchFamily = async (req: FamilyRequest, res: Response) => {
  switch (req.body.action) {
    case "CHANGE_NAME": {
      if (req.user._id !== req.family.createdBy)
        throw new CustomError(403, "Forbidden");
      req.family.name = req.body.name;
      break;
    }
    case "ADD_MEMBER": {
      const user = (await User.findById(req.body.member)) as IUser;
      if (!user || req.family.members.includes(req.body.member))
        throw new CustomError(400, "Member not found or already added");
      req.family.members = [req.body.member, ...req.family.members];
      user.family = req.family._id;
      await user.save();
      break;
    }
    case "REMOVE_MEMBER": {
      if (req.user._id !== req.family.createdBy) {
        throw new CustomError(403, "Forbidden");
      }

      req.family.members = (req.family.members as string[]).filter(
        (x: string) => x !== req.body.member
      );
      break;
    }
    case "REMOVE_FUNDS": {
      if (req.body.funds > req.family.funds)
        throw new CustomError(400, "Not sufficient funds");
      req.family.funds = req.family.funds - req.body.funds;
      req.family.fundsHistory = [
        {
          action_name: "remove_funds",
          member: req.user._id,
          funds: req.body.funds,
        },
        ...req.family.fundsHistory,
      ];
      break;
    }
    case "ADD_FUNDS": {
      if (req.user.role !== "Admin") throw new CustomError(403, "Forbidden");
      req.family.funds = req.family.funds + req.body.funds;
      req.family.fundsHistory = [
        {
          action_name: "add",
          member: req.user._id,
          funds: req.body.funds,
        },
        ...req.family.fundsHistory,
      ];
      break;
    }
  }

  await req.family.save();
  return res.json(req.family);
};

export const deleteFamily = async (req: FamilyRequest, res: Response) => {
  if (req.family.createdBy !== req.user._id)
    throw new CustomError(403, "Forbidden");
  const members = await User.find({ family: req.family._id });
  for (const user of members) {
    user.family = "";
    await user.save();
  }
  console.log(req.family, "SADFDSFGDS")
  await Family.findByIdAndDelete(req.family._id);
  return res.json("deleted");
};
