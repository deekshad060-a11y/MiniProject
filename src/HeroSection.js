import React, { useEffect, useRef, useState } from "react";
import "./HeroSection.css";
import ChatWidget from "./ChatWidget";
import ProjectShowcase from "./ProjectShowcase";
const HeroSection = () => {
  const lastScrollY = useRef(0);
  const [scrollDir, setScrollDir] = useState("down");
  const sparkleRefs = useRef([]); // ✅ added this line to fix the error
const [activeLetter, setActiveLetter] = useState("A");
const [clickedLetter, setClickedLetter] = useState(null);
const [showProjectOverlay, setShowProjectOverlay] = useState(false);

  // Track scroll direction
  useEffect(() => {
    const handleScrollDir = () => {
      const currentY = window.scrollY;
      setScrollDir(currentY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScrollDir);
    return () => window.removeEventListener("scroll", handleScrollDir);
  }, []);

  const hurdlesRef = useRef(null);

  useEffect(() => {
    const hurdles = document.querySelectorAll(".hurdle");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If section is visible → zoom in
          if (entry.isIntersecting) {
            hurdles.forEach((img) => img.classList.add("zoom-in"));
            hurdles.forEach((img) => img.classList.remove("zoom-out"));
          } 
          // If section is not visible → zoom out
          else {
            hurdles.forEach((img) => img.classList.remove("zoom-in"));
            hurdles.forEach((img) => img.classList.add("zoom-out"));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (hurdlesRef.current) {
      observer.observe(hurdlesRef.current);
    }

    return () => {
      if (hurdlesRef.current) observer.unobserve(hurdlesRef.current);
    };
  }, []);

  // Horizontal scroll animation for rows
  useEffect(() => {
    const handleScroll = () => {
      const rows = document.querySelectorAll(".scroll-row");
      rows.forEach((row, i) => {
        const speed = i % 2 === 0 ? -0.25 : 0.25;
        const offset = window.scrollY * speed;
        row.style.transform = `translateX(${offset}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle letter click (A-F)
  const handleLetterClick = (letter) => {
    setActiveLetter(letter);
  };

  useEffect(() => {
  const container = sparkleRefs.current[0];
  if (!container) return;

  const path = container.querySelector("path");
  const star = container.querySelector(".star");
  const items = container.querySelectorAll(".sparkle-item");
  const pathLen = path.getTotalLength();

  const updateSparkles = () => {
    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.9;
    const end = -vh * 0.3;
    let scrollProgress = (start - rect.top) / (start - end);
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));

    // Move star along path
    const point = path.getPointAtLength(scrollProgress * pathLen);
    star.style.transform = `translate(${point.x}px, ${point.y}px) scale(${
      0.8 + 0.3 * Math.sin(scrollProgress * Math.PI)
    })`;
    star.style.opacity = `${Math.min(1, scrollProgress * 1.5)}`;
    path.style.strokeDashoffset = `${(1 - scrollProgress) * pathLen}`;

    // Move each sparkle item (number + subtitle)
    items.forEach((item, i) => {
      const offset = (i + 1) / (items.length + 1);
      const itemProgress = Math.min(1, Math.max(0, scrollProgress - 0.1 + offset * 0.3));
      const p = path.getPointAtLength(itemProgress * pathLen);
      item.style.transform = `translate(${p.x - 80}px, ${p.y - 40}px)`;
      item.style.opacity = itemProgress > 0.05 && itemProgress < 1 ? "1" : "0";
    });
  };

  updateSparkles();
  window.addEventListener("scroll", updateSparkles, { passive: true });
  window.addEventListener("resize", updateSparkles);
  return () => {
    window.removeEventListener("scroll", updateSparkles);
    window.removeEventListener("resize", updateSparkles);
  };
}, []);



const [currentSlide, setCurrentSlide] = useState(0);

const handleNextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % 2);
};

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % 2);
  }, 5000); // auto-change every 5s
  return () => clearInterval(interval);
}, []);

useEffect(() => {
  document.documentElement.style.setProperty("--slide-0", currentSlide === 0 ? 1 : 0);
  document.documentElement.style.setProperty("--slide-1", currentSlide === 1 ? 1 : 0);
}, [currentSlide]);


useEffect(() => {
  const cards = document.querySelectorAll(".animate-on-scroll");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // visible -> slide into view from left
          el.classList.remove("slide-out-left", "slide-out-right");
          el.classList.add("slide-in");
        } else {
          // not visible -> decide exit direction based on scrollDir
          el.classList.remove("slide-in");
          if (scrollDir === "up") {
            // user is scrolling up -> move the element to the right
            el.classList.add("slide-out-right");
            el.classList.remove("slide-out-left");
          } else {
            // user is scrolling down -> move the element to the left
            el.classList.add("slide-out-left");
            el.classList.remove("slide-out-right");
          }
        }
      });
    },
    {
      threshold: 0.15, // tweak to taste
      root: null,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  cards.forEach((c) => observer.observe(c));
  return () => observer.disconnect();
}, [scrollDir]); // re-run when scroll direction updates

useEffect(() => {
  const items = document.querySelectorAll(".sparkle-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const fromLeft = i % 2 === 0; // alternate direction
          el.classList.add(fromLeft ? "reveal-left" : "reveal-right");
          el.classList.add("visible");
        }
      });
    },
    { threshold: 0.4 }
  );

  items.forEach((item) => observer.observe(item));
  return () => observer.disconnect();
}, []);


useEffect(() => {
    const items = document.querySelectorAll(".accomplish-item");
    const centerIcon = document.querySelector(".circle-inner");

    // 👇 Animate left/right items with stagger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = [...items];
            elements.forEach((el, index) => {
              setTimeout(() => el.classList.add("show"), index * 200);
            });
            centerIcon.classList.add("show-center");
          }
        });
      },
      { threshold: 0.3 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);
  // ... your remaining JSX (unchanged)

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

  <div className="star">
    <div className="star-core"></div>
    <div className="star-glow"></div>
  </div>

  <div className="sparkle-item" style={{ top: "200px", left: "50%" }}>
  <div className="sparkle-content">
    <div className="small-star"></div>
    <div className="big-number">1,034</div>
  </div>
  <div className="sparkle-sub">Sample Data about Sample Things</div>
</div>

  <div className="sparkle-item" style={{ top: "400px", left: "50%" }}>
  <div className="sparkle-content">
    <div className="small-star"></div>
    <div className="big-number">2</div>
  </div>
  <div className="sparkle-sub">Sample Data about Sample Things</div>
</div>

  <div className="sparkle-item" style={{ top: "600px", left: "50%" }}>
  <div className="sparkle-content">
    <div className="small-star"></div>
    <div className="big-number">34</div>
  </div>
  <div className="sparkle-sub">Sample Data about Sample Things</div>
</div>

  <div className="sparkle-item" style={{ top: "800px", left: "50%" }}>
  <div className="sparkle-content">
    <div className="small-star"></div>
    <div className="big-number">25</div>
  </div>
  <div className="sparkle-sub">Sample Data about Sample Things</div>
</div>

</div>



      <section className="accomplish-section">
      <h2 className="accomplish-heading">
        Accomplish<br /> Anything in <br /> Developing
      </h2>
      <p className="accomplish-subtext">
        This is the space to introduce the Services section. Briefly describe
        the <br />types of services offered and  highlight any special benefits or
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
          <div className="circle-pattern">
            <div className="circle-inner">
              <img src="/Peca App.avif" alt="center-icon" />
            </div>
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
        href="https://www.brington.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="create-btn"
      >
        Create  Now!
      </a>
    </section>

      <section className="hurdles-section">
        <div className="hurdles-banner">
          <div className="hurdles-track">
            <span>
              <img src="/image.png" alt="" /> HURDLES &nbsp;
              <img src="/image.png" alt="" /> HURDLES &nbsp;
              <img src="/image.png" alt="" /> HURDLES &nbsp;
            </span>
            <span>
              <img src="/image.png" alt="" /> HURDLES &nbsp;
              <img src="/image.png" alt="" /> HURDLES &nbsp;
              <img src="/image.png" alt="" /> HURDLES &nbsp;
            </span>
          </div>
        </div>
<div className="background">
        {/* 🏁 About Race */}
        <div className="about-race">
          <h2>
            ABOUT <br /> THE RACE
          </h2>
          <p>
            This is a race of yourself to yourself.
            <br />
            Fight the race! Develop the website.
            <br />
            Complete the task.
            <br />
            As a developer, it’s Not That hard.
          </p>
        </div>
        <div className="hurdles-image-container">
            <img src="/img.png" alt="Hurdle 1" className="hurdle hurdle1" />
            <img src="/img.png" alt="Hurdle 2" className="hurdle hurdle2" />
            <img src="/img.png" alt="Hurdle 3" className="hurdle hurdle3" />
            <img src="/img.png" alt="Hurdle 4" className="hurdle hurdle4" />
          </div>

        </div>
      </section>

      {/* 🖼️ Zooming Hurdles */}
      <section className="hurdles-image-section" ref={hurdlesRef}>
        
      </section>


<section>
  <ProjectShowcase />
</section>

<section className="az-section">
  {/* Left-side image card */}
  <div className="az-image-card">
    <div className="az-card-body">
      <img
        src={`/bg-${activeLetter || "A"}.jpg`}
        alt="background grid"
        className="az-background-img"
      />
      <img
        src={`/${activeLetter || "A"}.png`}
        alt={activeLetter || "A"}
        className="az-letter-overlay show"
      />
    </div>
  </div>

  {/* Right-side grid */}
  <div className="az-grid">
    {["A", "B", "C", "D", "E", "F"].map((letter) => (
      <div
        key={letter}
        className={`az-box ${activeLetter === letter ? "active" : ""}`}
        onMouseEnter={() => setActiveLetter(letter)} // hover updates image
        onClick={() => setActiveLetter(letter)} // click keeps it
      >
        {letter}
      </div>
    ))}
    <div className="az-text">
  <h3>A-Z PROJECT</h3>
  <p>It’s over to you. Download our library of <br></br>transparent video letters and add them <br></br>to your next project.</p>
</div>
  </div>
  
</section>






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



{/* 📰 Newsletter + Footer Section */}
<section className="newsletter-section">
  <div className="newsletter-content">
    <h2>
      Be the First to Receive the Latest <br /> News
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
        Built with love and caffeine by <span className="signature">☕</span>
      </p>
    </div>
  </footer>
</section>


    </div>
  );
};

export default HeroSection;
