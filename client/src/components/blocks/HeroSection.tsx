import Link from "next/link";
import { StrapiImage } from "../StrapiImage";
import type { HeroSectionProps } from "@/types";

export function HeroSection({
  theme,
  heading,
  subheading,
  content,
  cta,
  image,
  logo,
  author,
  publishedAt,
  darken,
}: Readonly<HeroSectionProps>) {
  return (
    <section className="hero">

      {/* Background Image */}
      <div className="hero__background">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          className="hero__background-image"
          width={1920}
          height={1080}
        />
        {darken && <div className="hero__background__overlay"></div>}
      </div>

      {/* Headline */}
      <div className={`hero__headline hero__headline--${theme}`}>
        
        {subheading && <p className="hero__subheading h4">{subheading}</p>}

        <h1>{heading}</h1>

        {content && <p className="hero__content">{content}</p>}

        {/* Author and Published At */}
        {author && <p className="hero__author">{author}</p>}
        {publishedAt && <p className="hero__published-at">{publishedAt}</p>}
      </div>

      {/* CTA */}
      {cta && (
        <button className={`hero__cta btn btn--medium btn--${theme}`}>
          <Link href={cta.href} target={cta.isExternal ? "_blank" : "_self"}>
            {cta.text}
          </Link>
        </button>
      )}

      {/* Logo */}
      {logo && (
        <StrapiImage
          src={logo.image.url}
          alt={logo.image.alternativeText || "No alternative text provided"}
          className={`hero__logo hero__logo--${theme}`}
          width={120}
          height={120}
        />
      )}
    </section>
  );
}