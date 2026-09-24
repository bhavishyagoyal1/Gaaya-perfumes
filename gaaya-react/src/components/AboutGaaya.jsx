export default function AboutGaaya() {
  return (
    <section className="about-gaaya" id="about">
      <div className="container">
        <div className="about-gaaya__inner">
          <div className="about-gaaya__content">
            <span className="about-gaaya__eyebrow">About GAAYA</span>
            <h2 className="about-gaaya__title">Fragrance, Developed for Brands</h2>
            <p className="about-gaaya__desc">
              GAAYA works with brands to develop and manufacture fragrance products — from the initial fragrance brief and formulation to production, filling and finished-product support.
            </p>
            <p className="about-gaaya__desc">
              We help businesses turn fragrance concepts into products ready for their market.
            </p>
            <a className="btn-text-link" href="#capabilities">
              Discover GAAYA
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>arrow_forward</span>
            </a>
          </div>
          <div className="about-gaaya__aside">
            <div className="about-gaaya__stat-card">
              <span className="about-gaaya__stat-eyebrow">Company</span>
              <p className="about-gaaya__stat-name">GAAYA Perfumes Private Limited</p>
              <p className="about-gaaya__stat-detail">Fragrance & Perfume Manufacturing</p>
            </div>
            <div className="about-gaaya__stat-card">
              <span className="about-gaaya__stat-eyebrow">Location</span>
              <p className="about-gaaya__stat-name">Rajasthan, India</p>
              <p className="about-gaaya__stat-detail">RIICO Industrial Area, Alwar</p>
            </div>
            <div className="about-gaaya__stat-card">
              <span className="about-gaaya__stat-eyebrow">Focus</span>
              <p className="about-gaaya__stat-name">Private Label & Contract Manufacturing</p>
              <p className="about-gaaya__stat-detail">Concept to Finished Product</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
