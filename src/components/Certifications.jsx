import React, { useEffect, useRef, useState } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

// Custom hook for scroll reveal
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

export function Certifications() {
  const [modalContent, setModalContent] = useState(null);

  const certifications = [
    { title: "Natural Language Processing", issuer: "NPTEL", year: "2025" },
    { title: "Data Analytics with Python", issuer: "NPTEL", year: "2024" },
    { title: "Learning Analytics Tools", issuer: "NPTEL", year: "2024" },
    { title: "Data Science Fundamentals", issuer: "", year: "" },
    { title: "Preparing Data for Analysis", issuer: "", year: "" },
    { title: "Microsoft Data Visualization", issuer: "", year: "" },
    { title: "Career Essentials in Generative AI", issuer: "", year: "" },
    { title: "Python and Machine Learning", issuer: "ICS Institution", year: "" },
    { title: "Introduction to NoSQL Databases", issuer: "IBM", year: "" },
  ];

  const handleClick = (title) => {
    const fileMap = {
      "Python and Machine Learning": { fileName: "Python and Machine Learning", ext: "png" },
      "Preparing Data for Analysis": { fileName: "Preparing Data for Analysis", ext: "pdf" },
      "Microsoft Data Visualization": { fileName: "Microsoft Data Visualization", ext: "pdf" },
      "Natural Language Processing": { fileName: "Natural Language Processing", ext: "pdf" },
      "Data Analytics with Python": { fileName: "Data Analytics with Python", ext: "pdf" },
      "Learning Analytics Tools": { fileName: "Learning Analytics Tools", ext: "pdf" },
      "Data Science Fundamentals": { fileName: "Data Science Fundamentals", ext: "pdf" },
      "Career Essentials in Generative AI": { fileName: "Career Essentials in Generative AI", ext: "pdf" },
      "Introduction to NoSQL Databases": { fileName: "Introduction to NoSQL Databases", ext: "pdf" },
    };

    const cert = fileMap[title];
    if (!cert) return;

    const filePath = `/certifications/${encodeURIComponent(cert.fileName)}.${cert.ext}`;
    const isImage = cert.ext === "png";

    setModalContent({ filePath, isImage });
  };

  const closeModal = () => setModalContent(null);

  return (
    <section id="certifications" className="text-white py-16 px-6 max-w-6xl mx-auto my-16">
      <h2 className="text-4xl font-bold mb-12 text-center text-red-500 flex items-center justify-center gap-3">
        <GiGraduateCap size={32} />
        Certifications
      </h2>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="hidden lg:block absolute top-0 bottom-0 left-1/3 w-[2px] bg-red-500 rounded"></div>
        <div className="hidden lg:block absolute top-0 bottom-0 left-2/3 w-[2px] bg-red-500 rounded"></div>

        {certifications.map(({ title, issuer, year }, index) => {
          const delay = index * 200;
          const [ref, isVisible] = useRevealOnScroll(delay);

          return (
            <div
              key={index}
              ref={ref}
              tabIndex={0}
              onClick={() => handleClick(title)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(title); }}
              className={`cursor-pointer cert-card bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-2xl shadow-lg p-4 md:p-6 transition-all duration-700 ease-out transform
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500`}
            >
              <h3 className="text-lg font-semibold text-red-500 mb-2 flex items-center gap-2">
                <GiGraduateCap size={18} />
                {title}
              </h3>
              {issuer && (
                <p className="text-sm text-gray-300">
                  {issuer} {year && `(${year})`}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-h-[85vh] max-w-[90vw] w-full">
            {/* Control box (Close button) */}
            <div className="absolute -top-12 right-0 flex space-x-2 bg-red-600 px-3 py-1 rounded-md shadow-lg z-50
                            sm:top-2 sm:right-2 sm:fixed">
              <button
                onClick={closeModal}
                className="text-white p-2 rounded hover:bg-red-700"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            <div
              className="overflow-auto max-h-[85vh] rounded-lg shadow-lg border-4 border-red-500 bg-black"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {modalContent.isImage ? (
                <img
                  src={modalContent.filePath}
                  alt="Certificate"
                  className="object-contain max-h-[80vh] max-w-full mx-auto rounded-lg"
                />
              ) : (
                <iframe
                  src={`${modalContent.filePath}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="Certificate PDF"
                  className="w-full h-[80vh] rounded-lg"
                  style={{ border: "none" }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cert-card:hover {
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
