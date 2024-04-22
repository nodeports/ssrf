import { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send("User registered");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const fetchData = async (req: Request, res: Response) => {
  const { url } = req.body;
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
};
