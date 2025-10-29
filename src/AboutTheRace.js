import React, { useEffect, useRef, useState } from "react";
import zoomImg from "./assets/zoomimg2.jpg"; // replace with fp8.jpg if that's the one you want

const AboutTheRace = () => {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const currentImage = imageRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    const handleScroll = () => {
      if (currentImage && isVisible) {
        const rect = currentSection.getBoundingClientRect();
        const scrollPercent =
          (window.innerHeight - rect.top) /
          (window.innerHeight + rect.height);

        const scale = 1 + scrollPercent * 0.3; // subtle zoom
        const translateY = 50 - scrollPercent * 100; // gentle movement

        // Fixed: Added backticks around the template literal
        currentImage.style.transform = `translateY(${translateY}px) scale(${scale})`;
        currentImage.style.opacity = 0.7 + scrollPercent * 0.3;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isVisible]);

  return (
    <div>
      {/* ABOUT SECTION */}
      <section ref={sectionRef} style={aboutSectionStyle}>
        <div style={textWrapperStyle}>
          <h1 style={headingStyle}>ABOUT</h1>
          <h1 style={headingStyle}>THE RACE</h1>

          <div style={tightTextBlock}>
            <p style={paragraphStyle}>This is a race of yourself to yourself.</p>
            <p style={paragraphStyle}>Fight the race! Develope the website.</p>
            <p style={paragraphStyle}>Complete the task.</p>
            <p style={lastParagraphStyle}>
              As a developer, it's <span style={highlightStyle}>Not That hard</span>.
            </p>
          </div>
        </div>
      </section>

      {/* FULL PAGE ZOOM IMAGE */}
      <section style={imageSectionStyle}>
        <img
          ref={imageRef}
          src={zoomImg} // 👈 replace with fp8.jpg
          alt="Race Visualization"
          style={imageStyle}
        />
      </section>
    </div>
  );
};

/* ===== Styles ===== */

const aboutSectionStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #00a67e 0%, #ffffff 100%)", // ✅ gradient like screenshot
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "0 20px",
  fontFamily: "'Arial', sans-serif",
  color: "white",
};

const textWrapperStyle = {
  maxWidth: "800px",
};

const headingStyle = {
  fontSize: "3rem",
  fontWeight: "bold",
  margin: "0",
  lineHeight: "1.2",
  letterSpacing: "1px",
};

const tightTextBlock = {
  marginTop: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const paragraphStyle = {
  fontSize: "1.2rem",
  lineHeight: "1.4",
  margin: "0",
  color: "#f5f5f5",
  fontWeight: "300",
};

const lastParagraphStyle = {
  fontSize: "1.2rem",
  lineHeight: "1.4",
  margin: "0",
  color: "#f5f5f5",
  fontWeight: "300",
};

const highlightStyle = {
  color: "#fff",
  fontWeight: "bold",
  fontStyle: "italic",
};

const imageSectionStyle = {
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  background: "#fff", // ✅ matches screenshot white floor
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transform: "translateY(50px) scale(1)",
  transition: "transform 0.05s ease-out, opacity 0.05s ease-out",
  opacity: "0.8",
};

export default AboutTheRace;