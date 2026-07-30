import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { siteConfig } from "../config/site";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <footer className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Direct contact</h4>
            <p>
              <a href={`tel:${siteConfig.phoneHref}`} data-cursor="disable">
                {siteConfig.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} data-cursor="disable">
                {siteConfig.email}
              </a>
            </p>
            <h4>Profile</h4>
            <p>{siteConfig.location}</p>
            <p>{siteConfig.education}</p>
          </div>

          <div className="contact-box">
            <h4>Connect</h4>
            <ContactLink href={siteConfig.website}>Website</ContactLink>
            <ContactLink href={siteConfig.whatsapp}>WhatsApp</ContactLink>
            <ContactLink href={siteConfig.instagram}>Instagram</ContactLink>
            <ContactLink href={siteConfig.github}>GitHub</ContactLink>
          </div>

          <div className="contact-box">
            <h2>
              Designed for business <br /> by <span>{siteConfig.brand}</span>
            </h2>
            <h5>
              <MdCopyright /> 2026 {siteConfig.owner}
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ContactLink = ({ href, children }: { href: string; children: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    data-cursor="disable"
    className="contact-social"
  >
    {children} <MdArrowOutward />
  </a>
);

export default Contact;
