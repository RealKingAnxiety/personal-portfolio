'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useWeather } from '@/hooks/useWeather';
import { Cloud, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const { weather, loading } = useWeather();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">J</span>
          </div>
          <span className="font-bold text-2xl">James</span>
        </Link>

        <div className="flex items-center gap-8">
          {/* Weather Widget */}
          <div className="flex items-center gap-2 text-sm">
            <Cloud className="w-4 h-4" />
            {loading ? (
              <span className="text-gray-400">Loading weather...</span>
            ) : weather ? (
              <span>
                {weather.location} • {weather.temp}°F • {weather.description}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-6">
            <Link href="/projects" className="hover:text-blue-600 transition">Projects</Link>
            <Link href="/articles" className="hover:text-blue-600 transition">Articles</Link>
            <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>

            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Hi, {session.user?.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 hover:text-blue-600">
                <User className="w-4 h-4" /> Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}