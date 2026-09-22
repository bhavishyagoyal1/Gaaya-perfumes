import atelierCraftsmanImg from '../assets/atelier-craftsman.jpg';
import woodTextureImg from '../assets/wood-texture.jpg';

export default function Journal() {
  return (
    <section className="journal" id="journal">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <h2 className="section-header__title">Journal</h2>
            <p className="section-header__desc">
              Stories of wood, precision engineering, and the hands behind every vessel.
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
                alt="Master craftsman in Rajasthan atelier hand-fitting a wooden perfume cap"
                src={atelierCraftsmanImg}
              />
              <span className="journal-card-a__image-badge">Atelier Profile</span>
            </div>
            <div className="journal-card-a__body">
              <div>
                <span className="journal-card-a__location">Khushkhera, Rajasthan</span>
                <h3 className="journal-card-a__title">
                  The Rajasthan Atelier: Where Material Meets Craft
                </h3>
                <p className="journal-card-a__desc">
                  An inside look at our specialized turning unit in Khushkhera, Rajasthan where traditional Indian woodcarving meets 5-axis CNC precision to satisfy Europe's most exacting fragrance houses.
                </p>
              </div>
              <div className="journal-card-a__footer">
                <span className="journal-card__read-time">6 min read</span>
                <a className="journal-card__read-link" href="#about">
                  <span>Read Article</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>arrow_forward</span>
                </a>
              </div>
            </div>
          </article>

          {/* Right Column: Cards B & C */}
          <div className="journal-col-right">
            {/* Card B */}
            <article className="journal-card-bc">
              <div className="journal-card-bc__image-wrap">
                <img
                  alt="Turned Wood Vessels Detail"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxenxKWlmtRJ2jm59xRm1oO6f4H-E1op19EyPT-Qvpk2oF-69oeVGzKp8ZYPK4i3hTSd3YqCTWnlgkkV-pqVcwcnvsCTWXnoJiv5WF0Vc3Mc73D6fdfyNKHoqxE9dcDrfs9tr4SfKIoAVB0ZhArubTqgvhG-wOVjE85hGItA-nf-Xhui-ItqCynmxaTuFK63aSuk3ny2DdQclus_4EDnJEpL0MbuXw0eh7S3XC-_Jn_JvktTr3b24lBw"
                />
              </div>
              <div className="journal-card-bc__body">
                <div>
                  <span className="journal-card-bc__eyebrow">Metrology &amp; Seasoning</span>
                  <h4 className="journal-card-bc__title">
                    A Conversation with Our Master Turners
                  </h4>
                  <p className="journal-card-bc__desc">
                    How timber moisture is stabilized to 8-10% to prevent climate warping in Parisian boutiques and Middle Eastern climates.
                  </p>
                </div>
                <div className="journal-card-bc__footer">
                  <span className="journal-card__read-time">4 min read</span>
                  <a className="journal-card__read-link" href="#spotlight">Read Essay →</a>
                </div>
              </div>
            </article>

            {/* Card C */}
            <article className="journal-card-bc">
              <div className="journal-card-bc__image-wrap">
                <img
                  alt="Wood Texture & Flacon Ring"
                  src={woodTextureImg}
                />
              </div>
              <div className="journal-card-bc__body">
                <div>
                  <span className="journal-card-bc__eyebrow">Sustainable Horizon</span>
                  <h4 className="journal-card-bc__title">
                    Sustainable Luxury: 100% FSC Hardwoods
                  </h4>
                  <p className="journal-card-bc__desc">
                    Why international luxury maisons are actively replacing cold zamak and plastic caps with tactile, living architectural timber.
                  </p>
                </div>
                <div className="journal-card-bc__footer">
                  <span className="journal-card__read-time">5 min read</span>
                  <a className="journal-card__read-link" href="#about">Read Essay →</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
