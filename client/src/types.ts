import { IconName } from '@/utils/icons';

export interface LinkProps {
    id: number;
    text: string;
    href: string;
    isExternal: boolean;
  }
  
  export interface ImageProps {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string;
  }
  
  export interface LogoProps {
    logoText: string;
    image: ImageProps;
  }

  // Interface for React-Icon component (includes id for Strapi data)
  export interface ReactIconProps {
    id?: number;
    name: IconName;
    color?: string;
    size?: number;
    className?: string;
  }

  export interface FormFieldConfig {
    enabled: boolean;
    required: boolean;
    label?: string;
    placeholder?: string;
    order: number;
    fieldType: 'text' | 'email' | 'tel' | 'textarea';
    validation?: {
      required?: boolean;
      maxLength?: number;
      customErrorMessage?: string;
    };
  }

  export interface FormFieldsConfig {
    firstName?: FormFieldConfig;
    lastName?: FormFieldConfig;
    email?: FormFieldConfig;
    phone?: FormFieldConfig;
    company?: FormFieldConfig;
    jobTitle?: FormFieldConfig;
    propertyAddress?: FormFieldConfig;
    message?: FormFieldConfig;
  }

  export interface ContactFormProps {
    heading?: string;
    description?: string;
    theme?: 'turquoise' | 'orange';
    fields: FormFieldsConfig;
    hubspotFormId?: string;
    hubspotPortalId?: string;
    useDefaultFieldConfig?: boolean;
  }
  
  type ComponentType =
    | "blocks.heading"
    | "blocks.paragraph-with-image"
    | "blocks.paragraph"
    | "blocks.full-image"
    | "blocks.hero-section"
    | "blocks.info-block"
    | "blocks.services-section"
    | "blocks.senja-widget"
    | "blocks.form-section";
  
  interface Base<
    T extends ComponentType,
    D extends object = Record<string, unknown>
  > {
    id: number;
    __component?: T;
    documentId?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    data?: D;
  }
  
  export type Block =
    | HeadingProps
    | ParagraphWithImageProps
    | ParagraphProps
    | FullImageProps
    | HeroSectionProps
    | InfoBlockProps
    | ServicesSectionProps
    | SenjaWidgetProps
    | FormSectionProps;
  
  export interface HeroSectionProps extends Base<"blocks.hero-section"> {
    sectionId?: string;
    theme: "turquoise" | "orange";
    heading: string;
    subheading: string;
    content: string;
    image: ImageProps;
    cta?: LinkProps;
    logo?: LogoProps;
    author?: string;
    darken?: boolean;
    contactForm?: ContactFormProps;
  }
  
  export interface InfoBlockProps extends Base<"blocks.info-block"> {
    sectionId?: string;
    theme: "turquoise" | "orange";
    reversed?: boolean;
    headline: string;
    content: string;
    image: ImageProps;
    cta?: LinkProps[];
  }
  
  export interface HeadingProps extends Base<"blocks.heading"> {
    sectionId?: string;
    heading: string;
    linkId?: string;
  }
  
  export interface ParagraphWithImageProps extends Base<"blocks.paragraph-with-image"> {
    sectionId?: string;
    content: string;
    image: ImageProps;
    reversed?: boolean;
    imageLandscape?: boolean;
  }
  
  export interface ParagraphProps extends Base<"blocks.paragraph"> {
    sectionId?: string;
    content: string;
  }
  
  export interface FullImageProps extends Base<"blocks.full-image"> {
    id: number;
    __component: "blocks.full-image";
    sectionId?: string;
    image: ImageProps;
  }

export interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  icon: ReactIconProps;
  link?: LinkProps;
}

export interface ServicesSectionProps extends Base<"blocks.services-section"> {
  sectionId?: string;
  theme: "turquoise" | "orange";
  heading: string;
  subheading?: string;
  services: ServiceCardProps[];
  cta?: LinkProps[];
  backgroundImage?: ImageProps;
  backgroundOverlay?: "darken" | "lighten";
  // columns?: 2 | 3 | 4;
}

// For Senja Reviews Widget
export interface SenjaWidgetProps extends Base<"blocks.senja-widget"> {
  sectionId?: string;
  heading: string;
  subheading: string;
  widgetUrl: string;
  widgetId: string;
  mode?: "shadow" | "inline";
  lazyLoad?: boolean;
}

export interface FormSectionProps extends Base<"blocks.form-section"> {
  sectionId?: string;
  theme: "turquoise" | "orange";
  heading: string;
  subheading?: string;
  contactForm: ContactFormProps;
  sideImage?: ImageProps;
  backgroundImage?: ImageProps;
  backgroundOverlay?: "darken" | "lighten";
}