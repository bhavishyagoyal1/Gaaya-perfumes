import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        {/* Brand Logo */}
        <div>
          <a className="brand-logo" href="#">
            <span className="brand-logo__name">GAAYA</span>
            <span className="brand-logo__sub">Perfumes Pvt. Ltd.</span>
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#capabilities">Capabilities</a>
          <a className="nav-link" href="#journal">Journal</a>
        </nav>

        {/* Right Actions */}
        <div className="header__actions">
          <a className="enquiry-link" href="#enquiry">
            <span>Enquiry</span>
          </a>
          <button
            className="mobile-toggle"
            aria-label="Open Navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
        <a href="#capabilities" onClick={() => setMobileOpen(false)}>Capabilities</a>
        <a href="#process" onClick={() => setMobileOpen(false)}>How We Work</a>
        <a href="#journal" onClick={() => setMobileOpen(false)}>Journal</a>
        <a href="#enquiry" className="mobile-enquiry" onClick={() => setMobileOpen(false)}>Manufacturing Enquiry</a>
      </div>
    </header>
  );
}
