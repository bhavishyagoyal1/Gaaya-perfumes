const CAPABILITIES = [
  {
    icon: 'science',
    title: 'Fragrance Development',
    desc: 'Develop the fragrance profile and composition based on your brand brief.',
  },
  {
    icon: 'biotech',
    title: 'Formulation',
    desc: 'Refine the approved fragrance into a production-ready formulation.',
  },
  {
    icon: 'inventory_2',
    title: 'Private Label Manufacturing',
    desc: 'Developing and manufacturing perfume products under a client\'s own brand.',
  },
  {
    icon: 'precision_manufacturing',
    title: 'Contract Manufacturing',
    desc: 'Providing manufacturing support for businesses looking to outsource perfume production.',
  },
  {
    icon: 'experiment',
    title: 'Sampling & Refinement',
    desc: 'Developing and refining samples before moving into production.',
  },
  {
    icon: 'water_drop',
    title: 'Filling & Finishing',
    desc: 'Filling and finishing the final fragrance product.',
  }
];

export default function Capabilities() {
  return (
    <section className="capabilities" id="capabilities">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <h2 className="section-header__title">Our Capabilities</h2>
            <p className="section-header__desc">
              From fragrance development to finished-product manufacturing, we support brands at every key stage.
            </p>
          </div>
        </div>

        {/* Capability Cards */}
        <div className="capabilities__grid">
          {CAPABILITIES.map((cap, i) => (
            <article key={i} className="capability-card">
              <div className="capability-card__icon">
                <span className="material-symbols-outlined">{cap.icon}</span>
              </div>
              <h3 className="capability-card__title">{cap.title}</h3>
              <p className="capability-card__desc">{cap.desc}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
