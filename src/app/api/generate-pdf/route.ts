import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { createCVDocument } from '@/components/pdf/createCVDocument';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get locale from query parameters
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get('locale') || 'en') as 'en' | 'de' | 'ar';

    // Validate locale
    if (!['en', 'de', 'ar'].includes(locale)) {
      return NextResponse.json(
        { error: 'Invalid locale. Must be one of: en, de, ar' },
        { status: 400 }
      );
    }

    // Generate PDF using the factory function
    const document = createCVDocument(locale);

    // Render to stream and convert to buffer
    const stream = await renderToStream(document);

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream as any) {
      chunks.push(chunk);
    }
    const pdfBuffer = Buffer.concat(chunks);

    // Create response with PDF
    const response = new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Sami_Alzein_CV_${locale.toUpperCase()}.pdf"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });

    return response;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
