import { ReactIcon } from "@/components/elements/ReactIcon";
import Link from "next/link";

import type { ServicesSectionProps } from "@/types";

function ServiceCard({ title, description, icon, link }: {
  title: string;
  description: string;
  icon: any;
  link?: any;
}) {
  console.log(icon);
  const CardContent = (
    <div className="service-card">
      <div className="service-card__logo">

        {/* <StrapiImage
          src={icon.url}
          alt={icon.alternativeText || `${title} icon`}
          width={80}
          height={80}
        /> */}
          
        {icon && (
          <ReactIcon
            name={icon.name}
            color={icon.color}
            size={icon.size || 80}
            className="service-card__logo-img"
          />
        )}
      </div>
      <h3 className="service-card__title h4">{title}</h3>
      <p className="service-card__description">{description}</p>
      {link && (
        <span className="service-card__link">
          {link.text} →
        </span>
      )}
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
  // theme,
  heading,
  subheading,
  services,
  // columns = 3,
}: Readonly<ServicesSectionProps>) {

  const theme = "test"
  const columns = 3

  return (
    <section className={`services services--${theme}`}>
      <div className="services__header">
        {subheading && (
          <p className="services__subheading">{subheading}</p>
        )}
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
    </section>
  );
} 