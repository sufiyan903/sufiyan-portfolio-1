import { FaGraduationCap } from "react-icons/fa";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export default function Education() {
  const educations = [
    {
      title: "KPR Institute of Engineering and Technology",
      degree: "BE CSE (2022–2026)",
      details: "CGPA: 8.17",
    },
    {
      title: "PMGHSS",
      degree: "HSC (2021)",
      details: "Percentage: 95%",
    },
    {
      title: "BMHSS",
      degree: "SSLC (2019)",
      details: "Percentage: 99%",
    },
  ];

  return (
    <section
      id="education"
      className="text-white py-12 px-4 sm:px-6 md:py-16 md:px-6 max-w-6xl mx-auto my-16 relative overflow-hidden"
    >
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-center text-red-500 flex items-center justify-center gap-2 sm:gap-3">
        <FaGraduationCap className="text-red-500" size={24} />
        Education
      </h2>

      {/* Timeline with content */}
      <div className="relative ml-4 sm:ml-6 max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute top-0 left-0 h-full w-0.5 sm:w-1 bg-red-500 rounded-full" />

        <div className="flex flex-col gap-8 sm:gap-12 pl-4 sm:pl-6">
          {educations.map(({ title, degree, details }, index) => {
            const [ref, isVisible] = useRevealOnScroll(index * 300);

            return (
              <div
                key={index}
                ref={ref}
                className={`
                  bg-gradient-to-r from-gray-800 via-gray-900 to-black 
                  rounded-xl shadow-lg p-4 sm:p-6 md:p-8 w-full
                  transform transition-transform duration-700 ease-out
                  ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
                  hover:scale-105 hover:shadow-[0_0_20px_5px_rgba(220,38,38,0.7)]
                `}
                style={{ willChange: "transform" }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-red-500 flex items-center gap-1 sm:gap-2">
                  <FaGraduationCap size={18} />
                  {title}
                </h3>
                <p className="text-gray-300 italic mb-1 text-sm sm:text-base">{degree}</p>
                <p className="text-gray-400 text-sm sm:text-base">{details}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile scale fix */}
      <style>{`
        @media (max-width: 767px) {
          html, body, #root {
            overflow-x: hidden !important;
            max-width: 100vw !important;
          }
        }
      `}</style>
    </section>
  );
}
