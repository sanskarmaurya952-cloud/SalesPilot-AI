import { NextRequest, NextResponse } from 'next/server';
import {
  getCustomerMemory,
  updateCustomerMemory,
} from '@/lib/customer-memory';

export async function GET(request: NextRequest) {
  try {
    const customerId =
      request.nextUrl.searchParams.get('customerId');

    if (!customerId) {
      return NextResponse.json(
        { error: 'customerId is required' },
        { status: 400 },
      );
    }

    const memory = await getCustomerMemory(customerId);

    return NextResponse.json({
      success: true,
      memory,
    });
  } catch (error) {
    console.error(
      'Customer memory GET error:',
      error,
    );

    return NextResponse.json(
      {
        error: 'Failed to retrieve customer memory',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerId,
      name,
      role,
      company,
      budget,
      needs,
      preferences,
      objections,
      buyingStage,
      lastIntent,
      lastSentiment,
      notes,
    } = body;

    if (!customerId || typeof customerId !== 'string') {
      return NextResponse.json(
        { error: 'customerId is required' },
        { status: 400 },
      );
    }

    const memory = await updateCustomerMemory(
      customerId,
      {
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role }),
        ...(company !== undefined && { company }),
        ...(budget !== undefined && { budget }),
        ...(needs !== undefined && { needs }),
        ...(preferences !== undefined && {
          preferences,
        }),
        ...(objections !== undefined && {
          objections,
        }),
        ...(buyingStage !== undefined && {
          buyingStage,
        }),
        ...(lastIntent !== undefined && {
          lastIntent,
        }),
        ...(lastSentiment !== undefined && {
          lastSentiment,
        }),
        ...(notes !== undefined && { notes }),
      },
    );

    return NextResponse.json({
      success: true,
      memory,
    });
  } catch (error) {
    console.error(
      'Customer memory POST error:',
      error,
    );

    return NextResponse.json(
      {
        error: 'Failed to update customer memory',
      },
      { status: 500 },
    );
  }
}