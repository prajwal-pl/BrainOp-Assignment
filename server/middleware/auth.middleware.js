import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await prisma.user.findUnique({
        where: {
          id: data.id,
        },
      });
      if (user) return res.json({ status: true, user: username });
      else return res.json({ status: false });
    }
  });
};
