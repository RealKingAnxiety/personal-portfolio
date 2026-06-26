import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get('articleId');

  if (!articleId) return NextResponse.json([]);

  const client = await clientPromise;
  const db = client.db();

  const comments = await db.collection('comments')
    .find({ articleId })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(comments);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { articleId, content } = await request.json();

    const client = await clientPromise;
    const db = client.db();

    const comment = await db.collection('comments').insertOne({
      articleId,
      userId: session.user.id,
      userName: session.user.name || 'Anonymous',
      content,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, _id: comment.insertedId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}