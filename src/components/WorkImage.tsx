import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt: string;
  link?: string;
}

const WorkImage = ({ image, alt, link }: Props) => {
  const imageContent = (
    <>
      {link && (
        <div className="work-link" aria-hidden="true">
          <MdArrowOutward />
        </div>
      )}
      <img src={image} alt={alt} loading="lazy" decoding="async" />
    </>
  );

  return (
    <div className="work-image">
      {link ? (
        <a
          className="work-image-in"
          href={link}
          target="_blank"
          rel="noreferrer"
          data-cursor="disable"
          aria-label={`Open ${alt}`}
        >
          {imageContent}
        </a>
      ) : (
        <div className="work-image-in" aria-label={alt}>
          {imageContent}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
