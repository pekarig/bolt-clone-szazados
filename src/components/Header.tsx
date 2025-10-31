import { Mail, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-2">
        <div className="container mx-auto px-4 flex justify-end items-center gap-6 text-sm">
          <a href="mailto:info@lakasprojekt.hu" className="flex items-center gap-2 hover:opacity-80 transition">
            <Mail size={16} />
            <span>info@lakasprojekt.hu</span>
          </a>
          <a href="tel:+36301234567" className="flex items-center gap-2 hover:opacity-80 transition">
            <Phone size={16} />
            <span>+36 30 123 4567</span>
          </a>
        </div>
      </div>

      <nav className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                LP
              </div>
              <span className="text-2xl font-bold text-gray-800">LakásProjekt</span>
            </a>

            <button
              className="lg:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden lg:flex items-center gap-8">
              <a href="/" className="text-gray-700 hover:text-cyan-500 transition font-medium">
                Főoldal
              </a>
              <a href="/flat-list" className="text-gray-700 hover:text-cyan-500 transition font-medium">
                Lakáslista
              </a>
              <a href="/technical" className="text-gray-700 hover:text-cyan-500 transition font-medium">
                Műszaki leírás
              </a>
              <a href="/gallery" className="text-gray-700 hover:text-cyan-500 transition font-medium">
                Galéria
              </a>
              <a
                href="/quote"
                className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition"
              >
                Árajánlatkérés
              </a>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 flex flex-col gap-4">
              <a href="/" className="text-gray-700 hover:text-cyan-500 transition font-medium">
                Főoldal
              </a>
              <a href="/flat-list" className="text-gray-700 hover:text-cyan-500 transition font-medium">
                Lakáslista
              </a>
              <a href="/technical" className="text-gray-700 hover:text-cyan-500 transition font-medium">
                Műszaki leírás
              </a>
              <a href="/gallery" className="text-gray-700 hover:text-cyan-500 transition font-medium">
                Galéria
              </a>
              <a
                href="/quote"
                className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition text-center"
              >
                Árajánlatkérés
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
