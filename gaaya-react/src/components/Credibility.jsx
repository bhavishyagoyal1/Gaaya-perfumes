export default function Credibility() {
  const ITEMS = [
    { icon: 'science', title: 'Fragrance Formulation', desc: 'Developing and refining fragrance compositions based on client requirements.' },
    { icon: 'labs', title: 'Quality Control', desc: 'Quality checks across formulation, production and finished products.' },
    { icon: 'cycle', title: 'Batch Consistency', desc: 'Consistent results across production runs.' },
    { icon: 'water_drop', title: 'Filling & Processing', desc: 'Professional fragrance filling and finished-product processing.' },
    { icon: 'eco', title: 'Raw Material Handling', desc: 'Responsible sourcing and handling of fragrance raw materials.' },
    { icon: 'local_shipping', title: 'Manufacturing Support', desc: 'End-to-end support from sampling through delivery.' },
  ];

  return (
    <section className="credibility" id="credibility">
      <div className="container">
        <div className="credibility__header">
          <span className="credibility__eyebrow">Manufacturing</span>
          <h2 className="credibility__title">Built for Consistency</h2>
          <p className="credibility__desc">
            From raw material handling to finished-product quality checks, our manufacturing processes are designed for reliability and consistency across production batches.
          </p>
        </div>

        <div className="credibility__grid">
          {ITEMS.map((item, i) => (
            <div key={i} className="credibility__item">
              <span className="material-symbols-outlined">{item.icon}</span>
              <div>
                <h4 className="credibility__item-title">{item.title}</h4>
                <p className="credibility__item-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
