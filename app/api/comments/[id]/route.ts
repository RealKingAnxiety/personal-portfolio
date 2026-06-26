import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection('comments').deleteOne({
      _id: new ObjectId(id),
      userId: session.user.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}