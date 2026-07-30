import { siteConfig } from "../config/site";
import "./styles/About.css";

const About = () => {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-me">
        <h3 className="title" id="about-title">About {siteConfig.brand}</h3>
        <p className="para">{siteConfig.about}</p>
      </div>
    </section>
  );
};

export default About;
