import Link from 'next/link';
import ProjectCarousel from '@/components/ProjectCarousel';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg h-screen flex items-center text-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          <h1 className="text-7xl font-bold mb-6">Hi, I'm James</h1>
          
          <div className="flex gap-6 justify-center mt-12">
            <Link 
              href="/projects" 
              className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-gray-200 transition text-lg"
            >
              View My Projects
            </Link>
            <Link 
              href="/articles" 
              className="border border-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition text-lg"
            >
              Read Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-center text-gray-600 mb-12">A selection of recent work</p>
          <ProjectCarousel />
        </div>
      </section>
    </>
  );
}