'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

type Comment = {
  _id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
};

export default function CommentSection({ articleId }: { articleId: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?articleId=${articleId}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    setIsSubmitting(true);
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, content: newComment }),
    });

    setNewComment('');
    fetchComments();
    setIsSubmitting(false);
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return;
    await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
    fetchComments();
  };

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-semibold mb-8">Comments ({comments.length})</h3>

      {session && (
        <form onSubmit={handleSubmit} className="mb-10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
            rows={4}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 disabled:opacity-70"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment._id} className="border-l-4 border-gray-300 pl-6">
            <div className="flex justify-between">
              <p className="font-medium">{comment.userName}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="mt-2 text-gray-700">{comment.content}</p>
            
            {session?.user?.id === comment.userId && (
              <button
                onClick={() => handleDelete(comment._id)}
                className="text-red-600 text-sm mt-3 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}