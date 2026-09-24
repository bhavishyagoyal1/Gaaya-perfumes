const STEPS = [
  {
    num: '01',
    title: 'Brief',
    desc: 'Understand your brand and fragrance requirements.',
  },
  {
    num: '02',
    title: 'Development',
    desc: 'Develop the fragrance direction.',
  },
  {
    num: '03',
    title: 'Sampling',
    desc: 'Create and refine samples.',
  },
  {
    num: '04',
    title: 'Approval',
    desc: 'Finalize the approved formulation.',
  },
  {
    num: '05',
    title: 'Manufacturing',
    desc: 'Produce the approved fragrance.',
  },
  {
    num: '06',
    title: 'Filling & Finishing',
    desc: 'Fill and finish the approved fragrance product using the selected components.',
  }
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="container">
        {/* Section Header */}
        <div className="process__header">
          <span className="process__eyebrow">How We Work</span>
          <h2 className="process__title">From Brief to Finished Product</h2>
        </div>

        {/* Steps */}
        <div className="process__steps">
          {STEPS.map((step, i) => (
            <div key={i} className="process-step">
              <span className="process-step__num">{step.num}</span>
              <div className="process-step__content">
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
