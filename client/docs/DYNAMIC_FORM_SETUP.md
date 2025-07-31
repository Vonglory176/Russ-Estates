# Dynamic Contact Form Setup Guide

This guide will help you set up the new dynamic contact form system that gives you complete control over form fields and styling through Strapi CMS.

## 🎯 Overview

The new system replaces the static HubSpot embedded forms with a dynamic, CMS-controlled solution that:

- ✅ **Complete styling control** - No HubSpot styling restrictions
- ✅ **CMS-driven configuration** - Manage form fields through Strapi
- ✅ **HubSpot integration** - Still sends data to your HubSpot CRM
- ✅ **Flexible field management** - Enable/disable fields, set validation rules
- ✅ **Multiple form configurations** - Different forms for different pages

## 🏗️ Architecture

```
Strapi CMS → Form Configuration → Dynamic Form Component → HubSpot API
```

1. **Strapi CMS** - Configure form fields, validation, and HubSpot settings
2. **Dynamic Form Component** - Renders form based on CMS configuration
3. **API Route** - Handles form submission and sends to HubSpot
4. **HubSpot CRM** - Receives and processes lead data

## 📋 Prerequisites

1. **HubSpot Account** with API access
2. **HubSpot Form** created with all possible fields
3. **Strapi Admin Access** to configure form settings

## 🔧 Step 1: HubSpot Setup

### Create a Comprehensive HubSpot Form

1. Go to **Marketing → Lead Capture → Forms**
2. Create a new form with these fields:
   - `email` (required)
   - `firstname`
   - `lastname`
   - `phone`
   - `company`
   - `jobtitle`
   - `property_address`
   - `message`

3. **Copy the Form ID** from the form settings
4. **Copy your Portal ID** from Settings → Account Setup → Account Defaults

### Create HubSpot API Key

1. Go to **Settings → Account Setup → Integrations → Private Apps**
2. Click **"Create private app"**
3. Name it "Website Contact Form"
4. Select scopes:
   - `forms` (Read & Write)
   - `contacts` (Read & Write)
5. Copy the API key

## 🔧 Step 2: Environment Variables

Create `.env.local` in the `client` directory:

```env
# HubSpot API Key (required)
HUBSPOT_API_KEY=your_api_key_here

# Fallback HubSpot settings (optional - can be set in Strapi)
HUBSPOT_PORTAL_ID=your_portal_id_here
HUBSPOT_FORM_ID=your_form_id_here
```

## 🔧 Step 3: Strapi Configuration

### 1. Create Contact Form Configuration

1. Go to **Content Manager → Hero Section**
2. Edit a hero section with a contact form
3. In the **Contact Form** section, configure:

#### Basic Settings
- **Heading**: "Get in Touch" (or custom)
- **Description**: Form description text
- **Theme**: turquoise or orange
- **HubSpot Form ID**: Your form ID from Step 1
- **HubSpot Portal ID**: Your portal ID from Step 1

#### Field Configuration

For each field (firstName, lastName, email, phone, company, jobTitle, propertyAddress, message):

- **Enabled**: Show/hide the field
- **Required**: Make field mandatory
- **Label**: Custom field label
- **Placeholder**: Input placeholder text
- **Order**: Field display order (1-8)
- **Field Type**: text, email, tel, or textarea
- **Validation**: Custom validation rules

#### Example Field Configuration

**First Name Field:**
- Enabled: ✅
- Required: ✅
- Label: "First Name"
- Placeholder: "Enter your first name"
- Order: 1
- Field Type: text

**Email Field:**
- Enabled: ✅
- Required: ✅
- Label: "Email Address"
- Placeholder: "Enter your email address"
- Order: 3
- Field Type: email

**Phone Field:**
- Enabled: ✅
- Required: ❌
- Label: "Phone Number"
- Placeholder: "Enter your phone number"
- Order: 4
- Field Type: tel

**Property Address Field:**
- Enabled: ✅
- Required: ❌
- Label: "Property Address"
- Placeholder: "Enter the full property address (street, city, state, zip)"
- Order: 7
- Field Type: textarea

## 🔧 Step 4: Testing

1. **Start your development server**
2. **Navigate to a page with the contact form**
3. **Test form submission**:
   - Fill out required fields
   - Submit the form
   - Check HubSpot contacts for the new lead
4. **Test field configuration**:
   - Disable fields in Strapi
   - Verify they don't appear on the form
   - Change field order
   - Verify new order is reflected

## 🎨 Customization

### Styling

The form uses the same styling as the static form. Customize in `_custom-contact-form.scss`:

```scss
.custom-contact-form {
  // Main container styles
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(1rem);
  border-radius: 2rem;
  // ... more styles
}
```

### Adding New Fields

1. **Update Strapi Schema**:
   - Add field to `form-fields.json`
   - Add field to `contact-form-config.json`

2. **Update TypeScript Types**:
   - Add field to `FormFieldsConfig` interface
   - Add field to `FormData` interface

3. **Update API Route**:
   - Add field mapping in `/api/contact/route.ts`

4. **Add to HubSpot Form**:
   - Create corresponding field in HubSpot

### Validation Rules

The form includes practical, common-sense validation handled primarily on the client-side:

- **Required Fields**: First Name, Last Name, Email
- **Email**: Basic email format validation
- **Phone**: Accepts common phone number formats (with spaces, dashes, parentheses)
- **Length Limits**: Reasonable character limits for each field type
- **Optional Fields**: No validation for empty optional fields

#### Client-Side Validation (Default)

- **First Name**: 2-50 characters
- **Last Name**: 2-50 characters  
- **Email**: Valid email format
- **Phone**: 10-20 characters, allows common formats
- **Company**: Max 100 characters
- **Job Title**: Max 100 characters
- **Property Address**: 10-500 characters (single line)
- **Message**: Max 1000 characters

#### Server-Side Validation (Optional)

For advanced cases, you can configure basic validation in Strapi:
- **Required**: Make any field required
- **Max Length**: Set maximum character limit
- **Custom Error Message**: Override default error messages

The system prioritizes client-side validation for better performance and user experience.

## 🔍 Troubleshooting

### Common Issues

1. **"Server configuration error"**
   - Check environment variables
   - Verify HubSpot API key permissions
   - Restart development server

2. **Form fields not appearing**
   - Check field "Enabled" setting in Strapi
   - Verify field configuration is saved
   - Clear browser cache

3. **HubSpot submission fails**
   - Verify Form ID and Portal ID
   - Check field names match HubSpot form
   - Review HubSpot API error logs

4. **Styling issues**
   - Check CSS imports in `main.scss`
   - Verify theme variables are defined
   - Inspect browser developer tools

### Debug Mode

Enable detailed logging:

```typescript
// In DynamicContactForm.tsx
console.log('Form config:', config);
console.log('Form data:', formData);
```

## 📚 API Reference

### Form Configuration Interface

```typescript
interface ContactFormProps {
  heading?: string;
  description?: string;
  theme?: 'turquoise' | 'orange';
  fields: FormFieldsConfig;
  hubspotFormId?: string;
  hubspotPortalId?: string;
}
```

### Field Configuration Interface

```typescript
interface FormFieldConfig {
  enabled: boolean;
  required: boolean;
  label?: string;
  placeholder?: string;
  order: number;
  fieldType: 'text' | 'email' | 'tel' | 'textarea';
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customValidation?: string;
    errorMessage?: string;
  };
}
```

## 🚀 Production Deployment

1. **Set production environment variables**
2. **Test form submission in production**
3. **Monitor HubSpot lead capture**
4. **Set up error monitoring**
5. **Configure rate limiting if needed**

## 🔒 Security Considerations

- API keys are stored server-side only
- Form validation happens on both client and server
- Rate limiting prevents spam submissions
- HTTPS required for production
- Regular API key rotation recommended

---

This dynamic form system gives you the best of both worlds: complete styling control and seamless HubSpot integration, all managed through your Strapi CMS!