#!/bin/bash

# Footer
cat > src/components/Footer.tsx << 'EOF'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                LP
              </div>
              <span className="text-xl font-bold text-white">LakásProjekt</span>
            </div>
            <p className="text-sm leading-relaxed">
              Modern újépítésű lakások Budapest szívében. Kiváló minőség, gondos tervezés, álomba illő otthonok.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Menü</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-cyan-400 transition">
                  Főoldal
                </a>
              </li>
              <li>
                <a href="/flat-list" className="hover:text-cyan-400 transition">
                  Lakáslista
                </a>
              </li>
              <li>
                <a href="/technical" className="hover:text-cyan-400 transition">
                  Műszaki leírás
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-cyan-400 transition">
                  Galéria
                </a>
              </li>
              <li>
                <a href="/quote" className="hover:text-cyan-400 transition">
                  Árajánlatkérés
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Elérhetőség</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>1051 Budapest, Példa utca 12.</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-cyan-400 flex-shrink-0" />
                <a href="tel:+36301234567" className="hover:text-cyan-400 transition">
                  +36 30 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-cyan-400 flex-shrink-0" />
                <a href="mailto:info@lakasprojekt.hu" className="hover:text-cyan-400 transition">
                  info@lakasprojekt.hu
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kövess minket</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-pink-500 transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-pink-500 transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-pink-500 transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-sm">
          <p>&copy; 2025 LakásProjekt. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
}
EOF

echo "Created Footer.tsx"
