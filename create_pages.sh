#!/bin/bash

# HomePage
cat > src/components/HomePage.tsx << 'EOFPAGE'
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Slider from './Slider';
import SearchForm, { SearchFilters } from './SearchForm';
import PropertyCard from './PropertyCard';
import { useProperties } from '../hooks/useProperties';

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters | null>(null);
  const { properties, loading } = useProperties(filters);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-[120px]">
        <Slider />
      </div>
      <div className="container mx-auto px-4">
        <SearchForm onSearch={(f) => setFilters(f)} />
      </div>
      {filters && (
        <section className="py-16 container mx-auto px-4">
          {loading ? (
            <div className="text-center"><div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </section>
      )}
      <Footer />
    </div>
  );
}
EOFPAGE

# FlatListPage
cat > src/components/FlatListPage.tsx << 'EOFPAGE'
import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { supabase, Property } from '../lib/supabase';

export default function FlatListPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data } = await supabase.from('properties').select('*').order('property_number');
        setProperties(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-[120px] pb-16">
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Elérhető lakások</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-12"><div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Lakás</th>
                    <th className="px-6 py-4 text-left">Szobák</th>
                    <th className="px-6 py-4 text-left">Terület</th>
                    <th className="px-6 py-4 text-left">Ár</th>
                    <th className="px-6 py-4 text-left">Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p) => (
                    <tr key={p.id} className="border-b">
                      <td className="px-6 py-4 font-bold">{p.property_number}</td>
                      <td className="px-6 py-4">{p.rooms}</td>
                      <td className="px-6 py-4">{p.area} m²</td>
                      <td className="px-6 py-4">{(p.price / 1000000).toFixed(1)} M Ft</td>
                      <td className="px-6 py-4">
                        <a href={`/property/${p.id}`} className="bg-cyan-500 text-white px-4 py-2 rounded-full inline-flex items-center gap-2">
                          <Eye size={16} />
                          Részletek
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
EOFPAGE

# PropertyDetailPage
cat > src/components/PropertyDetailPage.tsx << 'EOFPAGE'
import { useParams } from './Router';
import { Home } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { useProperty } from '../hooks/useProperties';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { property, loading } = useProperty(id || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-[120px] flex items-center justify-center py-24">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-[120px] container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold">Lakás nem található</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-[120px] pb-16">
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Lakás {property.property_number}</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="relative h-96 bg-gray-200 mb-6">
              {property.floor_plan_url ? (
                <img src={property.floor_plan_url} alt={property.property_number} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Home size={96} className="text-gray-400" />
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold text-cyan-500 mb-4">{(property.price / 1000000).toFixed(1)} M Ft</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div><span className="font-bold">Szobák:</span> {property.rooms}</div>
              <div><span className="font-bold">Terület:</span> {property.area} m²</div>
              <div><span className="font-bold">Emelet:</span> {property.floor}</div>
              <div><span className="font-bold">Erkély:</span> {property.balcony} m²</div>
            </div>
            <p className="text-gray-600">{property.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
EOFPAGE

# TechnicalPage
cat > src/components/TechnicalPage.tsx << 'EOFPAGE'
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const sections = [
  { title: 'Szerkezetek', content: ['Vasbeton vázas rendszer', 'EPS 15 cm hőszigetelés'] },
  { title: 'Gépészet', content: ['Padlófűtés', 'Központi bojler'] },
];

export default function TechnicalPage() {
  const [open, setOpen] = useState<number[]>([0]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-[120px] pb-16">
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Műszaki leírás</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {sections.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md mb-4">
              <button onClick={() => setOpen(open.includes(i) ? open.filter(x => x !== i) : [...open, i])} className="w-full flex justify-between p-6">
                <h3 className="text-xl font-bold">{s.title}</h3>
                {open.includes(i) ? <ChevronUp /> : <ChevronDown />}
              </button>
              {open.includes(i) && (
                <div className="px-6 pb-6 border-t">
                  <ul className="space-y-2 pt-4">
                    {s.content.map((c, j) => (
                      <li key={j} className="flex gap-2"><div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div><span>{c}</span></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
EOFPAGE

# GalleryPage
cat > src/components/GalleryPage.tsx << 'EOFPAGE'
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { supabase, GalleryImage } from '../lib/supabase';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('gallery_images').select('*').order('display_order');
      setImages(data || []);
    }
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-[120px] pb-16">
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Galéria</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img.id} onClick={() => setSelected(img)} className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition">
                <img src={img.thumbnail_url} alt={img.title} className="w-full h-64 object-cover" />
                <div className="p-4"><h3 className="font-bold">{img.title}</h3></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white"><X size={32} /></button>
          <img src={selected.image_url} alt={selected.title} className="max-w-full max-h-[90vh] rounded-lg" />
        </div>
      )}
      <Footer />
    </div>
  );
}
EOFPAGE

# QuotePage
cat > src/components/QuotePage.tsx << 'EOFPAGE'
import { useState } from 'react';
import { Send } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { supabase } from '../lib/supabase';

export default function QuotePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('contact_inquiries').insert(form);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-[120px] pb-16">
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Árajánlatkérés</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          {submitted ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Köszönjük!</h2>
              <p>Hamarosan felvesszük Önnel a kapcsolatot.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" required placeholder="Név" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                <input type="tel" placeholder="Telefon" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                <textarea required placeholder="Üzenet" rows={6} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 border rounded-lg resize-none" />
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2">
                  <Send size={20} />
                  Küldés
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
EOFPAGE

# Modal
cat > src/components/Modal.tsx << 'EOFPAGE'
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Akció" className="w-full h-64 object-cover rounded-t-2xl" />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center"><X size={20} /></button>
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4">Ajándék konyhabútor!</h2>
          <p className="text-gray-600 mb-6">Minden lakáshoz ajándékba adunk egy modern konyhabútort!</p>
          <button onClick={onClose} className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold">Részletek</button>
        </div>
      </div>
    </div>
  );
}
EOFPAGE

# Chat
cat > src/components/Chat.tsx << 'EOFPAGE'
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Üdvözöljük!', sender: 'agent' }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setTimeout(() => setMessages(prev => [...prev, { text: 'Köszönjük! Válaszolunk hamarosan.', sender: 'agent' }]), 1000);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-full shadow-xl z-40 flex items-center justify-center">
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-40">
          <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white p-4 rounded-t-2xl">
            <h3 className="font-bold">Chat</h3>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${m.sender === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Üzenet..." className="flex-1 px-4 py-2 border rounded-full" />
              <button onClick={handleSend} className="w-10 h-10 bg-cyan-500 text-white rounded-full flex items-center justify-center">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
EOFPAGE

echo "All pages created!"
