import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "@/app/scss/main.scss"

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <Header/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}
