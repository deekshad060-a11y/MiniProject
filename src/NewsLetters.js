import React from "react";
import "./HeroSection.css";
import signature from "./assets/signature.svg";
function Newsletter() {
  return (
    <div>
{/* 📰 Newsletter + Footer Section */}
<section className="newsletter-section">
  <div className="newsletter-content">
    <h2>
      Be the First to Receive the Latest News
    </h2>
    <button className="newsletter-btn">
      Sign Up <span>→</span>
    </button>
  </div>

  <footer className="footer">
    <div className="footer-top">
      <div className="footer-brand">
  <div className="footer-logo"></div>
  <p className="brand-name">Brington</p>
</div>


      <div className="footer-links">
        <div>
          <h4>Navigation</h4>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4>Social</h4>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Youtube</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>info@mysite.com</li>
            <li>Tel. 123-456-7890</li>
            <li>India</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2035 by Brington Inc</p>
      <p>
        Built with love and caffeine by <span className="signature">
          <img
              src={signature}
              alt="signature"
              style={{ height: 24, verticalAlign: "middle", marginLeft: 9, filter: "invert(1)" }}
            /></span>
      </p>
    </div>
  </footer>
</section>

    </div>
  );
}

export default Newsletter;
