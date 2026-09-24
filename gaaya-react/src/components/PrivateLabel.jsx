export default function PrivateLabel() {
  return (
    <section className="private-label" id="private-label">
      <div className="container">
        <div className="private-label__inner">
          <div className="private-label__content">
            <span className="private-label__eyebrow">Private Label & Contract Manufacturing</span>
            <h2 className="private-label__title">Your Brand. Our Fragrance Expertise.</h2>
            <p className="private-label__desc">
              From an initial product idea to a finished fragrance, GAAYA supports brands with private-label and contract manufacturing solutions tailored to their requirements.
            </p>
            <div className="private-label__features">
              <div className="private-label__feature">
                <span className="material-symbols-outlined">inventory_2</span>
                <div>
                  <h4>Private Label</h4>
                  <p>Develop and manufacture fragrance products under your own brand.</p>
                </div>
              </div>
              <div className="private-label__feature">
                <span className="material-symbols-outlined">precision_manufacturing</span>
                <div>
                  <h4>Contract Manufacturing</h4>
                  <p>Manufacturing support for businesses looking to outsource perfume production.</p>
                </div>
              </div>
              <div className="private-label__feature">
                <span className="material-symbols-outlined">science</span>
                <div>
                  <h4>Custom Development</h4>
                  <p>Fragrance development and formulation tailored to your brand requirements.</p>
                </div>
              </div>
            </div>
            <a className="btn-primary" href="#enquiry">Start a Project</a>
          </div>
        </div>
      </div>
    </section>
  );
}
