import { ReactIcon } from "@/components/elements/ReactIcon";
import Link from "next/link";

import type { ServicesSectionProps } from "@/types";

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
  console.log(icon);
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
  theme,
  heading,
  subheading,
  services,
  cta,
}: // columns = 3,
Readonly<ServicesSectionProps>) {
  const columns = 3;

  return (
    <section className={`services services--${theme}`}>
      <div className="services__header">
        {subheading && <p className="services__subheading">{subheading}</p>}
        <h2 className={`services__heading services__heading--${theme}`}>
          {heading}
        </h2>
      </div>

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
    </section>
  );
}
