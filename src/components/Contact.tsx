import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Direct contact</h4>
            <p><a href="tel:+919929562585" data-cursor="disable">+91 99295 62585</a></p>
            <p><a href="mailto:ajayx3neha@gmail.com" data-cursor="disable">ajayx3neha@gmail.com</a></p>
            <h4>Services</h4>
            <p>Websites · App UI · Admin Systems</p>
            <p>Video Editing · Photo Retouching · AI Creative</p>
          </div>

          <div className="contact-box">
            <h4>Connect</h4>
            <a href="https://ajaynxt.com" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              Website <MdArrowOutward />
            </a>
            <a href="https://wa.me/919929562585" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              WhatsApp <MdArrowOutward />
            </a>
            <a href="https://www.instagram.com/ajay_nxt_/" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              Instagram <MdArrowOutward />
            </a>
            <a href="https://www.linkedin.com/in/ajaynxt/" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              LinkedIn <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box">
            <h2>
              Designed and developed <br /> by <span>AJAY NXT</span>
            </h2>
            <h5><MdCopyright /> 2026</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
