import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "@/app/scss/main.scss"
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ProductProvider>
          <Header />
          {children}
          <Footer />
          </ProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}
