import "./globals.css";
import { CartProvider } from "../components/CartContext";

export const metadata = {
  title: "FF STORE — Loja Gamer",
  description: "Loja digital gamer para produtos relacionados a Free Fire.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body><CartProvider>{children}</CartProvider></body>
    </html>
  );
}