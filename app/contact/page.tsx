'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-center mb-4">Get In Touch</h1>
      <p className="text-center text-gray-600 mb-12">I'd love to hear from you</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-4 border rounded-2xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-4 border rounded-2xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={8}
            className="w-full px-4 py-4 border rounded-2xl"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 disabled:opacity-70"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && <p className="text-green-600 text-center">Message sent successfully!</p>}
        {status === 'error' && <p className="text-red-600 text-center">Failed to send message. Try again.</p>}
      </form>
    </div>
  );
}