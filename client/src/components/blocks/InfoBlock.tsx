import { StrapiImage } from "../StrapiImage";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import type { InfoBlockProps } from "@/types";

export function InfoBlock({
  sectionId,
  theme,
  reversed = false,
  headline,
  content,
  image,
  cta,
}: Readonly<InfoBlockProps>) {
  return (
    <section className={`info info--${theme}`} id={sectionId}>
      <div className={`info__container section__wrapper ${reversed ? "info--reversed" : ""}`}>

        {image && (
          <StrapiImage
            src={image.url}
            alt={image.alternativeText || "No alternative text provided"}
            height={500}
            width={600}
            className="info__image"
          />
        )}
        <div className="info__text">
          <h2 className={`info__headline info__headline--${theme}`}>
            {headline}
          </h2>
          <div className="copy">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          {cta && cta.length > 0 && (
            <div className="info__ctas">
              {cta.map((ctaItem, index) => (
                <Link 
                  key={ctaItem.id || index} 
                  href={ctaItem.href} 
                  target={ctaItem.isExternal ? "_blank" : "_self"}
                >
                  <button className={`btn btn--medium btn--${theme}`}>
                    {ctaItem.text}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}