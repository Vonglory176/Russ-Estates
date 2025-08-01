import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksFormSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_form_sections';
  info: {
    displayName: 'Form Section';
  };
  attributes: {
    contactForm: Schema.Attribute.Component<'elements.hubspot-embed', false>;
    heading: Schema.Attribute.String;
    subheading: Schema.Attribute.String;
  };
}

export interface BlocksFullImage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_full_images';
  info: {
    displayName: 'Full Image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksHeading extends Struct.ComponentSchema {
  collectionName: 'components_blocks_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    heading: Schema.Attribute.String;
    linkId: Schema.Attribute.String;
  };
}

export interface BlocksHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    contactForm: Schema.Attribute.Component<
      'elements.contact-form-config',
      false
    >;
    content: Schema.Attribute.Text;
    cta: Schema.Attribute.Component<'elements.link', false>;
    darken: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Component<'elements.logo', false>;
    subheading: Schema.Attribute.String;
    theme: Schema.Attribute.Enumeration<['turquoise', 'orange']>;
  };
}

export interface BlocksInfoBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_info_blocks';
  info: {
    displayName: 'Info Block';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    cta: Schema.Attribute.Component<'elements.link', true>;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    reversed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    theme: Schema.Attribute.Enumeration<['turquoise', 'orange']>;
  };
}

export interface BlocksParagraph extends Struct.ComponentSchema {
  collectionName: 'components_blocks_paragraphs';
  info: {
    displayName: 'Paragraph';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface BlocksParagraphWithImage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_paragraph_with_images';
  info: {
    displayName: 'Paragraph With Image';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    imageLandscape: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    reversed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface BlocksSenjaWidget extends Struct.ComponentSchema {
  collectionName: 'components_blocks_senja_widgets';
  info: {
    displayName: 'Senja Widget';
  };
  attributes: {
    heading: Schema.Attribute.String;
    lazyLoad: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    mode: Schema.Attribute.Enumeration<['shadow', 'inline']> &
      Schema.Attribute.DefaultTo<'shadow'>;
    subheading: Schema.Attribute.String;
    widgetId: Schema.Attribute.String & Schema.Attribute.Required;
    widgetUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksService extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services';
  info: {
    displayName: 'Service';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Component<'elements.react-icon', false>;
    link: Schema.Attribute.Component<'elements.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksServicesSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services_sections';
  info: {
    displayName: 'Services Section';
  };
  attributes: {
    heading: Schema.Attribute.String;
    services: Schema.Attribute.Component<'blocks.service', true>;
    subheading: Schema.Attribute.String;
  };
}

export interface ElementsContactFormConfig extends Struct.ComponentSchema {
  collectionName: 'components_elements_contact_form_configs';
  info: {
    description: 'Configure which fields to show in the contact form and form settings';
    displayName: 'Contact Form Configuration';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"Ready to start your project? Let's discuss how we can help bring your vision to life.">;
    fields: Schema.Attribute.Component<'elements.form-fields', false>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Get in Touch'>;
    hubspotFormId: Schema.Attribute.String;
    hubspotPortalId: Schema.Attribute.String;
    theme: Schema.Attribute.Enumeration<['turquoise', 'orange']> &
      Schema.Attribute.DefaultTo<'turquoise'>;
    useDefaultFieldConfig: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ElementsFieldValidation extends Struct.ComponentSchema {
  collectionName: 'components_elements_field_validations';
  info: {
    description: 'Basic validation rules for form fields (client-side validation handles most cases)';
    displayName: 'Field Validation Rules';
  };
  attributes: {
    customErrorMessage: Schema.Attribute.String;
    maxLength: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1000>;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ElementsFormField extends Struct.ComponentSchema {
  collectionName: 'components_elements_form_field';
  info: {
    description: 'Configure individual form field properties';
    displayName: 'Form Field Configuration';
  };
  attributes: {
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    fieldType: Schema.Attribute.Enumeration<
      ['text', 'email', 'tel', 'textarea']
    > &
      Schema.Attribute.DefaultTo<'text'>;
    label: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    placeholder: Schema.Attribute.String;
  };
}

export interface ElementsFormFields extends Struct.ComponentSchema {
  collectionName: 'components_elements_form_fields';
  info: {
    description: 'Configure which fields to show in the contact form';
    displayName: 'Form Fields Configuration';
  };
  attributes: {
    company: Schema.Attribute.Component<'elements.form-field', false>;
    email: Schema.Attribute.Component<'elements.form-field', false>;
    firstName: Schema.Attribute.Component<'elements.form-field', false>;
    jobTitle: Schema.Attribute.Component<'elements.form-field', false>;
    lastName: Schema.Attribute.Component<'elements.form-field', false>;
    message: Schema.Attribute.Component<'elements.form-field', false>;
    phone: Schema.Attribute.Component<'elements.form-field', false>;
    propertyAddress: Schema.Attribute.Component<'elements.form-field', false>;
  };
}

export interface ElementsHubspotEmbed extends Struct.ComponentSchema {
  collectionName: 'components_elements_hubspot_embeds';
  info: {
    displayName: 'Hubspot Form';
  };
  attributes: {
    script: Schema.Attribute.Text;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
  };
}

export interface ElementsReactIcon extends Struct.ComponentSchema {
  collectionName: 'components_elements_react_icons';
  info: {
    displayName: 'React Icon';
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#000000'>;
    name: Schema.Attribute.Enumeration<
      [
        'FaHome',
        'FaBuilding',
        'FaSearch',
        'FaMapMarkerAlt',
        'FaPhone',
        'FaEnvelope',
        'FaUser',
        'FaKey',
        'FaCalculator',
        'FaChartLine',
        'FaShieldAlt',
        'FaStar',
        'FaHeart',
        'FaEye',
        'FaHandshake',
        'FaDollarSign',
        'FaClipboardList',
        'FaTools',
        'FaCog',
        'FaLightbulb',
        'FaRocket',
        'FaAward',
        'FaCheckCircle',
        'FaInfoCircle',
        'FaQuestionCircle',
        'FaExclamationTriangle',
        'MdApartment',
        'MdBusiness',
        'MdLocationOn',
        'MdEmail',
        'MdPhone',
        'MdHome',
        'MdSearch',
        'MdPerson',
        'MdSettings',
        'MdHelp',
        'MdInfo',
        'IoBusiness',
        'IoHome',
        'IoSearch',
        'IoLocation',
        'IoMail',
        'IoCall',
        'IoPerson',
        'IoKey',
        'IoCalculator',
        'IoStatsChart',
        'IoShield',
        'IoStar',
        'IoHeart',
        'IoEye',
        'GiHouse',
        'GiModernCity',
        'GiMagnifyingGlass',
        'GiPhone',
        'GiKey',
        'GiCalculator',
        'GiChart',
        'GiShield',
        'GiHearts',
        'GiMoneyStack',
        'GiToolbox',
        'GiGears',
        'GiLightBulb',
        'GiRocket',
        'GiTrophy',
        'GiCheckMark',
        'GiInfo',
      ]
    > &
      Schema.Attribute.Required;
    size: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<24>;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    copy: Schema.Attribute.String;
    logo: Schema.Attribute.Component<'elements.logo', false>;
    navigation: Schema.Attribute.Component<'elements.link', true>;
    policies: Schema.Attribute.Component<'elements.link', true>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    logo: Schema.Attribute.Component<'elements.logo', false>;
    navigation: Schema.Attribute.Component<'elements.link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.form-section': BlocksFormSection;
      'blocks.full-image': BlocksFullImage;
      'blocks.heading': BlocksHeading;
      'blocks.hero-section': BlocksHeroSection;
      'blocks.info-block': BlocksInfoBlock;
      'blocks.paragraph': BlocksParagraph;
      'blocks.paragraph-with-image': BlocksParagraphWithImage;
      'blocks.senja-widget': BlocksSenjaWidget;
      'blocks.service': BlocksService;
      'blocks.services-section': BlocksServicesSection;
      'elements.contact-form-config': ElementsContactFormConfig;
      'elements.field-validation': ElementsFieldValidation;
      'elements.form-field': ElementsFormField;
      'elements.form-fields': ElementsFormFields;
      'elements.hubspot-embed': ElementsHubspotEmbed;
      'elements.link': ElementsLink;
      'elements.logo': ElementsLogo;
      'elements.react-icon': ElementsReactIcon;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
    }
  }
}
