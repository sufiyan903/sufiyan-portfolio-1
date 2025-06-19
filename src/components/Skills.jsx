import { FaTools, FaCheckCircle } from "react-icons/fa";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export function Skills() {
  const [ref, isVisible] = useRevealOnScroll();

  const skillGroups = [
    { category: "Programming", skills: ["Java", "Python", "C"] },
    { category: "Databases", skills: ["SQL"] },
    { category: "Machine Learning", skills: ["Scikit-Learn", "TensorFlow", "NLP", "RAG"] },
    { category: "Web Development", skills: ["HTML", "CSS", "JavaScript", "ReactJS"] },
    { category: "Data Visualization", skills: ["Matplotlib", "Seaborn", "Tableau", "Power BI"] },
    { category: "Cloud and DevOps", skills: ["AWS", "Docker"] },
  ];

  const pairs = [];
  for (let i = 0; i < skillGroups.length; i += 2) {
    pairs.push(skillGroups.slice(i, i + 2));
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="text-white py-16 px-4 sm:px-6 max-w-6xl mx-auto my-16 overflow-hidden"
    >
      {/* Heading */}
      <h2
        className={`text-4xl font-bold mb-12 text-center text-red-500 flex items-center justify-center gap-3 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <FaTools size={30} />
        Skills
      </h2>

      {/* Skill Cards in Pairs */}
      <div className="flex flex-col gap-12">
        {pairs.map((pair, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-stretch justify-center gap-6 w-full"
          >
            {/* Left Card */}
            <div
              className={`flex-1 rounded-2xl p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg
                transition-all duration-700 ease-out transform hover:scale-105
                hover:shadow-[0_0_20px_5px_rgba(220,38,38,0.7)]
                ${isVisible ? "opacity-100 translate-x-0" : "-translate-x-16 opacity-0"}`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <h3 className="text-xl font-semibold mb-3 text-red-500 flex items-center gap-2">
                <FaTools /> {pair[0].category}
              </h3>
              <ul className="text-gray-200 list-inside space-y-2">
                {pair[0].skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 cursor-pointer">
                    <FaCheckCircle className="text-red-500 transition-transform duration-300 ease-in-out hover:scale-110" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vertical Divider - hidden on mobile */}
            {pair.length === 2 && (
              <div
                className="hidden sm:block w-1 bg-red-500 rounded-full my-auto"
                style={{ minHeight: "150px" }}
              ></div>
            )}

            {/* Right Card */}
            {pair[1] ? (
              <div
                className={`flex-1 rounded-2xl p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg
                  transition-all duration-700 ease-out transform hover:scale-105
                  hover:shadow-[0_0_20px_5px_rgba(220,38,38,0.7)]
                  ${isVisible ? "opacity-100 translate-x-0" : "translate-x-16 opacity-0"}`}
                style={{ transitionDelay: `${idx * 200 + 100}ms` }}
              >
                <h3 className="text-xl font-semibold mb-3 text-red-500 flex items-center gap-2">
                  <FaTools /> {pair[1].category}
                </h3>
                <ul className="text-gray-200 list-inside space-y-2">
                  {pair[1].skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 cursor-pointer">
                      <FaCheckCircle className="text-red-500 transition-transform duration-300 ease-in-out hover:scale-110" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile overflow fix */}
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
