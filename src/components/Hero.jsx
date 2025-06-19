import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const jobTitles = ["Full Stack Developer", "AI/ML Engineer", "Data Scientist"];

const StatItem = ({ text }) => <span>{text}</span>;

const Separator = () => (
  <span className="h-6 w-[2px] bg-red-600 inline-block mx-3" />
);

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [ref, isVisible] = useRevealOnScroll();

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % jobTitles.length;
      const fullText = jobTitles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
        setTypingSpeed(50);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <motion.section
      id="hero"
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen w-full overflow-x-hidden flex flex-col justify-center items-center text-white px-4 py-16 max-w-screen-xl mx-auto"
    >
      <div className="flex flex-col-reverse md:flex-row items-center w-full gap-10">
        {/* Left Section */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm Sufiyan A
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-red-500 mb-6 font-semibold h-10">
            {text}
            <span className="blinking-cursor">|</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            A Computer Science and Engineering student passionate about building
            intelligent solutions through Machine Learning, Data Science, and
            full-stack development. I enjoy blending logic and creativity to
            build meaningful applications and solve real-world problems. With
            strong fundamentals in Java, Python, and web technologies, I'm
            committed to continuous learning and innovation.
          </p>

          <div className="flex justify-center md:justify-start gap-6 mt-8 flex-wrap">
            <a
              href="#contact"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full shadow transition duration-300"
            >
              Hire Me
            </a>
            <a
              href="/sufiyan cv final.pdf"
              download
              className="px-6 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium rounded-full transition duration-300"
            >
              Download CV
            </a>
          </div>

          <div className="flex space-x-6 pt-6 justify-center md:justify-start text-white text-2xl">
            <a
              href="https://www.linkedin.com/in/sufiyan-a-21a3b434a"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/sufiyan903"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://leetcode.com/u/Sufiyan_099/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors duration-300"
            >
              <SiLeetcode />
            </a>
          </div>
        </div>

        {/* Right Image Section */}
        <motion.div
          className="md:w-1/2 w-full flex justify-center md:justify-center"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div
            className="relative rounded-full flex items-center justify-center"
            style={{ width: "18rem", height: "18rem" }}
          >
            <div className="absolute w-full h-full rounded-full ring-glow" />
            <img
              src="/profile.png"
              alt="Sufiyan A"
              className="rounded-full object-cover relative z-10"
              style={{ width: "16rem", height: "16rem", cursor: "default" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="w-full mt-20 px-2 sm:px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center text-white text-xl sm:text-2xl md:text-3xl font-bold gap-x-6 gap-y-4 md:gap-0">
          <div className="flex items-center justify-center w-full md:w-auto">
            <StatItem text="100+ Leetcode" />
            <span className="hidden md:inline mx-3">
              <Separator />
            </span>
          </div>
          <div className="flex items-center justify-center w-full md:w-auto">
            <StatItem text="8+ Projects" />
            <span className="hidden md:inline mx-3">
              <Separator />
            </span>
          </div>
          <div className="flex items-center justify-center w-full md:w-auto">
            <StatItem text="30+ Certificates" />
            <span className="hidden md:inline mx-3">
              <Separator />
            </span>
          </div>
          <div className="flex items-center justify-center w-full md:w-auto">
            <StatItem text="8.2 CGPA" />
          </div>
        </div>
      </div>

      <style>{`
        .blinking-cursor {
          font-weight: 100;
          font-size: 28px;
          color: #f87171;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .ring-glow {
          box-sizing: border-box;
          border: 4px solid transparent;
          border-top: 4px solid #ef4444;
          border-right: 4px solid #f87171;
          border-radius: 50%;
          filter: drop-shadow(0 0 8px #ef4444);
          animation: ring-spin 4s linear infinite;
          pointer-events: none;
          z-index: 5;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        @keyframes ring-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 767px) {
          html, body, #root {
            overflow-x: hidden !important;
            width: 100vw;
          }
          section {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;
