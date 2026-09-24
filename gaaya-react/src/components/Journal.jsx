import fragranceLabImg from '../assets/fragrance-lab.jpg';
import fragranceIngredientsImg from '../assets/fragrance-ingredients.jpg';

export default function Journal() {
  return (
    <section className="journal" id="journal">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <h2 className="section-header__title">Journal</h2>
            <p className="section-header__desc">
              Insights on fragrance development, perfume manufacturing, and building a fragrance brand.
            </p>
          </div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--taupe-500)', fontWeight: 500 }}>
            Edition 04 / 2026
          </span>
        </div>

        {/* Journal Grid */}
        <div className="journal__grid">
          {/* Card A: Large Lead */}
          <article className="journal-card-a">
            <div className="journal-card-a__image-wrap">
              <img
                alt="Inside the GAAYA fragrance development laboratory"
                src={fragranceLabImg}
              />
              <span className="journal-card-a__image-badge">Fragrance Development</span>
            </div>
            <div className="journal-card-a__body">
              <div>
                <span className="journal-card-a__location">GAAYA, Rajasthan</span>
                <h3 className="journal-card-a__title">
                  How Private-Label Perfume Manufacturing Works
                </h3>
                <p className="journal-card-a__desc">
                  A look inside how fragrance products are developed and manufactured for brands — from the initial brief and fragrance composition through sampling, production, filling and finished-product delivery.
                </p>
              </div>
            </div>
          </article>

          {/* Right Column: Cards B & C */}
          <div className="journal-col-right">
            {/* Card B */}
            <article className="journal-card-bc">
              <div className="journal-card-bc__image-wrap">
                <img
                  alt="Fragrance ingredients and raw materials"
                  src={fragranceIngredientsImg}
                />
              </div>
              <div className="journal-card-bc__body">
                <div>
                  <span className="journal-card-bc__eyebrow">Fragrance Knowledge</span>
                  <h4 className="journal-card-bc__title">
                    Understanding Fragrance Notes: Top, Heart & Base
                  </h4>
                  <p className="journal-card-bc__desc">
                    What fragrance notes are, how they work together, and why they matter when developing a perfume composition for a brand.
                  </p>
                </div>
              </div>
            </article>

            {/* Card C */}
            <article className="journal-card-bc">
              <div className="journal-card-bc__image-wrap">
                <img
                  alt="Finished perfume products ready for market"
                  src={fragranceLabImg}
                />
              </div>
              <div className="journal-card-bc__body">
                <div>
                  <span className="journal-card-bc__eyebrow">Product Development</span>
                  <h4 className="journal-card-bc__title">
                    Choosing the Right Fragrance Profile for Your Brand
                  </h4>
                  <p className="journal-card-bc__desc">
                    How brands can approach fragrance selection — from understanding their target audience to working with a manufacturer to develop the right composition.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
