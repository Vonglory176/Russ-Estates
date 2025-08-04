import { DynamicContactForm } from "../forms/DynamicContactForm";
import type { FormSectionProps } from "@/types";
import { StrapiImage } from "../StrapiImage";

export function FormSection({
  theme,
  sideImage,
  backgroundImage,
  backgroundDarken,
  heading,
  subheading,
  contactForm,
}: Readonly<FormSectionProps>) {
  return (
    <section className={`form form--${theme}`} id="contact-form">

      {/* Background Image */}
      {backgroundImage && (
        <div className="form__background">
          <StrapiImage
            src={backgroundImage.url}
            alt={backgroundImage.alternativeText || "No alternative text provided"}
            className="form__background-image"
            width={1920}
            height={1080}
        />
          {backgroundDarken && <div className="form__background__overlay"></div>}
        </div>
      )}
      
      {/* Form */}
      <div className="form__wrapper">
        {heading && <div className="form__header">
          {subheading && <p className="form__subheading">{subheading}</p>}
          <h2 className={`form__heading form__heading--${theme}`}>{heading}</h2>
        </div>}

        <div className="form__content">
          <DynamicContactForm config={contactForm} />
        </div>
      </div>

      {/* Side Image */}
      {sideImage && (
        <StrapiImage
          src={sideImage.url}
          alt={sideImage.alternativeText || "No alternative text provided"}
          height={500}
          width={600}
          className="form__side-image"
        />
      )}
    </section>
  );
}
