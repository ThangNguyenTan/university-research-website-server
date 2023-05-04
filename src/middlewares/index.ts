import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.header("X-Access-Token")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Missing Token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as unknown as CustomRequest).token = decoded;

    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
