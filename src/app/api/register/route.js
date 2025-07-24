import { NextResponse } from "next/server";
import { RegisterSchema } from "../../../../lib/schemas/authSchema";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma/prisma";

export async function POST(req) {
  const body = await req.json();
  const parse = RegisterSchema.safeParse(body);
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

  const { email, username, password } = parse.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  //Validações
  const emailExists = await prisma.user.findUnique({
    where: { email },
  });
  if (emailExists) {
    return NextResponse.json(
      { error: "E-mail já cadastrado." },
      { status: 409 }
    );
  }

  const usernameExists = await prisma.user.findUnique({
    where: { username },
  });
  if (usernameExists) {
    return NextResponse.json(
      { error: "Username já cadastrado." },
      { status: 409 }
    );
  }

  const user = await prisma.user.create({
    data: { email, username, password: String(hashedPassword) },
  });

  return NextResponse.json(
    { message: "Usuário criado com sucesso!", email: user.email },
    { status: 201 }
  );
}
