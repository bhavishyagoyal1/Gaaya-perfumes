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
          {/* Col 1: Maison */}
          <div>
            <span className="footer-col__eyebrow">Maison &amp; Ateliers</span>
            <h3 className="footer-col__title">GAAYA PERFUMES</h3>
            <p className="footer-col__desc">
              Pioneering architectural wooden fragrance containers, bespoke flacon crowns, and precision metrology for niche luxury houses globally.
            </p>
            <p className="footer-col__address">
              Khushkhera Atelier, Alwar, Rajasthan, India
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <span className="footer-col__eyebrow">Navigation</span>
            <nav className="footer-nav">
              <a href="#">The Maison</a>
              <a href="#collection">Haute Vessels</a>
              <a href="#spotlight">Craftsmanship</a>
              <a href="#journal">Editorial Journal</a>
              <a href="#enquiry">Private Label</a>
            </nav>
          </div>

          {/* Col 3: Credentials */}
          <div>
            <span className="footer-col__eyebrow">Credentials &amp; Standards</span>
            <ul className="footer-creds">
              <li>• 100% FSC Hardwood Certified</li>
              <li>• ±0.05mm Friction Delrin Bushing</li>
              <li>• IS:1141 Moisture Stabilization</li>
              <li>• ISO 22716 &amp; IFRA Compliant</li>
              <li>• Alcohol-Vapor Sealed Testing</li>
            </ul>
          </div>

          {/* Col 4: Private Dossier */}
          <div>
            <span className="footer-col__eyebrow">Private Dossier</span>
            <p className="footer-newsletter__desc">
              Receive seasonal material swatch catalogues and confidential capsule launches.
            </p>
            <div className="footer-newsletter__form">
              <input
                className="footer-newsletter__input"
                type="email"
                placeholder="atelier@domain.com"
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
            <a href="#">Atelier Terms</a>
            <span>·</span>
            <a href="#">Client Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
