import React, { useState } from 'react';
import './ProjectShowcase.css';
import clientVideo from "./assets/show.mp4";

const ProjectShowcase = () => {
  const [open, setOpen] = useState(false);

  const handleLearnMore = () => {
    console.log('Learn more clicked');
    // navigation logic if needed
  };

  return (
    <section className="project-hero">
      {/* Left copy */}
      <div className="hero-content">
        <h1 className="project-title">Project Name</h1>
        <p className="client-name">Client Name</p>
      </div>

      {/* Big right video */}
      <video 
        src={clientVideo} 
        className="hero-image"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      {/* Floating action button */}
      {!open ? (
        <button
          className="project-fab"
          aria-label="Open details"
          onClick={() => setOpen(true)}
        >
          +
        </button>
      ) : (
        <button
          className="project-fab project-fab-close"
          aria-label="Close details"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
      )}

      {/* Frosted details overlay */}
      {open && (
        <div
          className="project-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="project-glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Single image area that fits the screen */}
            <div className="project-card-media">
              <div className="project-media-frame">
                <video 
                  src={clientVideo} 
                  className="project-card-image"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Right side content */}
            <div className="project-card-copy">
              <p>
                Share information on a previous project here to attract new
                clients. To help visitors understand the context and background
                of the work, provide a brief summary. Include the project's time
                frame and scope, as well as its goals and outcome.
              </p>
              <p>
                Add details about why this project was created and what makes it
                significant. Explain how the business handled challenges and
                overcame obstacles to make this undertaking a success. Consider
                adding images or videos to showcase the project and engage
                viewers.
              </p>
              <button
                className="project-learn-button"
                onClick={handleLearnMore}
                type="button"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectShowcase;
