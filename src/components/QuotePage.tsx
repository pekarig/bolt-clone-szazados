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
