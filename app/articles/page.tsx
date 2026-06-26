import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import clientPromise from '@/lib/db';

export default async function ArticlesPage() {
  const session = await auth();

  const client = await clientPromise;
  const db = client.db();
  const articles = await db.collection('articles')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold">Articles</h1>
        {session && (
          <Link href="/articles/new" className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800">
            Write New Article
          </Link>
        )}
      </div>

      <div className="grid gap-8">
        {articles.map((article: any) => (
          <Link 
            key={article._id.toString()} 
            href={`/articles/${article.slug}`}
            className="block p-8 border rounded-3xl hover:border-black transition group"
          >
            <div className="text-sm text-gray-500 mb-3">
              {new Date(article.createdAt).toLocaleDateString()}
            </div>
            <h2 className="text-3xl font-semibold mb-4 group-hover:underline">{article.title}</h2>
            <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}