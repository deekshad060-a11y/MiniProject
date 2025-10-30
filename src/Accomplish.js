import React, { useEffect } from "react";
import "./HeroSection.css";
import CenterIcon from "./assets/center-icon.png";
import { ReactComponent as BgCircle } from "./assets/circlesvg.svg"; // ✅ make sure this file exists

function Accomplish() {
  useEffect(() => {
    const items = document.querySelectorAll(".accomplish-item");
    const centerIcon = document.querySelector(".accomplish-circle");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = [...items];
            elements.forEach((el, index) => {
              setTimeout(() => el.classList.add("show"), index * 200);
            });
            centerIcon?.classList.add("show-center");

            // stop observing once animation triggers
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <section className="accomplish-section">
        <h2 className="accomplish-heading">
          Accomplish<br /> Anything in <br /> Developing
        </h2>
        <p className="accomplish-subtext">
          This is the space to introduce the Services section. Briefly describe
          the <br />types of services offered and highlight any special benefits or
          features.
        </p>

        <div className="accomplish-container">
          <div className="accomplish-left">
            <div className="accomplish-item left">
              <span className="bullet"></span> Sample Text 1
            </div>
            <div className="accomplish-item left">
              <span className="bullet"></span> Sample Text
            </div>
            <div className="accomplish-item left">
              <span className="bullet"></span> Sample Text
            </div>
          </div>

          <div className="accomplish-center">
            <BgCircle className="accomplish-circle" />
            <div className="center-icon-wrapper">
              <img src={CenterIcon} alt="icon" className="center-icon" />
            </div>
          </div>

          <div className="accomplish-right">
            <div className="accomplish-item right">
              <span className="bullet"></span> Sample Text
            </div>
            <div className="accomplish-item right">
              <span className="bullet"></span> Sample Text
            </div>
            <div className="accomplish-item right">
              <span className="bullet"></span> Sample Text
            </div>
          </div>
        </div>

        <a
          onClick={() => (window.location.href = "https://www.brington.in/")}
          target="_blank"
          rel="noopener noreferrer"
          className="create-btn"
        >
          Create Now!
        </a>
      </section>
    </div>
  );
}

export default Accomplish;
