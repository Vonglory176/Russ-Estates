'use client';

import { useState } from 'react';
import { fetchAPI } from '@/utils/fetch-api';

interface FormData {
  [key: string]: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
  company: string;
  jobTitle: string;
  propertyAddress: string;
}

interface FormErrors {
  [key: string]: string;
}

interface CustomContactFormProps {
  heading?: string;
  description?: string;
  className?: string;
  theme?: 'turquoise' | 'orange';
}

export function CustomContactForm({ 
  heading = "Get in Touch", 
  description = "Ready to start your project? Let's discuss how we can help bring your vision to life.",
  className = "",
  theme = "turquoise"
}: CustomContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    message: '',
    company: '',
    jobTitle: '',
    propertyAddress: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Phone validation (optional but if provided, validate format)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

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
      const response = await fetchAPI('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (response.success) {
        setSubmitStatus('success');
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          phone: '',
          message: '',
          company: '',
          jobTitle: '',
          propertyAddress: '',
        });
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

  return (
    <div className={`custom-contact-form custom-contact-form--${theme} ${className}`}>
      {(heading || description) && (
        <div className="custom-contact-form__header">
          {heading && <h2 className="custom-contact-form__heading">{heading}</h2>}
          {description && <p className="custom-contact-form__description">{description}</p>}
        </div>
      )}

      {submitStatus === 'success' && (
        <div className="custom-contact-form__success">
          <h3>Thank you!</h3>
          <p>Your message has been sent successfully. We'll get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="custom-contact-form__error">
          <p>Sorry, there was an error submitting your form. Please try again.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="custom-contact-form__form">
        <div className="custom-contact-form__row">
          <div className="custom-contact-form__field">
            <label htmlFor="firstName" className="custom-contact-form__label">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`custom-contact-form__input ${errors.firstName ? 'custom-contact-form__input--error' : ''}`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span className="custom-contact-form__error-text">{errors.firstName}</span>
            )}
          </div>

          <div className="custom-contact-form__field">
            <label htmlFor="lastName" className="custom-contact-form__label">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`custom-contact-form__input ${errors.lastName ? 'custom-contact-form__input--error' : ''}`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span className="custom-contact-form__error-text">{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className="custom-contact-form__row">
          <div className="custom-contact-form__field">
            <label htmlFor="email" className="custom-contact-form__label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`custom-contact-form__input ${errors.email ? 'custom-contact-form__input--error' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="custom-contact-form__error-text">{errors.email}</span>
            )}
          </div>

          <div className="custom-contact-form__field">
            <label htmlFor="phone" className="custom-contact-form__label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`custom-contact-form__input ${errors.phone ? 'custom-contact-form__input--error' : ''}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <span className="custom-contact-form__error-text">{errors.phone}</span>
            )}
          </div>
        </div>

        <div className="custom-contact-form__row">
          <div className="custom-contact-form__field">
            <label htmlFor="company" className="custom-contact-form__label">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="custom-contact-form__input"
              placeholder="Enter your company name"
            />
          </div>

          <div className="custom-contact-form__field">
            <label htmlFor="jobTitle" className="custom-contact-form__label">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className="custom-contact-form__input"
              placeholder="Enter your job title"
            />
          </div>
        </div>

        <div className="custom-contact-form__field">
          <label htmlFor="propertyAddress" className="custom-contact-form__label">
            Property Address
          </label>
          <input
            type="text"
            id="propertyAddress"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleInputChange}
            className="custom-contact-form__input"
            placeholder="Enter the full property address (street, city, state, zip)"
          />
        </div>

        <div className="custom-contact-form__field">
          <label htmlFor="message" className="custom-contact-form__label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="custom-contact-form__textarea"
            placeholder="Tell us about your project or inquiry..."
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`custom-contact-form__submit btn btn--medium btn--${theme}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
} 