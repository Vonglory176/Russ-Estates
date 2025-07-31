# HubSpot Credentials Setup Guide

This guide will help you configure HubSpot credentials for your contact forms.

## 🔧 Two Ways to Configure HubSpot

You have two options for setting up HubSpot integration:

### Option 1: Environment Variables (Recommended)

Set up HubSpot credentials in your `.env.local` file:

```env
HUBSPOT_API_KEY=your_api_key_here
HUBSPOT_PORTAL_ID=your_portal_id_here
HUBSPOT_FORM_ID=your_form_id_here
```

**Benefits:**
- ✅ Secure (credentials not stored in CMS)
- ✅ Global configuration for all forms
- ✅ Easy to manage across environments

### Option 2: Per-Form Configuration

Configure HubSpot credentials for each form in Strapi:

1. Go to **Content Manager → Hero Section**
2. Edit a hero section with a contact form
3. In the **Contact Form** section, fill in:
   - **HubSpot Form ID**: Your form ID
   - **HubSpot Portal ID**: Your portal ID

**Benefits:**
- ✅ Different forms can use different HubSpot forms
- ✅ Easy to manage through CMS
- ✅ No environment variable changes needed

## 🔍 Getting Your HubSpot Credentials

### HubSpot Portal ID
1. Log into your HubSpot account
2. Go to **Settings → Account Setup → Account Defaults**
3. Your Portal ID is displayed at the top of the page

### HubSpot Form ID
1. Go to **Marketing → Lead Capture → Forms**
2. Find your form and click on it
3. In the form settings, look for the Form ID in the URL or form properties

### HubSpot API Key
1. Go to **Settings → Account Setup → Integrations → Private Apps**
2. Click **"Create private app"**
3. Give it a name (e.g., "Website Contact Form")
4. Select scopes:
   - `forms` (Read & Write)
   - `contacts` (Read & Write)
5. Create the app and copy the API key

## 🎯 Recommended Setup

For most real estate websites, we recommend **Option 1** (Environment Variables):

1. **Set up one comprehensive HubSpot form** with all possible fields
2. **Use environment variables** for the credentials
3. **Configure form fields through Strapi** for flexibility

This gives you:
- ✅ One source of truth for HubSpot integration
- ✅ Complete control over form fields through CMS
- ✅ Secure credential management
- ✅ Easy deployment across environments

## 🔍 Troubleshooting

### "Server configuration error - HubSpot credentials not configured"
This means neither environment variables nor form-specific credentials are set up.

**Solution:**
1. Set up environment variables in `.env.local`
2. OR configure credentials in Strapi form settings
3. Restart your development server

### Form submits but no data in HubSpot
This usually means the HubSpot form fields don't match.

**Solution:**
1. Check that your HubSpot form has the correct field names
2. Verify the Form ID is correct
3. Test with a simple form submission

## 📋 Required HubSpot Form Fields

Make sure your HubSpot form includes these fields:
- `email` (required)
- `firstname`
- `lastname`
- `phone`
- `company`
- `jobtitle`
- `property_address`
- `message`

The form will work even if some fields are missing, but data won't be captured for missing fields. 