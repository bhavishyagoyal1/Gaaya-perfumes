export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Giant Watermark */}
        <div className="footer__watermark">
          <span className="footer__watermark-text">GAAYA</span>
        </div>

        {/* Footer Columns */}
        <div className="footer__columns">
          {/* Col 1: Company */}
          <div>
            <span className="footer-col__eyebrow">Fragrance Manufacturing</span>
            <h3 className="footer-col__title">GAAYA PERFUMES</h3>
            <p className="footer-col__desc">
              A fragrance and perfume manufacturing company serving businesses and brands. From fragrance development and formulation to manufacturing, filling and finished-product support.
            </p>
            <p className="footer-col__address">
              RIICO Industrial Area, Alwar, Rajasthan, India
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <span className="footer-col__eyebrow">Navigation</span>
            <nav className="footer-nav">
              <a href="#about">About GAAYA</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#process">How We Work</a>
              <a href="#journal">Journal</a>
              <a href="#enquiry">Manufacturing Enquiry</a>
            </nav>
          </div>

          {/* Col 3: Services */}
          <div>
            <span className="footer-col__eyebrow">Services</span>
            <ul className="footer-creds">
              <li>• Fragrance Development</li>
              <li>• Formulation</li>
              <li>• Private Label Manufacturing</li>
              <li>• Contract Manufacturing</li>
              <li>• Filling &amp; Finishing</li>
              <li>• Packaging Support</li>
            </ul>
          </div>

          {/* Col 4: Stay Updated */}
          <div>
            <span className="footer-col__eyebrow">Industry Updates</span>
            <p className="footer-newsletter__desc">
              Receive manufacturing insights, capability updates, and industry developments.
            </p>
            <div className="footer-newsletter__form">
              <input
                className="footer-newsletter__input"
                type="email"
                placeholder="business@domain.com"
              />
              <button className="footer-newsletter__btn" type="button">Join</button>
            </div>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="footer__sub">
          <p>© 2026 GAAYA PERFUMES PRIVATE LIMITED. All rights reserved.</p>
          <div className="footer__sub-links">
            <a href="#">Privacy Policy</a>
            <span>·</span>
            <a href="#">Terms of Service</a>
            <span>·</span>
            <a href="#">Client Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
