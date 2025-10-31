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
