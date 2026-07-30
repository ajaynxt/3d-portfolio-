import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "../config/site";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (!container) return;
        container.classList.remove("what-noTouch");
        const onClick = () => handleClick(container);
        container.addEventListener("click", onClick);
        cleanups.push(() => container.removeEventListener("click", onClick));
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <section className="whatIDO" aria-labelledby="services-title">
      <div className="what-box">
        <h2 className="title" id="services-title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>

      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2" aria-hidden="true">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          {siteConfig.services.map((service, index) => (
            <div
              className="what-content what-noTouch"
              ref={(element) => {
                containerRef.current[index] = element;
              }}
              key={service.label}
            >
              <div className="what-border1" aria-hidden="true">
                <svg height="100%">
                  {index === 0 && (
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  )}
                  <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                </svg>
              </div>
              <div className="what-corner" aria-hidden="true"></div>
              <div className="what-content-in">
                <h3>{service.label}</h3>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <h5>Services &amp; tools</h5>
                <div className="what-content-flex">
                  {service.tags.map((tag) => (
                    <div className="what-tags" key={tag}>{tag}</div>
                  ))}
                </div>
                <div className="what-arrow" aria-hidden="true"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");

  if (!container.parentElement) return;

  Array.from(container.parentElement.children).forEach((sibling) => {
    if (sibling !== container && sibling.classList.contains("what-content")) {
      sibling.classList.remove("what-content-active");
      sibling.classList.toggle("what-sibling");
    }
  });
}
