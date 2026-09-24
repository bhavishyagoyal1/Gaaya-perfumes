export default function FragranceArt() {
  return (
    <section className="fragrance-art" id="fragrance-art">
      <div className="container">
        <div className="fragrance-art__inner">
          {/* Header */}
          <div className="fragrance-art__header">
            <h2 className="fragrance-art__title">The GAAYA Atelier</h2>
            <p className="fragrance-art__desc">
              Where fragrance concepts are developed, refined and brought to life. Our fragrance development process brings together creative direction, formulation and refinement to create a fragrance aligned with the brand and its market.
            </p>
          </div>

          {/* Notes Pyramid */}
          <div className="fragrance-art__pyramid">
            <div className="fragrance-note">
              <div className="fragrance-note__content">
                <p className="fragrance-note__tier">Top Notes</p>
                <p className="fragrance-note__label">The first impression.</p>
              </div>
            </div>

            <div className="fragrance-note">
              <div className="fragrance-note__content">
                <p className="fragrance-note__tier">Heart Notes</p>
                <p className="fragrance-note__label">The core character.</p>
              </div>
            </div>

            <div className="fragrance-note">
              <div className="fragrance-note__content">
                <p className="fragrance-note__tier">Base Notes</p>
                <p className="fragrance-note__label">The lasting foundation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
