import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Clear existing articles
    await db.collection('articles').deleteMany({});

    const articles = [
      {
        title: "Why I Love Next.js 16",
        slug: "why-nextjs-16",
        content: "Next.js 16 introduces powerful new features including better caching, Turbopack improvements, and enhanced server components. It's truly a game changer for modern web development.",
        excerpt: "Exploring the latest features in Next.js 16 and how they changed my development workflow.",
        createdAt: new Date(),
      },
      {
        title: "Building Modern Portfolios in 2026",
        slug: "modern-portfolios-2026",
        content: "In today's competitive tech market, your portfolio is your strongest asset. Here's what I've learned while building mine using Next.js, Tailwind CSS, and MongoDB.",
        excerpt: "Lessons learned while building a standout developer portfolio.",
        createdAt: new Date(),
      }
    ];

    await db.collection('articles').insertMany(articles);

    return NextResponse.json({ 
      message: "✅ Sample articles seeded successfully!" 
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to seed articles" }, { status: 500 });
  }
}