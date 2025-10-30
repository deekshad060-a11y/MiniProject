import "./HeroSection.css";
import ChatWidget from "./ChatWidget";
function HeroBanner() {
  return (
    <div>
        {/* 🌅 Hero Section */}
      <div
        className="hero-container"
        style={{
          backgroundImage: "url('/hero.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="navbar">
        <span
            onClick={() => (window.location.href = "https://www.brington.in/")}
            style={{ cursor: "pointer" }}
        >
        Home
        </span>
        </div>

        <div className="hero-content">
  <h1 className="hero-title">I am a Sample<br></br> Website</h1>
  <p className="hero-subtitle">
    I'm a Sample <br></br>Website, Create me <br></br>as same as I am, <br />
    Don't Do any <br></br>Mistakes.
  </p>
  <button
    className="hero-btn"
    onClick={() => (window.location.href = "https://www.brington.in/")}
  >
    Get Started
  </button>
</div>
        <ChatWidget />
      </div>

    </div>
  );
}

export default HeroBanner;
