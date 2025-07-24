import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma/prisma';
import {
  DeletedSchema,
  UpdatedSchema,
} from '../../../../lib/schemas/authSchema';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error('ERRO NO GET USERS:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const parse = UpdatedSchema.safeParse(body);
    if (!parse.success) {
      const fieldErrors = {};

      parse.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(issue.message);
      });
      return NextResponse.json({ error: fieldErrors }, { status: 500 });
    }
    const { id, email, username, password } = parse.data;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, username, password },
    });

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário:' + err.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const parse = DeletedSchema.safeParse(body);
    if (!parse.success) {
      const fieldErrors = {};

      parse.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(issue.message);
      });
      return NextResponse.json({ error: fieldErrors }, { status: 500 });
    }
    const { email } = parse.data;
    await prisma.user.delete({
      where: { email },
    });

    return NextResponse.json({ message: 'Usuário deletado!' }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao deletar usuário: ' + err.message },
      { status: 500 },
    );
  }
}
