import "./HeroSection.css";

function Numbers() {
  return (
    <div>
            {/* 📊 Numbers Section */}
<div className="numbers-section">
  <h3>Sample Numbers</h3>
  <h2>Row No. 1</h2>
  <div className="scroll-wrapper">
    <div className="scroll-row row1">
      <div className="number-box">
      61<span className="unit-right">Unit</span>
      </div>
      <div className="number-box">
        73<span className="unit-right">Unit</span>
      </div>
      <div className="number-box">
      89<span className="unit-right">Unit</span>
      </div>
      <div className="number-box">
       102<span className="unit-right">Unit</span>
      </div>
      <div className="number-box">
       +102<span className="unit-right">Unit</span>
      </div>
    </div>
  </div>

  <h3>Sample Numbers</h3>
  <h2>Row No. 2</h2>
  <div className="scroll-wrapper">
    <div className="scroll-row row2">
      <div className="number-box">
        49<span className="unit-right">Unit</span>
      </div>
      <div className="number-box">
        59<span className="unit-right">Unit</span>
      </div>
      <div className="number-box">
        71<span className="unit-right">Unit</span>
      </div>
      <div className="number-box">
        81<span className="unit-right">Unit</span>
      </div>
      <div className="number-box">
        +81<span className="unit-right">Unit</span>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default Numbers;
