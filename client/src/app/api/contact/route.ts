import { NextRequest, NextResponse } from 'next/server';
import { submitToHubSpot } from '@/utils/hubspot-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get the referer URL for HubSpot context
    const pageUri = request.headers.get('referer') || undefined;

    // Submit to HubSpot using the service
    await submitToHubSpot(body, pageUri);

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Form submission error:', error);
    
    if (error instanceof Error && error.message === 'Missing HubSpot configuration') {
      return NextResponse.json(
        { error: 'Server configuration error - HubSpot credentials not configured' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
} 