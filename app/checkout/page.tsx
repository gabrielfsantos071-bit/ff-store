"use client";

import Header from "../../components/Header";
import { useCart } from "../../components/CartContext";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function Checkout() {
  const { items, subtotal } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [playerId, setPlayerId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [pixCode, setPixCode] = useState("");
  const [pixImage, setPixImage] = useState("");
  const [transactionId, setTransactionId] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (items.length === 0) {
        throw new Error("Seu carrinho está vazio.");
      }

      const response = await fetch(
        "/api/sigilopay/create-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(subtotal.toFixed(2)),
            identifier: `FF-${Date.now()}`,
          }),
        }
      );

      const data = await response.json();

      console.log("Resposta do PIX:", data);

      if (!response.ok) {
        throw new Error(
          data?.details?.message ||
            data?.error ||
            "Não foi possível criar o PIX."
        );
      }

      if (!data?.pix?.code) {
        throw new Error(
          "A SigiloPay não retornou o código PIX."
        );
      }

      setPixCode(data.pix.code);
      setPixImage(data.pix.image || "");
      setTransactionId(data.transactionId || "");

    } catch (error) {
      console.error("Erro ao criar PIX:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao criar o pagamento."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(pixCode);
      alert("Código PIX copiado!");
    } catch {
      setError(
        "Não foi possível copiar automaticamente. Copie o código manualmente."
      );
    }
  }

  /*
   * TELA APÓS GERAR O PIX
   */
  if (pixCode) {
    return (
      <>
        <Header />

        <main className="checkout-page">

          <div className="section-title">
            <div>
              <small>PAGAMENTO</small>
              <h2>Seu PIX foi gerado</h2>
            </div>
          </div>

          <div className="checkout-grid">

            <div className="form">

              <h3
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                }}
              >
                Pagamento via PIX
              </h3>

              <p
                style={{
                  textAlign: "center",
                  opacity: 0.7,
                  marginTop: "8px",
                }}
              >
                Escaneie o QR Code com o aplicativo do seu banco
              </p>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "13px",
                    opacity: 0.6,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Valor a pagar
                </span>

                <strong
                  style={{
                    display: "block",
                    fontSize: "36px",
                    marginTop: "4px",
                  }}
                >
                  R$ {subtotal.toFixed(2).replace(".", ",")}
                </strong>
              </div>

              {/* QR CODE */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "24px 0",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    padding: "16px",
                    borderRadius: "16px",
                    display: "inline-flex",
                    boxShadow:
                      "0 0 30px rgba(139, 92, 246, 0.25)",
                  }}
                >
                  <QRCodeSVG
                    value={pixCode}
                    size={260}
                    level="M"
                  />
                </div>
              </div>

              <h3 style={{ marginTop: "28px" }}>
                Ou copie o código PIX
              </h3>

              <textarea
                value={pixCode}
                readOnly
                rows={5}
                style={{
                  width: "100%",
                  marginTop: "12px",
                  padding: "12px",
                  resize: "none",
                }}
              />

              <button
                type="button"
                className="primary full"
                onClick={copyPix}
                style={{
                  marginTop: "12px",
                }}
              >
                Copiar código PIX
              </button>

              {/* STATUS */}

              <div
                style={{
                  marginTop: "24px",
                  padding: "14px",
                  borderRadius: "12px",
                  background:
                    "rgba(139, 92, 246, 0.10)",
                  border:
                    "1px solid rgba(139, 92, 246, 0.25)",
                  textAlign: "center",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  🟣 Aguardando pagamento
                </strong>

                <span
                  style={{
                    opacity: 0.7,
                    fontSize: "14px",
                  }}
                >
                  Assim que o pagamento for confirmado,
                  seu pedido será processado.
                </span>
              </div>

              {/* ID DA TRANSAÇÃO */}

              {transactionId && (
                <p
                  style={{
                    marginTop: "12px",
                    opacity: 0.5,
                    textAlign: "center",
                    fontSize: "13px",
                  }}
                >
                  Transação: {transactionId}
                </p>
              )}

            </div>

            {/* RESUMO DO PEDIDO */}

            <aside className="summary">

              <h3
                style={{
                  fontSize: "20px",
                  marginBottom: "20px",
                }}
              >
                Resumo do pedido
              </h3>

              {items.map((item: any) => (
                <div
                  className="line"
                  key={item.id}
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>

                  <b>
                    R${" "}
                    {(item.price * item.qty)
                      .toFixed(2)
                      .replace(".", ",")}
                  </b>
                </div>
              ))}

              {/* FORMA DE PAGAMENTO */}

              <div
                style={{
                  marginTop: "18px",
                  padding: "12px 0",
                  borderTop:
                    "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  style={{
                    opacity: 0.6,
                    fontSize: "13px",
                  }}
                >
                  Pagamento
                </span>

                <strong
                  style={{
                    display: "block",
                    marginTop: "4px",
                    fontSize: "15px",
                  }}
                >
                  PIX
                </strong>
              </div>

              <hr />

              <div className="total">

                <span>Total</span>

                <b>
                  R${" "}
                  {subtotal
                    .toFixed(2)
                    .replace(".", ",")}
                </b>

              </div>

            </aside>

          </div>

        </main>
      </>
    );
  }

  /*
   * CHECKOUT ANTES DE GERAR O PIX
   */

  return (
    <>
      <Header />

      <main className="checkout-page">

        <div className="section-title">
          <div>
            <small>FINALIZAÇÃO</small>
            <h2>Checkout</h2>
          </div>
        </div>

        <div className="checkout-grid">

          <form
            className="form"
            onSubmit={handleSubmit}
          >

            <label>
              Nome

              <input
                required
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Seu nome"
              />
            </label>

            <label>
              WhatsApp

              <input
                required
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="(00) 00000-0000"
              />
            </label>

            <label>
              ID do jogador

              <input
                required
                value={playerId}
                onChange={(event) =>
                  setPlayerId(event.target.value)
                }
                placeholder="Digite o ID do jogador"
              />
            </label>

            {error && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#3a1010",
                  color: "#ff8f8f",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="primary full"
              disabled={loading}
            >
              {loading
                ? "Gerando PIX..."
                : "Gerar PIX"}
            </button>

          </form>

          {/* RESUMO ANTES DO PAGAMENTO */}

          <aside className="summary">

            <h3>Seu pedido</h3>

            {items.map((item: any) => (
              <div
                className="line"
                key={item.id}
              >
                <span>
                  {item.name} × {item.qty}
                </span>

                <b>
                  R${" "}
                  {(item.price * item.qty)
                    .toFixed(2)
                    .replace(".", ",")}
                </b>
              </div>
            ))}

            <hr />

            <div className="total">

              <span>Total</span>

              <b>
                R${" "}
                {subtotal
                  .toFixed(2)
                  .replace(".", ",")}
              </b>

            </div>

          </aside>

        </div>

      </main>
    </>
  );
}