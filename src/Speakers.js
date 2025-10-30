import React from "react";
import "./HeroSection.css";
function Speakers() {
  return (
    <div>
        {/* 🎤 Speakers Section */}
<section className="speakers-section">
  <h2 className="speakers-heading">Speakers</h2>

  <div className="speakers-grid">
    {[
      {
        name: "Harry Williams",
        role: "Director of Mobile Gaming, Fixer",
        img: "/speaker2.jpg",
        link: "https://www.linkedin.com/company/wix-com"
      },
      {
        name: "Akira Lee",
        role: "Director of Mobile Gaming, Fixer",
        img: "/speaker8.jpg",
        link: "https://www.linkedin.com/company/wix-com"
      },
      {
        name: "Veronika Zakharova",
        role: "Director of Mobile Gaming, Fixer",
        img: "/speaker3.jpg",
        link: "https://www.linkedin.com/company/wix-com"
      },
      {
        name: "Ann Jacobs",
        role: "Director of Mobile Gaming, Fixer",
        img: "/speaker7.jpg",
        link: "https://www.linkedin.com/company/wix-com"
      },
      {
        name: "Lissa Cross",
        role: "Director of Mobile Gaming, Fixer",
        img: "/speaker4.jpg",
        link: "https://www.linkedin.com/company/wix-com"
      },
      {
        name: "Murty Yang",
        role: "Director of Mobile Gaming, Fixer",
        img: "/speaker5.jpg",
        link: "https://www.linkedin.com/company/wix-com"
      },
      {
        name: "Sheldon Smith",
        role: "Director of Mobile Gaming, Fixer",
        img: "/speaker1.jpg",
        link: "https://www.linkedin.com/company/wix-com"
      },
      {
        name: "Jason Guhl",
        role: "Director of Mobile Gaming, Fixer",
        img: "/speaker6.jpg",
        link: "https://www.linkedin.com/company/wix-com"
      },
    ].map((speaker, index) => (
      <div
        key={index}
        className={`speaker-card animate-on-scroll`}
        style={{ transitionDelay: `${index * 0.2}s` }}
      >
        <div className="speaker-info">
          <img src={speaker.img} alt={speaker.name} className="speaker-img" />
          <div>
            <h3>{speaker.name}</h3>
            <p>{speaker.role}</p>
          </div>
          <button
            className="linkedin-btn"
            onClick={() => window.open(speaker.link, "_blank")}
          >
            LinkedIn
          </button>
        </div>
      </div>
    ))}
  </div>
</section>
    </div>
  );
}

export default Speakers;
