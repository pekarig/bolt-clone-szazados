#!/bin/bash
set -e

# Create all component files efficiently
# This creates placeholder versions that will compile

# Slider
cat > src/components/Slider.tsx << 'EOFX'
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Álmod

j nagyot, lakj még nagyobbat',
    subtitle: 'Modern újépítésű lakások Budapest szívében',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    title: 'Exkluzív kedvezmény most!',
    subtitle: 'Ajándék konyhabútor minden lakáshoz',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{slide.title}</h1>
                <p className="text-xl text-gray-200 mb-8">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
EOFX

# SearchForm
cat > src/components/SearchForm.tsx << 'EOFX'
import { useState } from 'react';
import { Search } from 'lucide-react';

export interface SearchFilters {
  minPrice: number;
  maxPrice: number;
  rooms: number;
  minArea: number;
  maxArea: number;
}

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [minPrice, setMinPrice] = useState(30000000);
  const [maxPrice, setMaxPrice] = useState(80000000);
  const [rooms, setRooms] = useState(0);
  const [minArea, setMinArea] = useState(30);
  const [maxArea, setMaxArea] = useState(120);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ minPrice, maxPrice, rooms, minArea, maxArea });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 -mt-16 relative z-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Találja meg az ideális lakást</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-4 rounded-full font-semibold hover:shadow-xl transition flex items-center justify-center gap-2"
        >
          <Search size={20} />
          Keresés
        </button>
      </form>
    </div>
  );
}
EOFX

# PropertyCard
cat > src/components/PropertyCard.tsx << 'EOFX'
import { Home } from 'lucide-react';
import { Property } from '../lib/supabase';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <a
      href={`/property/${property.id}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
    >
      <div className="relative h-48 bg-gray-200">
        {property.floor_plan_url ? (
          <img src={property.floor_plan_url} alt={property.property_number} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home size={48} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-2xl font-bold text-cyan-500">{(property.price / 1000000).toFixed(1)} M Ft</div>
        <p className="text-gray-600">{property.rooms} szoba • {property.area} m²</p>
      </div>
    </a>
  );
}
EOFX

# Hooks
cat > src/hooks/useProperties.ts << 'EOFX'
import { useState, useEffect } from 'react';
import { supabase, Property } from '../lib/supabase';
import { SearchFilters } from '../components/SearchForm';

export function useProperties(filters?: SearchFilters | null) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        let query = supabase.from('properties').select('*').order('property_number');
        const { data, error } = await query;
        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error('Error:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, [filters]);

  return { properties, loading };
}

export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('properties').select('*').eq('id', id).maybeSingle();
        if (error) throw error;
        setProperty(data);
      } catch (error) {
        console.error('Error:', error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProperty();
  }, [id]);

  return { property, loading };
}
EOFX

echo "All components created successfully!"
