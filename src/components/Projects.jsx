import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaFolderOpen } from "react-icons/fa";

function useRevealOnScroll(delay = 0) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        ([entry], observerInstance) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observerInstance.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(ref.current);

      return () => {
        if (ref.current) observer.unobserve(ref.current);
        observer.disconnect();
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return [ref, isVisible];
}

export function Projects() {
  const projects = [
    {
      title: "AI Chatbot Agent",
      description:
        "Developed an AI-powered chatbot agent to assist users in real-time with natural language processing.",
      github: "https://github.com/sufiyan903/chatbot",
    },
    {
      title: "Object Detection",
      description:
        "Built a machine learning model to detect objects using deep learning techniques.",
      github: "https://github.com/sufiyan903/object-detection",
    },
    {
      title: "Customer Churn Analysis",
      description:
        "Analyzed customer data to identify churn patterns and improve retention strategies using data science techniques.",
      github: "https://github.com/sufiyan903/customer-turnover-analysis",
    },
  ];

  return (
    <section
      id="projects"
      className="text-white py-16 px-6 max-w-6xl mx-auto my-16"
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-red-500 flex items-center justify-center gap-3">
        <FaFolderOpen size={30} />
        Projects
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(({ title, description, github }, index) => {
          const delay = index * 300; // Stagger reveal
          const [ref, isVisible] = useRevealOnScroll(delay);

          return (
            <div
              key={title}
              ref={ref}
              className={`bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-2xl shadow-lg p-6 md:p-8 transition-transform duration-700 ease-out transform
                ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
                hover:scale-105 hover:shadow-[0_0_20px_5px_rgba(220,38,38,0.7)]`}
            >
              <h3 className="text-xl font-semibold mb-3 text-red-500 flex items-center gap-2">
                <FaFolderOpen />
                {title}
              </h3>
              <p className="text-gray-300 mb-4">{description}</p>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} project on GitHub`}
                className="flex items-center justify-center w-fit gap-2 text-white border border-white rounded-full px-4 py-2 hover:text-red-500 transition"
              >
                <FaGithub />
                View on GitHub
              </a>
            </div>
          );
        })}
      </div>

      <style>{`
        .hover\\:shadow-[0_0_20px_5px_rgba\\(220,38,38,0\\.7\\)]:hover {
          will-change: box-shadow;
        }
        .opacity-0 {
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .opacity-100 {
          opacity: 1;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
      `}</style>
    </section>
  );
}
