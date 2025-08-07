'use client';

import { useState } from 'react';
import { fetchAPI } from '@/utils/fetch-api';
import type { ContactFormProps } from '@/types';

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

interface FormFieldsConfig {
  firstName?: FormFieldConfig;
  lastName?: FormFieldConfig;
  email?: FormFieldConfig;
  phone?: FormFieldConfig;
  company?: FormFieldConfig;
  jobTitle?: FormFieldConfig;
  propertyAddress?: FormFieldConfig;
  message?: FormFieldConfig;
}

interface FormData {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

interface DynamicContactFormProps {
  config: ContactFormProps;
  className?: string;
}

// Default field configurations
const defaultFieldConfigs: Record<string, FormFieldConfig> = {
  firstName: {
    enabled: true,
    required: true,
    label: 'First Name',
    placeholder: 'Enter your first name',
    order: 1,
    fieldType: 'text'
  },
  lastName: {
    enabled: true,
    required: true,
    label: 'Last Name',
    placeholder: 'Enter your last name',
    order: 2,
    fieldType: 'text'
  },
  email: {
    enabled: true,
    required: true,
    label: 'Email Address',
    placeholder: 'Enter your email address',
    order: 3,
    fieldType: 'email'
  },
  phone: {
    enabled: true,
    required: false,
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    order: 4,
    fieldType: 'tel'
  },
  company: {
    enabled: true,
    required: false,
    label: 'Company',
    placeholder: 'Enter your company name',
    order: 5,
    fieldType: 'text'
  },
  jobTitle: {
    enabled: true,
    required: false,
    label: 'Job Title',
    placeholder: 'Enter your job title',
    order: 6,
    fieldType: 'text'
  },
  propertyAddress: {
    enabled: true,
    required: false,
    label: 'Property Address',
    placeholder: 'Enter the full property address (street, city, state, zip)',
    order: 7,
    fieldType: 'text'
  },
  message: {
    enabled: true,
    required: false,
    label: 'Message',
    placeholder: 'Tell us about your real estate needs...',
    order: 8,
    fieldType: 'textarea'
  },
};

export function DynamicContactForm({ config, className = "" }: DynamicContactFormProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Check if we should use default field configuration
  const useDefaultConfig = config.useDefaultFieldConfig !== false; // REMOVE THIS AND RELATED CODE

  // Merge config with defaults
  const mergedFields = Object.keys(defaultFieldConfigs).reduce((acc, fieldName) => {
    const defaultConfig = defaultFieldConfigs[fieldName];
    const configField = config.fields[fieldName as keyof FormFieldsConfig];
    
    if (configField && configField.enabled) {
      // If using default config, merge with server defaults
      if (useDefaultConfig) {
        acc[fieldName] = {
          ...defaultConfig,
          ...configField,
          // Use server validation if provided, otherwise use defaults
          validation: configField.validation || defaultConfig.validation,
        };
      } else {
        // Use only server configuration
        acc[fieldName] = {
          ...defaultConfig,
          ...configField,
        };
      }
    }
    return acc;
  }, {} as Record<string, FormFieldConfig>);

  // Sort fields by order
  const sortedFields = Object.entries(mergedFields).sort(([, a], [, b]) => a.order - b.order);

  const validateField = (fieldName: string, value: string, fieldConfig: FormFieldConfig): string => {
    // Required validation
    if (fieldConfig.required && !value.trim()) {
      return `${fieldConfig.label} is required`;
    }

    // Skip validation for empty optional fields
    if (!value.trim()) {
      return '';
    }

    // Email validation (basic pattern)
    if (fieldName === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // Phone validation (allows common formats)
    if (fieldName === 'phone' && value) {
      const phonePattern = /^[+]?[0-9\s\-\(\)]{10,20}$/;
      if (!phonePattern.test(value)) {
        return 'Please enter a valid phone number';
      }
    }

    // Length validation
    if (fieldConfig.validation?.maxLength && value.length > fieldConfig.validation.maxLength) {
      return `${fieldConfig.label} must be no more than ${fieldConfig.validation.maxLength} characters`;
    }

    // Basic length validation for names
    if ((fieldName === 'firstName' || fieldName === 'lastName') && value.length < 2) {
      return `${fieldConfig.label} must be at least 2 characters`;
    }

    // Basic length validation for property address
    if (fieldName === 'propertyAddress' && value.length < 10) {
      return `${fieldConfig.label} must be at least 10 characters`;
    }

    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    sortedFields.forEach(([fieldName, fieldConfig]) => {
      const value = formData[fieldName] || '';
      const error = validateField(fieldName, value, fieldConfig);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const requestBody: any = { ...formData };
      
      // Only add HubSpot credentials if they're provided in the config
      if (config.hubspotFormId) {
        requestBody.hubspotFormId = config.hubspotFormId;
      }
      if (config.hubspotPortalId) {
        requestBody.hubspotPortalId = config.hubspotPortalId;
      }

      const response = await fetchAPI('/api/contact', {
        method: 'POST',
        body: requestBody,
      });

      if (response.success) {
        setSubmitStatus('success');
        setFormData({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (fieldName: string, fieldConfig: FormFieldConfig) => {
    const commonProps = {
      id: fieldName,
      name: fieldName,
      value: formData[fieldName] || '',
      onChange: handleInputChange,
      className: `custom-contact-form__input ${errors[fieldName] ? 'custom-contact-form__input--error' : ''}`,
      placeholder: fieldConfig.placeholder,
    };

    if (fieldConfig.fieldType === 'textarea') {
      return (
        <textarea
          {...commonProps}
          className={`custom-contact-form__textarea ${errors[fieldName] ? 'custom-contact-form__input--error' : ''}`}
          rows={4}
        />
      );
    }

    return (
      <input
        {...commonProps}
        type={fieldConfig.fieldType}
      />
    );
  };

  const theme = config.theme || 'turquoise';

  return (
    <div className={`custom-contact-form custom-contact-form--${theme} ${className}`}>
      {(config.heading || config.description) && (
        <div className="custom-contact-form__header">
          {config.heading && <h3 className="custom-contact-form__heading">{config.heading}</h3>}
          {config.description && <p className="custom-contact-form__description">{config.description}</p>}
        </div>
      )}

      {submitStatus === 'success' && (
        <div className="custom-contact-form__success">
          <h3>Thank you!</h3>
          <p>Your message has been sent successfully. We&apos;ll get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="custom-contact-form__error">
          <h3>Oops!</h3>
          <p>Sorry, there was an error submitting your form. Please try again.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="custom-contact-form__form">
        {sortedFields.map(([fieldName, fieldConfig]) => (
          <div key={fieldName} className="custom-contact-form__field">
            <label htmlFor={fieldName} className="custom-contact-form__label">
              {fieldConfig.label}
              {fieldConfig.required && ' *'}
            </label>
            {renderField(fieldName, fieldConfig)}
            {errors[fieldName] && (
              <span className="custom-contact-form__error-text">{errors[fieldName]}</span>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`custom-contact-form__submit btn btn--medium btn--${theme}`}
        >
          {isSubmitting ? 'Sending...' : 'Get Your Free Estimate'}
        </button>
      </form>
    </div>
  );
} 