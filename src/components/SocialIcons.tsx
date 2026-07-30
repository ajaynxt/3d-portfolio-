import { useEffect } from "react";
import { FaGithub, FaGlobe, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { TbArrowUpRight } from "react-icons/tb";
import { siteConfig } from "../config/site";
import HoverLinks from "./HoverLinks";
import "./styles/SocialIcons.css";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    let animationFrame = 0;
    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const link = item.querySelector<HTMLElement>("a");
      if (!link) return;

      const rect = item.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);
        animationFrame = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (event: MouseEvent) => {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const isNearIcon = x < 40 && x > 10 && y < 40 && y > 5;
        mouseX = isNearIcon ? x : rect.width / 2;
        mouseY = isNearIcon ? y : rect.height / 2;
      };

      document.addEventListener("mousemove", onMouseMove);
      cleanups.push(() => document.removeEventListener("mousemove", onMouseMove));
      updatePosition();
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span><a href={siteConfig.website} target="_blank" rel="noreferrer" aria-label="AJAY NXT website"><FaGlobe /></a></span>
        <span><a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a></span>
        <span><a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a></span>
        <span><a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a></span>
      </div>
      <a className="resume-button" href={siteConfig.booking} target="_blank" rel="noreferrer">
        <HoverLinks text="BOOK PROJECT" />
        <span><TbArrowUpRight /></span>
      </a>
    </div>
  );
};

export default SocialIcons;
