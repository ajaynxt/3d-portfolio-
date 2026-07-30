import { useCallback, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { siteConfig } from "../config/site";
import WorkImage from "./WorkImage";
import "./styles/Work.css";

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const projects = siteConfig.projects;

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      window.setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  }, [currentIndex, goToSlide, projects.length]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, goToSlide, projects.length]);

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="work-container section-container">
        <h2 id="work-title">
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container" aria-live="polite">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <article className="carousel-slide" key={project.title}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>{String(index + 1).padStart(2, "0")}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Highlights</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={`${project.title} project visual`}
                        link={"link" in project ? project.link : undefined}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="carousel-dots" aria-label="Project navigation">
            {projects.map((project, index) => (
              <button
                key={project.title}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Show ${project.title}`}
                aria-current={index === currentIndex ? "true" : undefined}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
