import React, { useEffect, useRef, useState } from "react";
import "./HeroSection.css";
import ChatWidget from "./ChatWidget";
import ProjectShowcase from "./ProjectShowcase";
import { FaCheckCircle } from "react-icons/fa";
import { ReactComponent as BgCircle } from "./assets/circlesvg.svg";
import CenterIcon from "./assets/center-icon.png";
import HurdlesPage from "./HurdelsPage";
import AboutTheRace from "./AboutTheRace";
import Alphabet from "./Albhabet";
import Newsletter from "./NewsLetters";
import Speakers from "./Speakers";
import Accomplish from "./Accomplish";
import Sparkel from "./Sparkel";
import Numbers from "./Numbers";
import HeroBanner from "./HeroBanner";
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

  // ... your remaining JSX (unchanged)

  return (
    <div>
     

<section>
  <HeroBanner />
</section>

<section>
  <Numbers />
</section>


<section>
  <Sparkel />
</section>
<section> 
  <Accomplish />
</section>
      

<section>
  <HurdlesPage />
</section>
<section>
  <AboutTheRace />
</section>
<section>
  <ProjectShowcase />
</section>



<section>
  <Alphabet />
</section>





<section>
  <Speakers />
</section>


<section>
  <Newsletter />
</section>
    </div>
  );
};

export default HeroSection;
