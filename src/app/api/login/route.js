import { NextResponse } from "next/server";
import { LoginSchema } from "../../../../lib/schemas/authSchema";
import prisma from "../../../../lib/prisma/prisma";
import bcrypt from "bcrypt";
import { signJwt } from "../../../../lib/jwt/jwt";

export async function POST(req) {
  const body = await req.json();
  const parse = LoginSchema.safeParse(body);

  if (!parse.success) {
    const fieldErrors = {};

    parse.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(issue.message);
    });

    return NextResponse.json({ error: fieldErrors }, { status: 400 });
  }

  const { email, password } = parse.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return NextResponse.json(
      { error: { email: ["Usuário não encontrado"] } },
      { status: 401 }
    );
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json({ message: "Senha incorreta!" }, { status: 401 });
  }

  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  const token = signJwt(payload);

  const res = NextResponse.json({
    message: "Login realizado!",
    email: user.email,
    username: user.username,
  });

  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60, // 1 dia em segundos
    path: "/",
  });

  return res;
}
