import { NextResponse } from "next/server";
import { verifyJwt } from "../../../../lib/jwt/jwt";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Token não encontrado." },
      { status: 401 }
    );
  }
  const decoded = verifyJwt(token);
  if (!decoded) {
    return NextResponse.json(
      { message: "Token inválido ou expirado." },
      { status: 401 }
    );
  }
  return NextResponse.json({
    mesage: "Rota protegida acessada com sucesso!",
    user: decoded,
  });
}
