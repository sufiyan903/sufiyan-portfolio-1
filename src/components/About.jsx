import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export function About() {
  const [ref, isVisible] = useRevealOnScroll();

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-white py-12 px-4 sm:px-8 max-w-6xl mx-auto mt-4 mb-16 relative overflow-hidden"
    >
      {/* Vertical Lines */}
      <div className="hidden sm:block absolute top-6 bottom-6 left-0 w-1 bg-red-500 rounded" />
      <div className="hidden sm:block absolute top-6 bottom-6 right-0 w-1 bg-red-500 rounded" />

      {/* Heading */}
      <motion.h2
        className="flex flex-col sm:flex-row items-center justify-center text-3xl sm:text-4xl font-bold mb-10 text-red-500 gap-2 sm:gap-3 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <FaUser className="text-red-500" size={30} />
        About Me
      </motion.h2>

      {/* Responsive Paragraph */}
      <motion.p
        className="text-gray-300 leading-relaxed text-base sm:text-lg sm:text-justify text-justify sm:px-6"
        initial={{ x: -100, opacity: 0 }}
        animate={isVisible ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        I am Sufiyan A, a Computer Science and Engineering student at KPR Institute of Engineering and Technology, Coimbatore. I have a strong passion for machine learning, databases, and software development, with skills in Java, Python, C, and experience working with SQL databases, Scikit-Learn, TensorFlow, and ReactJS. During my internship at EduPhoenix Pvt. Ltd., I developed ML models for regression and classification, gaining hands-on experience in data analysis and predictive modeling. I have completed projects such as an AI Chatbot Agent, Loan Approval Prediction, Object Detection Using CNN, and  Customer Turnover Analysis. Additionally, I hold certifications in Data Science, Data Analytics with Python (NPTEL), and Microsoft Data Visualization (Tableau).
      </motion.p>

      {/* Fix for mobile overflow */}
      <style>{`
        @media (max-width: 767px) {
          html, body, #root {
            overflow-x: hidden !important;
            max-width: 100vw !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
