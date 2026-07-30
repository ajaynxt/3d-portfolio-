import { siteConfig } from "../config/site";
import "./styles/Career.css";

const Career = () => {
  return (
    <section className="career-section section-container" aria-labelledby="journey-title">
      <div className="career-container">
        <h2 id="journey-title">
          Selected work <span>&amp;</span>
          <br /> product journey
        </h2>
        <div className="career-info">
          <div className="career-timeline" aria-hidden="true">
            <div className="career-dot"></div>
          </div>

          {siteConfig.journey.map((item) => (
            <article className="career-info-box" key={`${item.title}-${item.period}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.title}</h4>
                  <h5>{item.subtitle}</h5>
                </div>
                <h3>{item.period}</h3>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
