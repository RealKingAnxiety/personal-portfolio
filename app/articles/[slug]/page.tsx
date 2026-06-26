import { auth } from '@/lib/auth';
import clientPromise from '@/lib/db';
import CommentSection from '@/components/CommentSection';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();

  const client = await clientPromise;
  const db = client.db();

  const article = await db.collection('articles').findOne({ slug });

  if (!article) {
    return <div className="text-center py-20 text-2xl">Article not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <article className="prose prose-lg max-w-none">
        <h1 className="text-5xl font-bold mb-6">{article.title}</h1>
        <div className="text-gray-500 mb-10">
          {new Date(article.createdAt).toLocaleDateString()}
        </div>
        <div className="text-xl leading-relaxed whitespace-pre-wrap">{article.content}</div>
      </article>

      <CommentSection articleId={article._id.toString()} />
    </div>
  );
}