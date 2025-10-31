import { useState, useRef, useEffect } from 'react';
import { Search, RotateCcw } from 'lucide-react';

export interface SearchFilters {
  minPrice: number;
  maxPrice: number;
  rooms: number;
  minArea: number;
  maxArea: number;
}

interface SearchFormProps {
  onSearch: (filters: SearchFilters | null) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [minPrice, setMinPrice] = useState(30);
  const [maxPrice, setMaxPrice] = useState(100);
  const [rooms, setRooms] = useState(0);
  const [minArea, setMinArea] = useState(30);
  const [maxArea, setMaxArea] = useState(120);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      minPrice: minPrice * 1000000,
      maxPrice: maxPrice * 1000000,
      rooms,
      minArea,
      maxArea,
    });
  };

  const handleReset = () => {
    setMinPrice(30);
    setMaxPrice(100);
    setRooms(0);
    setMinArea(30);
    setMaxArea(120);
    onSearch(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 -mt-12 relative z-10 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ár (millió Ft)
            </label>
            <div className="relative pt-2">
              <div className="relative h-8">
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={minPrice}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val < maxPrice - 5) setMinPrice(val);
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-20 pointer-events-auto"
                  style={{
                    background: 'transparent',
                  }}
                />
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={maxPrice}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val > minPrice + 5) setMaxPrice(val);
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-20 pointer-events-auto"
                  style={{
                    background: 'transparent',
                  }}
                />
                <div className="absolute w-full h-2 bg-gray-200 rounded-lg top-1/2 -translate-y-1/2 z-0"></div>
                <div
                  className="absolute h-2 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  style={{
                    left: `${((minPrice - 20) / 80) * 100}%`,
                    right: `${100 - ((maxPrice - 20) / 80) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span className="font-semibold">{minPrice} M</span>
                <span className="font-semibold">{maxPrice} M</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Szobaszám
            </label>
            <div className="relative pt-2">
              <input
                type="range"
                min="0"
                max="4"
                value={rooms}
                onChange={(e) => setRooms(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="text-center text-sm font-semibold text-gray-700 mt-2">
                {rooms === 0 ? 'Bármennyi' : `${rooms} szoba`}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alapterület (m²)
            </label>
            <div className="relative pt-2">
              <div className="relative h-8">
                <input
                  type="range"
                  min="30"
                  max="120"
                  value={minArea}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val < maxArea - 10) setMinArea(val);
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-20 pointer-events-auto"
                  style={{
                    background: 'transparent',
                  }}
                />
                <input
                  type="range"
                  min="30"
                  max="120"
                  value={maxArea}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val > minArea + 10) setMaxArea(val);
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-20 pointer-events-auto"
                  style={{
                    background: 'transparent',
                  }}
                />
                <div className="absolute w-full h-2 bg-gray-200 rounded-lg top-1/2 -translate-y-1/2 z-0"></div>
                <div
                  className="absolute h-2 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  style={{
                    left: `${((minArea - 30) / 90) * 100}%`,
                    right: `${100 - ((maxArea - 30) / 90) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span className="font-semibold">{minArea} m²</span>
                <span className="font-semibold">{maxArea} m²</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Keresés
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              title="Visszaállítás"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </form>

      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #ec4899);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #ec4899);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
