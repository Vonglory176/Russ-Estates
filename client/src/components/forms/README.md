# Custom Contact Form Component

A fully customizable contact form component that submits data to HubSpot's API while giving you complete control over styling and functionality.

## Features

- ✅ **Complete styling control** - No HubSpot styling restrictions
- ✅ **Form validation** - Client-side validation with error handling
- ✅ **HubSpot integration** - Sends data directly to HubSpot CRM
- ✅ **Responsive design** - Works on all device sizes
- ✅ **Theme support** - Matches your existing design system
- ✅ **Accessibility** - Proper labels, ARIA attributes, and keyboard navigation
- ✅ **Loading states** - Visual feedback during submission
- ✅ **Success/Error handling** - Clear user feedback

## Usage

### Basic Usage

```tsx
import { CustomContactForm } from '@/components/forms/CustomContactForm';

function MyPage() {
  return (
    <div>
      <CustomContactForm />
    </div>
  );
}
```

### With Custom Props

```tsx
<CustomContactForm 
  heading="Get in Touch"
  description="Ready to start your project? Let's discuss how we can help."
  theme="turquoise"
  className="my-custom-class"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | `"Get in Touch"` | Form heading text |
| `description` | `string` | `"Ready to start your project? Let's discuss how we can help bring your vision to life."` | Form description text |
| `theme` | `'turquoise' \| 'orange'` | `'turquoise'` | Theme color for form styling |
| `className` | `string` | `""` | Additional CSS classes |

## Form Fields

The form includes the following fields:

- **First Name** (required)
- **Last Name** (required)
- **Email Address** (required)
- **Phone Number** (optional)
- **Company** (optional)
- **Job Title** (optional)
- **Message** (optional)

## Styling

The form uses BEM methodology for CSS classes. You can customize the styling by modifying `_custom-contact-form.scss`.

### Key CSS Classes

- `.custom-contact-form` - Main container
- `.custom-contact-form__input` - Input fields
- `.custom-contact-form__textarea` - Textarea
- `.custom-contact-form__submit` - Submit button
- `.custom-contact-form__error` - Error messages
- `.custom-contact-form__success` - Success message

### Theme Variations

- `.custom-contact-form--turquoise` - Turquoise theme
- `.custom-contact-form--orange` - Orange theme

## API Integration

The form submits data to `/api/contact` which forwards it to HubSpot's API. Make sure you have the following environment variables set:

- `HUBSPOT_PORTAL_ID`
- `HUBSPOT_FORM_ID`
- `HUBSPOT_API_KEY`

See `HUBSPOT_SETUP.md` for detailed setup instructions.

## Customization

### Adding New Fields

1. Update the `FormData` interface in the component
2. Add the field to the form JSX
3. Update the API route to include the new field
4. Add corresponding field to your HubSpot form

### Custom Validation

The form includes basic validation. You can extend the `validateForm` function to add custom validation rules.

### Styling Modifications

All styles are in `_custom-contact-form.scss`. The component uses CSS custom properties for colors, so you can easily modify the theme by updating your CSS variables.

## Accessibility

The form includes:

- Proper form labels
- Error announcements for screen readers
- Keyboard navigation support
- Focus management
- ARIA attributes for form states

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills for fetch API) 