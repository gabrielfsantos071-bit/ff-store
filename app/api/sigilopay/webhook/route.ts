import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("========== WEBHOOK SIGILOPAY ==========");
    console.log("Dados recebidos:", body);
    console.log("========================================");

    return NextResponse.json({
      success: true,
      message: "Webhook recebido com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao processar webhook:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro ao processar webhook.",
      },
      { status: 400 }
    );
  }
}