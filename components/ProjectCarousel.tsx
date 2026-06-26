'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const projects = [
  {
    id: 1,
    title: "RecipeVault",
    description: "Full-stack recipe management app with authentication and CRUD operations.",
    tech: "Next.js",
    color: "from-orange-500 to-red-600"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates.",
    tech: "Next.js",
    color: "from-blue-600 to-purple-600"
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Modern online store with cart and admin dashboard.",
    tech: "Next.js",
    color: "from-emerald-600 to-teal-600"
  }
];

export default function ProjectCarousel() {
  return (
    <div className="max-w-5xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        className="rounded-3xl"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className={`relative h-[520px] rounded-3xl overflow-hidden bg-gradient-to-br ${project.color} flex items-center justify-center text-white`}>
              <div className="text-center px-10">
                <div className="text-sm uppercase tracking-widest mb-4 opacity-90">{project.tech}</div>
                <h3 className="text-5xl font-bold mb-6">{project.title}</h3>
                <p className="text-xl max-w-md mx-auto leading-relaxed">{project.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}