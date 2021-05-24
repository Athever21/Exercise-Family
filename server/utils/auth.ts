import {NextFunction, Request, Response} from "express";

interface AuthRequest extends Request {
  token: string;
}

export default (req: AuthRequest, _: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if(auth) {
    if(auth.startsWith("Bearer")) {
      req.token = auth.substring(7);
    }
  }

  next();
}