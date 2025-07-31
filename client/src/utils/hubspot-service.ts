interface ContactFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  message?: string;
  company?: string;
  jobTitle?: string;
  propertyAddress?: string;
  hubspotFormId?: string;
  hubspotPortalId?: string;
}

export async function submitToHubSpot(formData: ContactFormData, pageUri?: string) {
  // HubSpot API configuration
  const HUBSPOT_PORTAL_ID = formData.hubspotPortalId || process.env.HUBSPOT_PORTAL_ID;
  const HUBSPOT_FORM_ID = formData.hubspotFormId || process.env.HUBSPOT_FORM_ID;
  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID || !HUBSPOT_API_KEY) {
    throw new Error('Missing HubSpot configuration');
  }

  // Prepare data for HubSpot
  const fields = [
    { name: 'email', value: formData.email },
  ];

  // Add optional fields only if they have values
  if (formData.firstName?.trim()) {
    fields.push({ name: 'firstname', value: formData.firstName });
  }
  if (formData.lastName?.trim()) {
    fields.push({ name: 'lastname', value: formData.lastName });
  }
  if (formData.phone?.trim()) {
    fields.push({ name: 'phone', value: formData.phone });
  }
  if (formData.company?.trim()) {
    fields.push({ name: 'company', value: formData.company });
  }
  if (formData.jobTitle?.trim()) {
    fields.push({ name: 'jobtitle', value: formData.jobTitle });
  }
  if (formData.propertyAddress?.trim()) {
    fields.push({ name: 'property_address', value: formData.propertyAddress });
  }
  if (formData.message?.trim()) {
    fields.push({ name: 'message', value: formData.message });
  }

  const hubspotData: any = {
    fields,
    context: {
      pageName: 'Contact Form',
    },
  };

  // Only add pageUri if it's a valid URL
  if (pageUri && (pageUri.startsWith('http://') || pageUri.startsWith('https://'))) {
    hubspotData.context.pageUri = pageUri;
  }

  // Submit to HubSpot
  const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
  
  const response = await fetch(hubspotUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
    },
    body: JSON.stringify(hubspotData),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('HubSpot API error:', errorData);
    throw new Error('Failed to submit to HubSpot');
  }

  return { success: true };
} 