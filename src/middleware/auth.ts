import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
//role based authentication

const protectedRoute = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "forbidden access",
        });
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
