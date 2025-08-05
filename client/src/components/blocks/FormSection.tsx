import { DynamicContactForm } from "../forms/DynamicContactForm";
import type { FormSectionProps } from "@/types";
import { StrapiImage } from "../StrapiImage";

export function FormSection({
  theme,
  sideImage,
  backgroundImage,
  backgroundOverlay,
  heading,
  subheading,
  contactForm,
}: Readonly<FormSectionProps>) {
  return (
    <section className={`form form--${theme}`} id="contact-form">

        {heading && <div className="form__header">
          <h2 className={`form__heading form__heading--${theme}`}>{heading}</h2>
          {subheading && <p className="form__subheading">{subheading}</p>}
        </div>}
      <div className={`form__container section__wrapper`}>

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
            {backgroundOverlay && <div className={`form__background__overlay form__background__overlay--${backgroundOverlay}`}></div>}
          </div>
        )}
        
        {/* Form */}
        <div className="form__wrapper">

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

      </div>

    </section>
  );
}
