# Strapi Component Setup Guide

This guide will help you set up the new contact form components in Strapi.

## 🔧 Quick Setup

### 1. Restart Strapi Server

After adding the new components, restart your Strapi server:

```bash
cd server
npm run develop
```

### 2. Create Contact Form Configuration

1. Go to **Content Manager → Hero Section**
2. Edit a hero section that has a contact form
3. In the **Contact Form** section, you'll now see the new configuration options:

#### Basic Settings
- **Heading**: Form heading (e.g., "Get in Touch")
- **Description**: Form description text
- **Theme**: Choose turquoise or orange
- **HubSpot Form ID**: Your HubSpot form ID
- **HubSpot Portal ID**: Your HubSpot portal ID

#### Field Configuration
For each field (firstName, lastName, email, phone, company, jobTitle, propertyAddress, message):

- **Enabled**: Check to show the field
- **Required**: Check to make field mandatory
- **Label**: Custom field label
- **Placeholder**: Input placeholder text
- **Order**: Display order (1-8)
- **Field Type**: text, email, tel, or textarea
- **Validation**: Optional custom validation rules (defaults are already sensible)

**Note**: The form comes with practical default validation rules that work well for real estate contact forms. You only need to customize validation if you have specific requirements.

### 3. Example Configuration

#### Basic Form (Name + Email + Property Address + Message)
- **firstName**: Enabled ✅, Required ✅, Order: 1
- **lastName**: Enabled ✅, Required ✅, Order: 2  
- **email**: Enabled ✅, Required ✅, Order: 3
- **propertyAddress**: Enabled ✅, Required ❌, Order: 4
- **message**: Enabled ✅, Required ❌, Order: 5
- **phone**: Enabled ❌
- **company**: Enabled ❌
- **jobTitle**: Enabled ❌

#### Full Contact Form
- **firstName**: Enabled ✅, Required ✅, Order: 1
- **lastName**: Enabled ✅, Required ✅, Order: 2
- **email**: Enabled ✅, Required ✅, Order: 3
- **phone**: Enabled ✅, Required ❌, Order: 4
- **company**: Enabled ✅, Required ❌, Order: 5
- **jobTitle**: Enabled ✅, Required ❌, Order: 6
- **propertyAddress**: Enabled ✅, Required ❌, Order: 7, Field Type: text
- **message**: Enabled ✅, Required ❌, Order: 8

## 🔍 Troubleshooting

### "Metadata not found" Error
If you see this error, it means Strapi needs to be restarted after adding new components.

### Fields Not Appearing
1. Make sure the field is **Enabled** in Strapi
2. Check that the **Order** is set correctly
3. Verify the configuration is saved

### Form Not Loading
The form will fall back to the static version if no configuration is provided, so it should always work.

## 🎯 Next Steps

1. **Configure your first form** in Strapi
2. **Test the form submission** on your website
3. **Customize field settings** as needed
4. **Create different configurations** for different pages

The dynamic form system is now ready to use! 🚀 