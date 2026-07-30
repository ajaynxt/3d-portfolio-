import { PropsWithChildren } from "react";
import { siteConfig } from "../config/site";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const { intro } = siteConfig;

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>{intro.eyebrow}</h2>
          <h1>
            {intro.firstName}
            <br />
            <span>{intro.lastName}</span>
          </h1>
        </div>

        <div className="landing-info">
          <h3>{intro.lead}</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">{intro.rotatingPrimary[0]}</div>
            <div className="landing-h2-2">{intro.rotatingPrimary[1]}</div>
          </h2>
          <h2>
            <div className="landing-h2-info">{intro.rotatingSecondary[0]}</div>
            <div className="landing-h2-info-1">{intro.rotatingSecondary[1]}</div>
          </h2>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;
