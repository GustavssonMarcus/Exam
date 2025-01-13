import Link from "next/link";

export default function Home() {
  return (
      <main>
        <div className="hero">
          <h1 className="hero-title">Välkommen till Sport Space</h1>
          <p className="hero-text">Din sportbutik på nätet</p>
        </div>


        <section>
          <div className="block"></div>
          <div className="content">
            <div className="content-product">
              <div className="content-product-container">
                <h1 className="content-product-container__title">Kika in vårat sortiment</h1>
                <p className="content-product-container__text">
                  Vare sig du är ute efter kläder, eller material för att kunna utföra din sport. 
                  Så har vi väldigt mycket att erbjuda när det kommer till bägge delar. 
                </p>
                <button className="content-product-container__btn">
                  <Link href="/sortiment">Se våra produkter</Link>
                </button>
              </div>
              <div className="content-product-image">
                <p className="content-product-image__link">Sport & Fritid</p>
                <img src="/img/sport.jpg" alt="sport" className="content-product-image__img"/>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="content">
            <div className="content-contact">
              <div className="content-contact-image">
                <p className="content-contact-image__link">Kontakta oss</p>
                <img src="/img/sport2.jpg" alt="sport2" className="content-contact-image__img"/>
              </div>
              <div className="content-contact-container">
                <h1 className="content-contact-container__title">Vi hjälper dig gärna!</h1>
                <p className="content-contact-container__text">
                Har du frågor om våra produkter eller behöver hjälp? Vi finns här för att hjälpa dig! 
                Tveka inte att höra av dig via e-post om du har några funderingar, eller om du bara vill säga hej.
                </p>
                <button className="content-contact-container__btn">
                  <Link href="/kontakt">Kontakt oss</Link>
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
  );
}
