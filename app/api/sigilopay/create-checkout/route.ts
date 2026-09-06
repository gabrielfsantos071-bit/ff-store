import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { amount, identifier } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          error: "Valor do pagamento inválido.",
        },
        { status: 400 }
      );
    }

    if (!process.env.SIGILOPAY_API_URL) {
      return NextResponse.json(
        {
          error: "SIGILOPAY_API_URL não configurada.",
        },
        { status: 500 }
      );
    }

    if (!process.env.SIGILOPAY_PUBLIC_KEY) {
      return NextResponse.json(
        {
          error: "SIGILOPAY_PUBLIC_KEY não configurada.",
        },
        { status: 500 }
      );
    }

    if (!process.env.SIGILOPAY_SECRET_KEY) {
      return NextResponse.json(
        {
          error: "SIGILOPAY_SECRET_KEY não configurada.",
        },
        { status: 500 }
      );
    }

    const transactionIdentifier =
      identifier || `FF-${Date.now()}`;

    console.log("Criando PIX na SigiloPay...");
    console.log("Valor:", amount);
    console.log("Identificador:", transactionIdentifier);

    const response = await fetch(
      `${process.env.SIGILOPAY_API_URL}/gateway/pix/deposit`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-public-key": process.env.SIGILOPAY_PUBLIC_KEY,
          "x-secret-key": process.env.SIGILOPAY_SECRET_KEY,
        },

        body: JSON.stringify({
  amount: Number(amount),
  identifier: transactionIdentifier,
  callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/sigilopay/webhook`,
}),
      }
    );

    const responseText = await response.text();

    let data: any;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = {
        rawResponse: responseText,
      };
    }

    console.log("Status SigiloPay:", response.status);
    console.log("Resposta SigiloPay:", data);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "SigiloPay recusou a criação do PIX.",
          status: response.status,
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("ERRO PIX SIGILOPAY:", error);

    return NextResponse.json(
      {
        error: "Erro interno ao criar o PIX.",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}