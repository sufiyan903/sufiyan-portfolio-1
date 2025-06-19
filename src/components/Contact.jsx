import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

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

export function Contact() {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [ref, isVisible] = useRevealOnScroll(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.current) return;

    emailjs
      .sendForm(
        "service_8wkqunt",
        "template_0w3u42m",
        form.current,
        "5mYEt06-peoOY4XMk"
      )
      .then(
        () => {
          setSubmitted(true);
          form.current.reset();
          setTimeout(() => setSubmitted(false), 4000);
        },
        (error) => {
          setError("Failed to send message, please try again later.");
          console.error(error.text);
        }
      );
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-16 px-6 max-w-3xl sm:max-w-4xl mx-auto rounded-2xl shadow-lg my-16
        transition-all duration-700 ease-out transform
        ${isVisible ? "opacity-100 translate-x-0" : "-translate-x-16 opacity-0"}`}
      aria-labelledby="contact-heading"
    >
      <h2
        id="contact-heading"
        className="text-4xl font-bold mb-4 text-center text-red-500 flex items-center justify-center gap-3"
      >
        📞 Contact Me
      </h2>
      <p className="text-center text-gray-300 mb-10">
        Feel free to connect with me.
      </p>

      <div className="space-y-6 text-lg mb-10 px-2 sm:px-0">
        <div
          className="flex items-center gap-4 hover:text-red-400 transition-colors cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => window.open("tel:+919567541651")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") window.open("tel:+919567541651");
          }}
          aria-label="Call +91 9567541651"
        >
          <FaPhoneAlt className="text-red-500 text-xl flex-shrink-0" />
          <span>+91 9567541651</span>
        </div>

        <div className="flex items-center gap-4 hover:text-red-400 transition-colors">
          <FaEnvelope className="text-red-500 text-xl flex-shrink-0" />
          <a
            href="mailto:sufiyanibnrahman903@gmail.com"
            className="transition-colors hover:underline"
            aria-label="Send email to sufiyanibnrahman903@gmail.com"
          >
            sufiyanibnrahman903@gmail.com
          </a>
        </div>

        <div
          className="flex items-center gap-4 hover:text-red-400 transition-colors cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() =>
            window.open(
              "https://www.google.com/maps/search/Palakkad,+Kerala",
              "_blank"
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              window.open(
                "https://www.google.com/maps/search/Palakkad,+Kerala",
                "_blank"
              );
            }
          }}
          aria-label="View location Palakkad, Kerala on map"
        >
          <FaMapMarkerAlt className="text-red-500 text-xl flex-shrink-0" />
          <span>Palakkad, Kerala</span>
        </div>
      </div>

      <form
        ref={form}
        className="flex flex-col space-y-4 px-2 sm:px-0"
        onSubmit={handleSubmit}
        aria-label="Contact form"
      >
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          autoComplete="name"
          className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition placeholder-gray-400 caret-white text-white"
          required
          aria-required="true"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          autoComplete="email"
          className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition placeholder-gray-400 caret-white text-white"
          required
          aria-required="true"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition placeholder-gray-400 caret-white text-white resize-none"
          required
          aria-required="true"
        ></textarea>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-white font-semibold transition duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
          aria-label="Send message"
        >
          Send Message <IoIosSend size={20} />
        </button>
      </form>

      {submitted && (
        <div
          className="mt-6 text-center text-green-400 font-semibold flex items-center justify-center gap-2 animate-fade-in"
          role="alert"
          aria-live="polite"
        >
          <IoIosSend size={20} className="text-green-400" />
          Message sent successfully!
        </div>
      )}

      {error && (
        <div
          className="mt-6 text-center text-red-400 font-semibold animate-fade-in"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
