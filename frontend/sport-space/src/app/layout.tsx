import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "@/app/scss/main.scss"
import { CartProvider } from "./context/CartContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
