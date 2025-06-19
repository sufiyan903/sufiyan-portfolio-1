import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Scroll lock for mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let current = "";
      for (const link of navLinks) {
        const sectionId = link.id === "home" ? "hero" : link.id;
        const section = document.getElementById(sectionId);
        if (section && scrollPosition >= section.offsetTop) {
          current = link.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id) => (e) => {
    e.preventDefault();
    const scrollId = id === "home" ? "hero" : id;
    const element = document.getElementById(scrollId);
    if (element) {
      const navbarHeight = 80; // Adjust if navbar height changes
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
    setIsOpen(false); // Close mobile menu after click
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-red-500 cursor-pointer select-none"
          onClick={handleClick("home")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") handleClick("home")(e); }}
          aria-label="Scroll to home section"
        >
          Portfolio
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg pl-10">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={handleClick(id)}
                className={`hover:text-red-500 transition ${
                  activeSection === id ? "text-red-500 font-semibold" : ""
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu Icon */}
        <button
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-900 px-6 py-4 space-y-4 text-lg">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={handleClick(id)}
                className={`block hover:text-red-500 ${
                  activeSection === id ? "text-red-500 font-semibold" : ""
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
