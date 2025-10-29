import React from 'react';
import './HurdelsPage.css';
import hurdlesImage from './assets/hurdles.jpg';

const HurdlesPage = () => {
  // Reusable row (duplicated to create a seamless marquee)
  const Row = ({ prefix }) => (
    <ul className="tape__track" aria-hidden={prefix === 'B'}>
      {Array.from({ length: 10 }).map((_, i) => (
        <li className="tape__item" key={`${prefix}-${i}`}>
          <img src={hurdlesImage} alt="" className="hurdle-svg" />
          <span className="tape__text">HURDLES</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="hurdles-container">
      {/* HURDLES marquee band only (header removed) */}
      <section className="hurdles-tape" aria-label="Hurdles marquee">
        <div className="tape" data-variant="light">
          <Row prefix="A" />
          <Row prefix="B" />
        </div>
      </section>
    </div>
  );
};

export default HurdlesPage;
