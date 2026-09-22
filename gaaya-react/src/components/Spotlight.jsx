import { useState, useEffect, useRef } from 'react';
import flaconCrownImg from '../assets/flacon-crown.jpg';

const THUMB_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBhhg1n7Wqg8OQZvPb5OlyNY4IbMnyoiFTdAyUcOXs8--fzu62BfhH5qlxc-hkEy0nPqqIp9McjF8BY4fKyR_sGvTKQ9yXzR660V1873WfcU75XQvQfQwjSFrnKYl9ktlgGKkxKH8azALrU96p4OygA1Op6WR-FEzmIzV4cLyZGpptSUIeDMVJQio-yzQeVTeDiZzkXPJ-zE1QGqjebe2xUSJqJf6BKZsTsOgsdFqdfLUSnWZtL9GbN7w',
  flaconCrownImg,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAxenxKWlmtRJ2jm59xRm1oO6f4H-E1op19EyPT-Qvpk2oF-69oeVGzKp8ZYPK4i3hTSd3YqCTWnlgkkV-pqVcwcnvsCTWXnoJiv5WF0Vc3Mc73D6fdfyNKHoqxE9dcDrfs9tr4SfKIoAVB0ZhArubTqgvhG-wOVjE85hGItA-nf-Xhui-ItqCynmxaTuFK63aSuk3ny2DdQclus_4EDnJEpL0MbuXw0eh7S3XC-_Jn_JvktTr3b24lBw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAolsMONOomv6uAThQFzALpZL8s5U4gzHO8-J6-hrF73VkWUmZLLgjluI3LBLLbfFEM4DQK0ndC9XEx11P3eMFWPTqFxvzcNdZdPsKfOLCv8zHpL-V03JxvFy4dBiXgLfDC3k00qcrjZdwKRdOr_4WeWktp0iLY1P9LgblJYT_Fkt4TrU2rKvXlfqxPheerWbG0_wZMMB3CbyZT_UKtDmht3rgWROZ1IM6d0fuaSWrjlldIarhRhko6Pw',
];

const VOLUMES = ['500 units', '2,500 units', '10,000+ units'];

const VALUE_PROPS = [
  { icon: 'verified', text: 'Free Prototyping Samples' },
  { icon: 'forest', text: 'FSC Certified Hardwoods' },
  { icon: 'precision_manufacturing', text: 'Micron-level CNC Turning' },
  { icon: 'flight_takeoff', text: 'Global Doorstep Dispatch' },
];

export default function Spotlight({ spotlightData }) {
  const [mainImg, setMainImg] = useState(THUMB_IMAGES[0]);
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);
  const sectionRef = useRef(null);

  const [title, setTitle] = useState('No. 01 Walnut Signature Cap');
  const [desc, setDesc] = useState(
    'A tribute to quiet sophistication. GAAYA 01 cap pairs solid seasoned walnut with a precision Delrin inner insert for a velvet-damped, airtight seal on FEA15 pump systems.'
  );

  // React to spotlight changes from Collection "Inspect +" clicks
  useEffect(() => {
    if (spotlightData) {
      const { spotlight, image } = spotlightData;
      setTitle(spotlight.title);
      setDesc(
        `Custom turned from ${spotlight.material}. Designed with ${spotlight.fit}, ${spotlight.dimensions}. Finished in ${spotlight.finish} for enduring tactile elegance.`
      );
      handleImageChange(image);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [spotlightData]);

  const handleImageChange = (src) => {
    setImgOpacity(0);
    setTimeout(() => {
      setMainImg(src);
      setImgOpacity(1);
    }, 150);
  };

  const handleThumbClick = (index) => {
    setActiveThumb(index);
    handleImageChange(THUMB_IMAGES[index]);
  };

  return (
    <section className="spotlight" id="spotlight" ref={sectionRef}>
      <div className="container">
        <div className="spotlight__grid">
          {/* Left: Gallery */}
          <div className="spotlight__gallery">
            {/* Thumbnails */}
            <div className="spotlight__thumbs">
              {THUMB_IMAGES.map((img, i) => (
                <button
                  key={i}
                  className={`spotlight__thumb-btn ${activeThumb === i ? 'active' : ''}`}
                  onClick={() => handleThumbClick(i)}
                >
                  <img alt={`View ${i + 1}`} src={img} />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="spotlight__main-frame">
              <img
                alt="Spotlight Vessel Display"
                src={mainImg}
                style={{ opacity: imgOpacity }}
              />
              <span className="spotlight__main-badge">Featured Archive</span>
            </div>
          </div>

          {/* Right: Detail Panel */}
          <div className="spotlight__detail">
            <div className="spotlight__detail-header">
              <span className="spotlight__detail-eyebrow">Bespoke Flacon Closure</span>
              <span className="spotlight__detail-tier">Tier 1 Bespoke</span>
            </div>
            <h2 className="spotlight__detail-title">{title}</h2>
            <p className="spotlight__detail-subtitle">
              Custom Dimensions · FEA15 Thread · FSC Hardwood
            </p>
            <p className="spotlight__detail-desc">{desc}</p>

            {/* Atelier Notes */}
            <div className="atelier-notes">
              <span className="atelier-notes__label">Atelier Notes &amp; Specifications</span>
              <div className="atelier-notes__grid">
                <div>
                  <span className="atelier-note__tier">TOP</span>
                  <p className="atelier-note__value">Kiln-Dried Timber</p>
                  <p className="atelier-note__sub">8–10% Moisture</p>
                </div>
                <div>
                  <span className="atelier-note__tier">HEART</span>
                  <p className="atelier-note__value">Tolerance ±0.05mm</p>
                  <p className="atelier-note__sub">5-Axis Micron CNC</p>
                </div>
                <div>
                  <span className="atelier-note__tier">BASE</span>
                  <p className="atelier-note__value">Organic Finish</p>
                  <p className="atelier-note__sub">Beeswax &amp; Linseed</p>
                </div>
              </div>
            </div>

            {/* Volume Selector */}
            <div className="volume-selector">
              <div className="volume-selector__header">
                <span className="volume-selector__label">Production Volume</span>
                <span className="volume-selector__lead">Lead Time: 21 Days</span>
              </div>
              <div className="volume-selector__grid">
                {VOLUMES.map((vol, i) => (
                  <button
                    key={i}
                    className={`volume-btn ${selectedVolume === i ? 'active' : ''}`}
                    onClick={() => setSelectedVolume(i)}
                  >
                    {vol}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="spotlight__actions">
              <a className="btn-block-primary" href="#enquiry">
                Request Technical Dossier &amp; Sample
              </a>
              <a className="btn-block-outline" href="#collection">
                Discover The Collection
              </a>
            </div>

            {/* Value Props */}
            <div className="value-props">
              {VALUE_PROPS.map((prop, i) => (
                <div key={i} className="value-prop">
                  <span className="material-symbols-outlined">{prop.icon}</span>
                  <span>{prop.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
