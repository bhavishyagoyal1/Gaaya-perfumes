import heroImg from '../assets/hero-fragrance.jpg';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__grid">
          {/* Left Editorial Copy */}
          <div className="hero__copy">
            <span className="hero__eyebrow">FRAGRANCE MANUFACTURING FOR BRANDS</span>
            <h1 className="hero__title">
              Private Label &<br />
              Contract <em>Fragrance</em><br />
              Manufacturing
            </h1>
            <p className="hero__desc">
              From fragrance development and formulation to perfume manufacturing and finished-product support, GAAYA helps brands turn fragrance concepts into market-ready products.
            </p>
            <div className="hero__cta-group">
              <a className="btn-primary" href="#enquiry">Start a Manufacturing Enquiry</a>
              <a className="btn-text-link" href="#capabilities">
                Explore Our Capabilities
              </a>
            </div>
            {/* Metric Strip */}
            <div className="hero__metrics">
              <div>
                <span className="metric__value">Develop</span>
                <p className="metric__label">Fragrance Development</p>
              </div>
              <div>
                <span className="metric__value">Manufacture</span>
                <p className="metric__label">Production & Filling</p>
              </div>
              <div>
                <span className="metric__value">Deliver</span>
                <p className="metric__label">Finished Products</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="hero__visual">
            <div className="hero__image-frame">
              <img
                alt="GAAYA fragrance development — essential oils, raw materials and formulation"
                src={heroImg}
              />
              {/* Float Label */}
              <div className="hero__float-label">
                <div>
                  <span className="hero__float-label-eyebrow">Fragrance Manufacturing</span>
                  <span className="hero__float-label-title">From Concept to Finished Product</span>
                </div>
                <span className="hero__float-label-size">B2B Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
