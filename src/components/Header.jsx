export default function Header() {
  return (
    <header className="flex justify-between items-center px-10 py-6 bg-[#0f172a]">
      <h1 className="text-white text-2xl font-bold">Jacob.</h1>
      <nav className="space-x-8 text-gray-300">
        <a href="#home" className="text-blue-400 font-semibold">Home</a>
        <a href="#about" className="hover:text-white">About</a>
        <a href="#services" className="hover:text-white">Services</a>
        <a href="#portfolio" className="hover:text-white">Portfolio</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </nav>
    </header>
  );
}
