import { useState, useRef, useEffect } from 'react';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/contact`;

// Map select values to the display text the backend expects for product validation
const PRODUCT_LABELS = {
  cap: 'Wooden Perfume Cap (FEA15 Standard)',
  casing: 'Complete Outer Wooden Casing',
  casket: 'Solid Wood Presentation Casket',
  finial: 'Bespoke Flacon Finial / Crown',
  custom: 'Full Atelier Development & Tooling',
};

const COOLDOWN_SECONDS = 60;

export default function Enquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const formRef = useRef(null);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;
    setSubmitting(true);
    setError('');

    const form = formRef.current;
    const phoneCode = form.phoneCode.value;
    const phoneNumber = form.phone.value.trim();
    const quantitySelect = form.quantity;
    const quantityText = quantitySelect.options[quantitySelect.selectedIndex].text;

    const payload = {
      name: form.fullName.value.trim(),
      company: form.companyName.value.trim(),
      email: form.email.value.trim(),
      phone: `${phoneCode} ${phoneNumber}`,
      product: PRODUCT_LABELS[form.packagingType.value] || '',
      message: `[Packaging Enquiry]\nQuantity: ${quantityText}\n\n${form.message.value.trim()}`,
      website: '', // honeypot — always send empty
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle validation errors or rate limit errors
        const errMsg = data.errors
          ? data.errors.map((e) => e.msg).join('. ')
          : data.error || 'Something went wrong. Please try again.';
        setError(errMsg);
        setSubmitting(false);
        return;
      }

      setReference(data.reference || '');
      setSubmitted(true);
      setCooldown(COOLDOWN_SECONDS);
    } catch (err) {
      setError('Unable to connect to the server. Please check your internet connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="enquiry" id="enquiry">
      <div className="enquiry__container">
        {/* Header */}
        <div className="enquiry__header">
          <span className="enquiry__header-eyebrow">Private Label Commissions</span>
          <h2 className="enquiry__header-title">Let's Create Something Distinctive</h2>
          <p className="enquiry__header-desc">
            Submit your bottle specifications, desired timber species, or concept sketches. Our engineering bureau responds within 24 hours with volumetric drawings and trial schedules.
          </p>
        </div>

        {/* Form Card */}
        <div className="enquiry__card">
          {!submitted ? (
            <form className="form" onSubmit={handleSubmit} ref={formRef}>
              <div className="form__row">
                <div>
                  <label className="form__label" htmlFor="fullName">Full Name *</label>
                  <input
                    className="form__input"
                    id="fullName"
                    type="text"
                    placeholder="e.g. Julian Vance"
                    required
                  />
                </div>
                <div>
                  <label className="form__label" htmlFor="companyName">Company / Brand</label>
                  <input
                    className="form__input"
                    id="companyName"
                    type="text"
                    placeholder="e.g. Maison de Parfumerie"
                  />
                </div>
              </div>

              <div className="form__row">
                <div>
                  <label className="form__label" htmlFor="email">Business Email *</label>
                  <input
                    className="form__input"
                    id="email"
                    type="email"
                    placeholder="julian@maisonparfum.com"
                    required
                  />
                </div>
                <div>
                  <label className="form__label" htmlFor="phone">Mobile / WhatsApp *</label>
                  <div className="phone-input-group">
                    <select className="form__select phone-code-select" id="phoneCode" defaultValue="+91">
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+86">🇨🇳 +86</option>
                    </select>
                    <input
                      className="form__input phone-number-input"
                      id="phone"
                      type="tel"
                      placeholder="98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form__row">
                <div>
                  <label className="form__label" htmlFor="packagingType">Packaging Requirement</label>
                  <select className="form__select" id="packagingType">
                    <option value="cap">Wooden Perfume Cap (FEA15 Standard)</option>
                    <option value="casing">Complete Outer Wooden Casing</option>
                    <option value="casket">Solid Wood Presentation Casket</option>
                    <option value="finial">Bespoke Flacon Finial / Crown</option>
                    <option value="custom">Full Atelier Development &amp; Tooling</option>
                  </select>
                </div>
                <div>
                  <label className="form__label" htmlFor="quantity">Estimated Order Quantity</label>
                  <select className="form__select" id="quantity" defaultValue="1000">
                    <option value="trial">500 units (Prototyping &amp; Trial Batch)</option>
                    <option value="1000">1,000 – 2,500 units</option>
                    <option value="5000">5,000 – 10,000 units</option>
                    <option value="10000">10,000+ units (Commercial Production)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form__label" htmlFor="message">Message / Technical Brief *</label>
                <textarea
                  className="form__textarea"
                  id="message"
                  rows="4"
                  placeholder="Indicate bottle neck dimensions, wood species preferences (Walnut, Black Ash, Teak), target launch date..."
                  required
                  minLength={10}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="form__error">
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>error</span>
                  {error}
                </div>
              )}

              <div className="form__footer">
                <span className="form__nda">
                  <span className="material-symbols-outlined">lock</span>
                  Strict NDA &amp; Non-Disclosure Guaranteed
                </span>
                <button className="form__submit" type="submit" disabled={submitting}>
                  <span>{submitting ? 'Transmitting...' : 'Submit Atelier Enquiry'}</span>
                  {!submitting && (
                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>arrow_forward</span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="form-success">
              <div className="form-success__icon">
                <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>check</span>
              </div>
              <h3 className="form-success__title">Enquiry Transmitted</h3>
              <p className="form-success__desc">
                Our engineering bureau will evaluate your project brief and reply within 24 hours with technical specifications and wood samples.
              </p>
              {reference && (
                <p className="form-success__ref">
                  Reference: <strong>{reference}</strong>
                </p>
              )}
            </div>
          )}

          {/* Corporate Badge */}
          <div className="corporate-badge">
            <p>
              GAAYA PERFUMES PRIVATE LIMITED · Plot No. G1 655, RIICO Industrial Area, Khushkhera, Tizara, Alwar, Rajasthan – 301707 · CIN: U20234RJ2024PTC092061 · RoC Jaipur
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
