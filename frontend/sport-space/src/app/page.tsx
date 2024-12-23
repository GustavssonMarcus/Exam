export default function Home() {
  return (
    <div>
      <main>
        <div className="hero">
          <h1 className="hero-title">Välkommen till Sport Space</h1>
          <p className="hero-text">Din sportbutik på nätet</p>
        </div>

        <section className="content">
          <div className="content-product">
            <div className="content-product-container">
              <h1 className="content-product-container__title">Kika in vårat sortiment</h1>
              <p className="content-product-container__text">
                Vare sig du är ute efter kläder, eller material för att kunna utföra din sport. 
                Så har vi väldigt mycket att erbjuda när det kommer till bägge delar. 
              </p>
            </div>
            <div className="content-product-image">
              <img src="/img/sport.jpg" alt="sport" />
            </div>
          </div>
          <button>Se produkter</button>
        </section>

      </main>
    </div>
  );
}
