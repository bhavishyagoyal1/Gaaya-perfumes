const PRODUCTS = [
  {
    id: 'CP-01',
    name: 'No. 01 Walnut Cap',
    badge: 'Sculpted Flacon Closure',
    specs: 'FEA15 Neck · Precision Turned · FSC Certified',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhhg1n7Wqg8OQZvPb5OlyNY4IbMnyoiFTdAyUcOXs8--fzu62BfhH5qlxc-hkEy0nPqqIp9McjF8BY4fKyR_sGvTKQ9yXzR660V1873WfcU75XQvQfQwjSFrnKYl9ktlgGKkxKH8azALrU96p4OygA1Op6WR-FEzmIzV4cLyZGpptSUIeDMVJQio-yzQeVTeDiZzkXPJ-zE1QGqjebe2xUSJqJf6BKZsTsOgsdFqdfLUSnWZtL9GbN7w',
    spotlight: {
      title: 'No. 01 Walnut Signature Cap',
      material: 'American Black Walnut',
      fit: 'FEA15 & FEA18 Standard',
      dimensions: '38mm x 44mm • 42g',
      finish: 'Hand-burnished matte wax',
    },
  },
  {
    id: 'CS-09',
    name: 'No. 02 Monolith Outer',
    badge: 'Protective Sleeve',
    specs: 'Dual-tone Ash & Teak · Magnetic Casing',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxenxKWlmtRJ2jm59xRm1oO6f4H-E1op19EyPT-Qvpk2oF-69oeVGzKp8ZYPK4i3hTSd3YqCTWnlgkkV-pqVcwcnvsCTWXnoJiv5WF0Vc3Mc73D6fdfyNKHoqxE9dcDrfs9tr4SfKIoAVB0ZhArubTqgvhG-wOVjE85hGItA-nf-Xhui-ItqCynmxaTuFK63aSuk3ny2DdQclus_4EDnJEpL0MbuXw0eh7S3XC-_Jn_JvktTr3b24lBw',
    spotlight: {
      title: 'No. 02 Monolith Outer Casing',
      material: 'Ebonized Black Ash & Seasoned Teak',
      fit: 'Encloses 50ml or 100ml Heavy Glass',
      dimensions: '62mm x 128mm • 190g',
      finish: 'Ultra-deep Charcoal Charred or Warm Satin',
    },
  },
  {
    id: 'BX-04',
    name: 'No. 03 Presentation Casket',
    badge: 'Artisanal Casket',
    specs: 'Solid Walnut · Velvet Bed · Brass Hinges',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAolsMONOomv6uAThQFzALpZL8s5U4gzHO8-J6-hrF73VkWUmZLLgjluI3LBLLbfFEM4DQK0ndC9XEx11P3eMFWPTqFxvzcNdZdPsKfOLCv8zHpL-V03JxvFy4dBiXgLfDC3k00qcrjZdwKRdOr_4WeWktp0iLY1P9LgblJYT_Fkt4TrU2rKvXlfqxPheerWbG0_wZMMB3CbyZT_UKtDmht3rgWROZ1IM6d0fuaSWrjlldIarhRhko6Pw',
    spotlight: {
      title: 'No. 03 Presentation Casket Box',
      material: 'Sustainably Farmed Dark Walnut',
      fit: 'Molded Velvet Bed for Flacon + Travel Spray',
      dimensions: '140mm x 140mm x 70mm • 340g',
      finish: 'Silky Natural Oil Polish & Laser Foil Monogram',
    },
  },
  {
    id: 'FL-12',
    name: 'No. 04 Bespoke Flacon Crown',
    badge: 'Crown Series',
    specs: 'Organic Relief Carving · Delrin Bushing',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1V1BY4PEpJWIHGcm7LjeUJX3e40M8tUAeWWAm88rfQInzjjrL-H70NZwXDM6nf4npHlzO6QoAhny_sLhFVyndRHThry1gN5yAXh9MtaSd-S5q0BCOLlTGyMbqkIUHgKvnom7iNgFi3oBVRbL_Kw-c_D_l_gS892TuBYrCY9dLpdh5AR3sYNUjbp3Hj2Y_45nVUx53hXVblEZFPzsXC3B7Vwm99vgHuYnunVT9ndcqHxs-4_q8XZA3V7lGgv',
    spotlight: {
      title: 'No. 04 Bespoke Flacon Crown',
      material: 'Carpathian Walnut & Smoked Crystal',
      fit: 'Precision Weighted Collar for 15mm Crimps',
      dimensions: '48mm diameter sculpted • 65g',
      finish: 'Organic Linseed & Carnauba Hand Rub',
    },
  },
];

export default function Collection({ onSelectSpotlight }) {
  return (
    <section className="collection" id="collection">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <h2 className="section-header__title">The Collection</h2>
            <p className="section-header__desc">
              Timeless packaging crafted with intention, designed for the world's finest perfume houses.
            </p>
          </div>
        </div>

        {/* Card Grid */}
        <div className="card-grid">
          {PRODUCTS.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-card__image-wrap">
                <img alt={product.name} src={product.image} />
                <span className="product-card__badge">{product.badge}</span>
              </div>
              <div className="product-card__body">
                <div>
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__specs">{product.specs}</p>
                </div>
                <div className="product-card__footer">
                  <span className="product-card__sku">{product.id}</span>
                  <button
                    className="product-card__inspect-btn"
                    onClick={() => onSelectSpotlight(product.spotlight, product.image)}
                  >
                    Inspect +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="collection__cta">
          <a className="btn-outline" href="#enquiry">Discover Full Atelier Collection</a>
        </div>
      </div>
    </section>
  );
}
