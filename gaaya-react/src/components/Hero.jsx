export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__grid">
          {/* Left Editorial Copy */}
          <div className="hero__copy">
            <span className="hero__eyebrow">GAAYA PERFUMES • RAJASTHAN</span>
            <h1 className="hero__title">
              The Art of <br />
              <em>Quiet Luxury</em>
            </h1>
            <p className="hero__desc">
              Timeless wooden containers and flacon closures, crafted with intention in Rajasthan, designed to be held, never announced.
            </p>
            <div className="hero__cta-group">
              <a className="btn-primary" href="#collection">Explore Collection</a>
            </div>
            {/* Metric Strip */}
            <div className="hero__metrics">
              <div>
                <span className="metric__value">100%</span>
                <p className="metric__label">FSC Hardwoods</p>
              </div>
              <div>
                <span className="metric__value">±0.05<span>mm</span></span>
                <p className="metric__label">Tolerance Calibrated</p>
              </div>
              <div>
                <span className="metric__value">FEA15</span>
                <p className="metric__label">Global Standard Fit</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="hero__visual">
            <div className="hero__image-frame">
              <img
                alt="GAAYA Haute Flacon and Hand-Carved Walnut Finial on Travertine Stone"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhhg1n7Wqg8OQZvPb5OlyNY4IbMnyoiFTdAyUcOXs8--fzu62BfhH5qlxc-hkEy0nPqqIp9McjF8BY4fKyR_sGvTKQ9yXzR660V1873WfcU75XQvQfQwjSFrnKYl9ktlgGKkxKH8azALrU96p4OygA1Op6WR-FEzmIzV4cLyZGpptSUIeDMVJQio-yzQeVTeDiZzkXPJ-zE1QGqjebe2xUSJqJf6BKZsTsOgsdFqdfLUSnWZtL9GbN7w"
              />
              {/* Float Label */}
              <div className="hero__float-label">
                <div>
                  <span className="hero__float-label-eyebrow">Atelier du Bois</span>
                  <span className="hero__float-label-title">Éclat Sombre Sculpted Walnut Vessel</span>
                </div>
                <span className="hero__float-label-size">50ml / 100ml</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
