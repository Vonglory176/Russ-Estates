import { ReactIcon } from "@/components/elements/ReactIcon";
import Link from "next/link";

import type { ServicesSectionProps } from "@/types";
import { StrapiImage } from "../StrapiImage";

function ServiceCard({
  title,
  description,
  icon,
  link,
}: {
  title: string;
  description: string;
  icon: any;
  link?: any;
}) {
  const CardContent = (
    <div className="service-card">
      {icon && (
        <div className="service-card__icon">
          {/* <StrapiImage
          src={icon.url}
          alt={icon.alternativeText || `${title} icon`}
          width={80}
          height={80}
        /> */}

          <ReactIcon
            name={icon.name}
            color={icon.color}
            size={icon.size || 80}
            className="service-card__icon-img"
          />
        </div>
      )}
      <h3 className="service-card__title h4">{title}</h3>
      <p className="service-card__description">{description}</p>
      {link && <span className="service-card__link">{link.text} →</span>}
    </div>
  );

  if (link) {
    return (
      <Link
        href={link.href}
        target={link.isExternal ? "_blank" : "_self"}
        className="service-card__wrapper"
      >
        {CardContent}
      </Link>
    );
  }

  return <div className="service-card__wrapper">{CardContent}</div>;
}

export function ServicesSection({
  sectionId,
  theme,
  heading,
  subheading,
  services,
  cta,
  backgroundImage,
  backgroundOverlay,
}: // columns = 3,
Readonly<ServicesSectionProps>) {
  const columns = 3;

  return (
    <section className={`services services--${theme}`} id={sectionId}>

      {/* Background Image */}
      {backgroundImage && (
        <div className="services__background">
          <StrapiImage
            src={backgroundImage.url}
            alt={backgroundImage.alternativeText || "No alternative text provided"}
            className="services__background-image"
            width={1920}
            height={1080}
          />
          {backgroundOverlay && <div className={`services__background__overlay services__background__overlay--${backgroundOverlay}`}></div>}
        </div>
      )}

      <div className="services__container section__wrapper">

        {/* Header */}
        <div className="services__header">
          {subheading && <p className="services__subheading">{subheading}</p>}
          <h2 className={`services__heading services__heading--${theme}`}>
            {heading}
          </h2>
        </div>

        {/* Services */}
        <div className={`services__grid services__grid--${columns}-cols`}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
            />
          ))}
        </div>

        {/* CTA */}
        {cta && cta.length > 0 && (
            <div className="services__ctas">
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
      
    </section>
  );
}
