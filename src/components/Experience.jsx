import React, { useEffect, useRef, useState } from "react";
import { FaBriefcase } from "react-icons/fa";

// Custom hook with stagger support
function useRevealOnScroll(delay = 0) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return [ref, isVisible];
}

export function Experience() {
  const experiences = [
    {
      role: "Data Science Intern",
      company: "EduPhoenix Private Limited",
      duration: "25/01/2024 - 25/02/2024",
      responsibilities: [
        "Developed ML models for regression and classification.",
        "Analyzed datasets using Pandas and NumPy.",
      ],
    },
    {
      role: "AI ML Intern",
      company: "Reccsar Private Limited",
      duration: "20/01/2025 - 28/02/2025",
      responsibilities: [
        "Worked on AI/ML models to enhance predictive analytics and automation.",
        "Implemented deep learning techniques for image and text classification.",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="text-white py-16 px-6 max-w-6xl mx-auto my-16 relative"
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-red-500 flex items-center justify-center gap-3">
        <FaBriefcase className="text-red-500" size={30} />
        Experience
      </h2>

      {/* Responsive left margin and padding container */}
      <div className="relative ml-4 sm:ml-6">
        {/* Red vertical line */}
        <div className="absolute top-0 left-0 h-full w-1 bg-red-500 rounded-full"></div>

        <div className="flex flex-col gap-12 pl-4 sm:pl-6">
          {experiences.map(({ role, company, duration, responsibilities }, index) => {
            const delay = index * 300;
            const [ref, isVisible] = useRevealOnScroll(delay);

            return (
              <div
                key={index}
                ref={ref}
                className={`bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl shadow-lg p-6 md:p-8 transition-all duration-700 ease-out transform
                  ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
                  hover:scale-105 hover:glow`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <FaBriefcase className="text-red-500" size={20} />
                  <h3 className="text-xl font-semibold text-red-500">{role}</h3>
                </div>
                <p className="text-gray-300 mb-1 font-medium">{company}</p>
                <p className="text-sm text-gray-400 mb-4 italic">{duration}</p>
                <ul className="list-disc list-inside text-gray-200 space-y-2">
                  {responsibilities.map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .hover\\:glow:hover {
          animation: glowRed 1s ease-in-out infinite alternate;
        }
        @keyframes glowRed {
          0% {
            box-shadow: 0 0 10px 2px rgba(220, 38, 38, 0.4);
          }
          100% {
            box-shadow: 0 0 20px 5px rgba(220, 38, 38, 0.8);
          }
        }
      `}</style>
    </section>
  );
}
