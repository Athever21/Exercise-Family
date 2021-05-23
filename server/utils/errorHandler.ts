import { Request, Response, NextFunction } from "express";
import CustomError from "./Error";

export default (
  err: CustomError,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  // console.log(err.name + " ----- ERROR ------" + err);
  if(err.name === "ValidationError") res.status(400).json({ error: err.message });
  if(err.name === "JsonWebTokenError") res.status(403).json({ error: "Invalid token" });
  return res.status(err.code || 500).json({ error: err.message });
};
