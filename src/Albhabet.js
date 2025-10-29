import React, { useState, useRef, useEffect } from "react";
import avideo from "../assets/avideo.mp4";
import bvideo from "../assets/bvideo.mp4";
import cvideo from "../assets/cvideo.mp4";
import dvideo from "../assets/dvideo.mp4";
import evideo from "../assets/evideo.mp4";
import fvideo from "../assets/fvideo.mp4";

import alphafoot from "../assets/alphafoot.jpg";
import gridfoot from "../assets/gridfoot.jpg";

const Alphabet = () => {
  const [activeLetter, setActiveLetter] = useState("A");
  const videoRef = useRef(null);

  const videos = {
    A: avideo,
    B: bvideo,
    C: cvideo,
    D: dvideo,
    E: evideo,
    F: fvideo,
  };

  // Play video safely
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay blocked, fallback: wait for user interaction
          console.log("Autoplay blocked, waiting for interaction:", err);
          const playOnClick = () => {
            video.play().catch(console.log);
            window.removeEventListener("click", playOnClick);
          };
          window.addEventListener("click", playOnClick);
        });
      }
    }
  }, [activeLetter]);

  const containerStyle = {
    display: "flex",
    width: "100vw",
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  };

  const leftStyle = {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000",
  };

  const rightStyle = {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000",
  };

  const videoStyle = {
    width: "100%",
    height: "70%",
    objectFit: "cover",
  };

  const imageStyle = {
    width: "100%",
    height: "30%",
    objectFit: "cover",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    backgroundColor: "#000",
    border: "1px solid #fff",
    height: "calc(100% - 60px)",
    minHeight: "300px",
  };

  const cellStyle = {
    backgroundColor: "#000",
    color: "#fff",
    fontSize: "48px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "1px solid #fff",
    overflow: "hidden",
  };

  const handleMouseEnter = (letter) => {
    setActiveLetter(letter);
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        <video
          ref={videoRef}
          key={activeLetter}
          src={videos[activeLetter]}
          autoPlay
          muted
          loop
          playsInline
          style={videoStyle}
        />
        <img src={gridfoot} alt="Grid Footer" style={imageStyle} />
      </div>

      <div style={rightStyle}>
        <div style={gridStyle}>
          {Object.keys(videos).map((letter) => {
            const isActive = activeLetter === letter;
            return (
              <div
                key={letter}
                style={{
                  ...cellStyle,
                  ...(isActive && {
                    backgroundColor: "#fff",
                    color: "#000",
                  }),
                }}
                onMouseEnter={() => handleMouseEnter(letter)}
              >
                <span
                  style={{
                    display: "inline-block",
                    transition: "transform 0.3s",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {letter}
                </span>
              </div>
            );
          })}
        </div>
        <img src={alphafoot} alt="Alpha Footer" style={imageStyle} />
      </div>
    </div>
  );
};

export default Alphabet;
