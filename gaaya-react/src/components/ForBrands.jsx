const AUDIENCES = [
  {
    icon: 'rocket_launch',
    title: 'Emerging Fragrance Brands',
    desc: 'Support for businesses developing their first fragrance line.',
  },
  {
    icon: 'storefront',
    title: 'D2C Brands',
    desc: 'Fragrance products developed for digital-first brands and their customers.',
  },
  {
    icon: 'shopping_bag',
    title: 'Private Labels',
    desc: 'Products developed according to a retailer or business\'s requirements.',
  },
  {
    icon: 'corporate_fare',
    title: 'Established Businesses',
    desc: 'Manufacturing support for businesses expanding or outsourcing fragrance production.',
  },
];

export default function ForBrands() {
  return (
    <section className="for-brands" id="for-brands">
      <div className="container">
        {/* Section Header */}
        <div className="for-brands__header">
          <h2 className="for-brands__title">Built for Brands</h2>
          <p className="for-brands__desc">
            Whether you're launching a new fragrance line or expanding an existing portfolio, GAAYA provides the manufacturing expertise behind the product.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="for-brands__grid">
          {AUDIENCES.map((audience, i) => (
            <article key={i} className="audience-card">
              <div className="audience-card__icon">
                <span className="material-symbols-outlined">{audience.icon}</span>
              </div>
              <h3 className="audience-card__title">{audience.title}</h3>
              <p className="audience-card__desc">{audience.desc}</p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="for-brands__cta">
          <a className="btn-primary" href="#enquiry">Work With GAAYA</a>
          <a className="btn-text-link" href="#capabilities">
            Explore Manufacturing
            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
