# HubSpot API Integration Guide

## ✅ **Working Configuration**

Your form is now successfully submitting to HubSpot! Here's what's working:

### **Correct API Endpoint**
- **URL**: `https://api.hsforms.com/submissions/v3/integration/submit/[PORTAL_ID]/[FORM_ID]`
- **Method**: POST
- **Authentication**: Bearer token with your API key

### **Required Configuration**
```env
HUBSPOT_API_KEY=your_api_key_here
HUBSPOT_PORTAL_ID=12345678
HUBSPOT_FORM_ID=12345678-1234-1234-1234-123456789abc
```

## 🔧 **If You Need to Troubleshoot**

### Common Issues:
1. **404 Error**: Check Form ID and Portal ID formats
2. **401 Error**: Invalid or expired API key
3. **403 Error**: API key lacks form submission permissions

### Quick Checks:
- [ ] Form is published in HubSpot
- [ ] Form ID is UUID format (with dashes)
- [ ] Portal ID is numeric (no dashes)
- [ ] API key has `forms` (Read & Write) permission

## 🎉 **Success!**

Your dynamic contact form is now fully functional with:
- ✅ Custom styling (no HubSpot restrictions)
- ✅ CMS-driven configuration via Strapi
- ✅ HubSpot CRM integration
- ✅ Real estate specific fields (Property Address)
- ✅ Client-side validation
- ✅ Server-side error handling

The form will submit leads directly to your HubSpot CRM while maintaining complete control over the user experience! 🚀 