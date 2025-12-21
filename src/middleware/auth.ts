import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
//role based authentication

const protectedRoute = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "Authorization Header is missing",
        });
      }

      // extracting token from bearer

      const token = authHeader.split(" ")[1];


      if(!token){
        return res.status(401).json({
          success: false,
          message: "Unauthorized"
        })
      }

      const decoded = jwt.verify(
        token as string,
        config.jwtSecret as string
      ) as JwtPayload;
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(401).json({
          success: false,
          message: "forbidden access",
        });
      }
      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
        details: err,
      });
    }
  };
};

export default protectedRoute;
