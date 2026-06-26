import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    const client = await clientPromise;
    const db = client.db();

    await db.collection('contacts').insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}