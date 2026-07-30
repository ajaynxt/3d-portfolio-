export const assetPath = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const siteConfig = {
  owner: "Ajay Saini",
  brand: "AJAY NXT",
  monogram: "AN",
  website: "https://ajaynxt.com",
  portfolioDomain: "https://3d.ajaynxt.com",
  email: "ajayx3neha@gmail.com",
  phoneDisplay: "+91 99295 62585",
  phoneHref: "+919929562585",
  location: "Shimla, India",
  education: "B.Sc. Mathematics",
  instagram: "https://www.instagram.com/ajay_nxt_/",
  github: "https://github.com/ajaynxt",
  whatsapp: "https://wa.me/919929562585",
  booking: "https://ajaynxt.com/#book",
  intro: {
    eyebrow: "Hello! I'm",
    firstName: "AJAY",
    lastName: "SAINI",
    lead: "WEB • APP •",
    rotatingPrimary: ["VIDEO", "VISUALS"],
    rotatingSecondary: ["DESIGNER", "CREATOR"],
  },
  about:
    "I am Ajay Saini, the creator behind AJAY NXT. I build premium websites, practical app experiences, admin systems and visual content for businesses that want a stronger digital presence and a clearer path to enquiries and sales.",
  services: [
    {
      label: "WEB & APP",
      title: "Digital Experiences Built for Business",
      description:
        "Responsive business websites, portfolio experiences, app interfaces and practical admin systems designed for smooth use on desktop and mobile.",
      tags: [
        "Website design",
        "React",
        "Firebase",
        "Admin panels",
        "Responsive UI",
        "Deployment",
      ],
    },
    {
      label: "VIDEO & VISUALS",
      title: "Creative Content That Supports the Brand",
      description:
        "Promotional videos, social reels, photo retouching and AI-assisted creative workflows shaped around the business, audience and platform.",
      tags: [
        "Video editing",
        "Motion graphics",
        "Colour grading",
        "Photo retouching",
        "Brand reels",
        "AI creative",
      ],
    },
  ],
  journey: [
    {
      title: "AJAY NXT",
      subtitle: "Independent digital studio",
      period: "NOW",
      description:
        "Creating websites, app experiences, admin workflows and visual content for restaurants, hotels, clinics, local businesses and new digital products.",
    },
    {
      title: "Diamond Restaurants",
      subtitle: "Client website and controls",
      period: "2026",
      description:
        "A responsive portfolio website for a restaurant, bakery and sweets brand, supported by an easier content-management workflow and final project handover.",
    },
    {
      title: "Demo Portfolio",
      subtitle: "Multi-industry website concepts",
      period: "LIVE",
      description:
        "A growing collection of business website demos for hospitality, logistics, interiors and other client categories.",
    },
    {
      title: "Move To Go",
      subtitle: "Mobility product concept",
      period: "BUILD",
      description:
        "Customer, rider and admin experience planning for rides, parcel delivery, live tracking, OTP flows and daily operations.",
    },
  ],
  projects: [
    {
      title: "Diamond Restaurants",
      category: "Restaurant Website + Admin Workflow",
      tools:
        "Responsive experience, premium presentation, editable content and business-focused calls to action",
      image: assetPath("images/ajaynxt-diamond.webp"),
      link: "https://diamondrestaurants.com",
    },
    {
      title: "Hospitality Concept",
      category: "Luxury Hotel & Palace Website Direction",
      tools:
        "Cinematic visual direction, premium motion, immersive storytelling and responsive presentation",
      image: assetPath("images/ajaynxt-rajmahal.webp"),
      link: "https://demos.ajaynxt.com/#portfolio",
    },
    {
      title: "AJAY NXT Demo Portfolio",
      category: "Multi-industry Website Showcase",
      tools:
        "Live website concepts for restaurants, hotels, logistics, interiors and growing local businesses",
      image: assetPath("images/ajaynxt-demos.webp"),
      link: "https://demos.ajaynxt.com/#portfolio",
    },
    {
      title: "Move To Go",
      category: "Mobility Product Architecture",
      tools:
        "Customer app, rider app, admin dashboard, live location, OTP and delivery workflows",
      image: assetPath("images/ajaynxt-movetogo.webp"),
    },
  ],
} as const;
