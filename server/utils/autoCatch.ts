import { Request, Response, NextFunction } from "express";

export default (f: Function) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(f(req, res, next)).catch(next);
  };
};
