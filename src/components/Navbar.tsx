import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "../config/site";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".header ul a"));
    const cleanups: Array<() => void> = [];

    links.forEach((link) => {
      const onClick = (event: MouseEvent) => {
        if (window.innerWidth <= 1024) return;
        event.preventDefault();
        const section = link.getAttribute("data-href");
        if (section) smoother.scrollTo(section, true, "top top");
      };
      link.addEventListener("click", onClick);
      cleanups.push(() => link.removeEventListener("click", onClick));
    });

    const onResize = () => ScrollSmoother.refresh(true);
    window.addEventListener("resize", onResize);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("resize", onResize);
      smoother?.kill();
    };
  }, []);

  return (
    <>
      <header className="header">
        <a href={siteConfig.website} className="navbar-title" data-cursor="disable">
          {siteConfig.brand}
        </a>
        <a
          href={siteConfig.website}
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          ajaynxt.com
        </a>
        <nav aria-label="Portfolio navigation">
          <ul>
            <li>
              <a data-href="#about" href="#about"><HoverLinks text="ABOUT" /></a>
            </li>
            <li>
              <a data-href="#work" href="#work"><HoverLinks text="WORK" /></a>
            </li>
            <li>
              <a data-href="#contact" href="#contact"><HoverLinks text="CONTACT" /></a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="landing-circle1" aria-hidden="true"></div>
      <div className="landing-circle2" aria-hidden="true"></div>
      <div className="nav-fade" aria-hidden="true"></div>
    </>
  );
};

export default Navbar;
