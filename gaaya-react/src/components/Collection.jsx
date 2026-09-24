const PRODUCT_CATEGORIES = [
  {
    icon: 'humidity_percentage',
    title: 'Eau de Parfum',
    desc: 'Higher concentration fragrances with lasting performance and depth.',
  },
  {
    icon: 'air',
    title: 'Eau de Toilette',
    desc: 'Versatile, lighter formulations suitable for everyday use.',
  },
  {
    icon: 'water_drop',
    title: 'Attars & Concentrated Oils',
    desc: 'Traditional concentrated perfume oils and attars.',
  },
  {
    icon: 'spray',
    title: 'Body Mists & Sprays',
    desc: 'Lighter fragrance formats for broader product ranges.',
  },
  {
    icon: 'deployed_code',
    title: 'Gift Sets & Collections',
    desc: 'Curated product sets and collections assembled for retail or gifting.',
  },
  {
    icon: 'tune',
    title: 'Custom Fragrance Products',
    desc: 'Bespoke product formats developed around specific market or brand requirements.',
  },
];

export default function Products() {
  return (
    <section className="products" id="products">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <h2 className="section-header__title">From Fragrance to Finished Product</h2>
            <p className="section-header__desc">
              We manufacture a range of fragrance product formats — from concentrated attars to finished eau de parfum — tailored to each brand's requirements.
            </p>
          </div>
        </div>

        {/* Product Category Grid */}
        <div className="products__grid">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <article key={i} className="product-type-card">
              <div className="product-type-card__icon">
                <span className="material-symbols-outlined">{cat.icon}</span>
              </div>
              <h3 className="product-type-card__title">{cat.title}</h3>
              <p className="product-type-card__desc">{cat.desc}</p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="products__cta">
          <a className="btn-outline" href="#enquiry">Discuss Your Product Requirements</a>
        </div>
      </div>
    </section>
  );
}
