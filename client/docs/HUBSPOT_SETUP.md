# HubSpot API Integration Setup

This guide will help you set up the custom contact form to send data to HubSpot's API.

## Prerequisites

1. A HubSpot account
2. A HubSpot form created in your account
3. HubSpot API access

## Step 1: Get Your HubSpot Credentials

### Portal ID
1. Log into your HubSpot account
2. Go to Settings → Account Setup → Account Defaults
3. Your Portal ID is displayed at the top of the page

### Form ID
1. Go to Marketing → Lead Capture → Forms
2. Find your form and click on it
3. In the form settings, look for the Form ID in the URL or form properties

### API Key
1. Go to Settings → Account Setup → Integrations → Private Apps
2. Click "Create private app"
3. Give it a name (e.g., "Website Contact Form")
4. Select the following scopes:
   - `forms` (Read & Write)
   - `contacts` (Read & Write)
5. Create the app and copy the API key

## Step 2: Environment Variables

Create a `.env.local` file in the `client` directory with the following variables:

```env
HUBSPOT_PORTAL_ID=your_portal_id_here
HUBSPOT_FORM_ID=your_form_id_here
HUBSPOT_API_KEY=your_api_key_here
```

## Step 3: Test the Integration

1. Start your development server
2. Navigate to a page with the contact form
3. Fill out and submit the form
4. Check your HubSpot contacts to see if the submission was received

## Troubleshooting

### Common Issues

1. **"Server configuration error"**
   - Check that all environment variables are set correctly
   - Restart your development server after adding environment variables

2. **"Failed to submit form"**
   - Verify your API key has the correct permissions
   - Check that the form ID matches an existing form in your HubSpot account
   - Ensure the portal ID is correct

3. **Form fields not mapping correctly**
   - Make sure your HubSpot form has the corresponding field names:
     - `email` (required)
     - `firstname`
     - `lastname`
     - `phone`
     - `company`
     - `jobtitle`
     - `message`

### Debug Mode

To see detailed error messages, check your browser's developer console and your server logs.

## Customization

### Adding New Fields

To add new fields to the form:

1. Update the `FormData` interface in `CustomContactForm.tsx`
2. Add the field to the form JSX
3. Update the API route to include the new field
4. Add the corresponding field to your HubSpot form

### Styling

The form styling can be customized in `_custom-contact-form.scss`. The form uses BEM methodology for CSS classes.

## Security Notes

- Never commit your `.env.local` file to version control
- The API key should have minimal required permissions
- Consider implementing rate limiting for production use 