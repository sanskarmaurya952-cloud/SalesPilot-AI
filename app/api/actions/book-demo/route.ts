import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerId,
      customerName,
      company,
      leadScore,
      buyingStage,
    } = body;

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          error: 'customerId is required',
        },
        { status: 400 },
      );
    }

    const demoAction = {
      action: 'BOOK_DEMO',
      status: 'INITIATED',
      customerId: String(customerId),
      customerName: customerName ?? null,
      company: company ?? null,
      leadScore:
        typeof leadScore === 'number'
          ? leadScore
          : null,
      buyingStage: buyingStage ?? null,
      createdAt: new Date().toISOString(),
    };

    console.log(
      '[SalesPilot Action] Demo booking initiated:',
      demoAction,
    );

    return NextResponse.json({
      success: true,
      action: demoAction,
      message: 'Demo booking initiated successfully',
    });
  } catch (error) {
    console.error(
      '[SalesPilot Action] Book demo error:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initiate demo booking',
      },
      { status: 500 },
    );
  }
}