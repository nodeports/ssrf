import { Request, Response, NextFunction } from "express";
import { URL } from "url";

export const ssrfProtection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url } = req.body;
  try {
    const parsedUrl = new URL(url);
    if (
      parsedUrl.hostname === "localhost" ||
      /^127\.\d+\.\d+\.\d+$/.test(parsedUrl.hostname)
    ) {
      return res.status(400).send("Invalid URL");
    }
    next();
  } catch (err) {
    res.status(400).send("Invalid URL");
  }
};
