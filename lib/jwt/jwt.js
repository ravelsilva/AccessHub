import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

function signJwt(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "10s" });
}

function verifyJwt(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; // Token inválido ou expirado
  }
}

export { signJwt, verifyJwt };
