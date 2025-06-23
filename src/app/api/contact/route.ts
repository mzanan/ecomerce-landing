import { NextRequest, NextResponse } from "next/server";
import { validateContactFormData } from "@/lib/validation";
import { validateEmailConfig, sendContactEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    
    const validatedData = validateContactFormData(requestData);
    const emailConfig = validateEmailConfig();
    
    const emailData = await sendContactEmail(validatedData, emailConfig);

    return NextResponse.json({
      success: true,
      messageId: emailData?.id,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const statusCode = errorMessage.includes('required') || errorMessage.includes('Valid email') ? 400 : 500;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
} 