

import "./HeroSection.css";
function Sparkel() {
  return (
    <div>
        {/* ✨ Sparkle Section with Curved Dotted Snake and Animated Numbers */}
<div className="sparkle-section">
  <svg
    className="sparkle-path-svg"
    viewBox="0 0 400 1600"
    preserveAspectRatio="none"
  >
    <path
  id="mainSnakePath"
  d="M200 50 
     C350 250, 50 500, 300 700 
     S100 1100, 250 1350 
     S300 1600, 200 1550"
  stroke="#ffffffa5"
  strokeWidth="3"
  strokeDasharray="8 14"
  fill="none"
/>

  </svg>

  

  <div className="sparkle-item" style={{ top: "200px", left: "50%" }}>
  <div className="sparkle-content">
    <div className="small-star"></div>
    <div className="big-number">1,034</div>
  </div>
  <div className="sparkle-sub">Sample Data about Sample Things</div>
</div>

  <div className="sparkle-item" style={{ top: "600px", left: "50%" }}>
  <div className="sparkle-content">
    <div className="small-star"></div>
    <div className="big-number">2</div>
  </div>
  <div className="sparkle-sub">Sample Data about Sample Things</div>
</div>

  <div className="sparkle-item" style={{ top: "1000px", left: "50%" }}>
  <div className="sparkle-content">
    <div className="small-star"></div>
    <div className="big-number">34</div>
  </div>
  <div className="sparkle-sub">Sample Data about Sample Things</div>
</div>

  <div className="sparkle-item" style={{ top: "1400px", left: "50%" }}>
  <div className="sparkle-content">
    <div className="small-star"></div>
    <div className="big-number">25</div>
  </div>
  <div className="sparkle-sub">Sample Data about Sample Things</div>
</div>

</div>
    </div>
  );
}

export default Sparkel;
