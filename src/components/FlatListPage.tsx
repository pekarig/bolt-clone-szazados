import { useState, useEffect } from 'react';
import { Eye, ChevronLeft, ChevronRight, CheckCircle, Clock, XCircle, EyeOff } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { supabase, Property } from '../lib/supabase';

const ITEMS_PER_PAGE = 10;

export default function FlatListPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrice, setShowPrice] = useState(true);

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

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = properties.slice(startIndex, endIndex);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'reserved':
        return <Clock className="text-yellow-500" size={24} />;
      case 'sold':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Elérhető';
      case 'reserved':
        return 'Foglalt';
      case 'sold':
        return 'Eladva';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-[120px] pb-16">
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Lakáslista</h1>
            <p className="text-white/90 mt-2">Összes lakás: {properties.length}</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setShowPrice(!showPrice)}
              className="bg-white shadow-md rounded-lg px-6 py-3 flex items-center gap-2 hover:shadow-lg transition font-semibold text-gray-700"
            >
              {showPrice ? <Eye size={20} /> : <EyeOff size={20} />}
              {showPrice ? 'Árak elrejtése' : 'Árak megjelenítése'}
            </button>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white">
                      <tr>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Alaprajz</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Lakás száma</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Emelet</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Szobaszám</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Terület</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Erkély</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">Tájolás</th>
                        {showPrice && <th className="px-4 py-4 text-left text-sm font-semibold">Vételár</th>}
                        <th className="px-4 py-4 text-center text-sm font-semibold">Státusz</th>
                        <th className="px-4 py-4 text-center text-sm font-semibold">Műveletek</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProperties.map((p, index) => (
                        <tr
                          key={p.id}
                          className={`border-b hover:bg-gray-50 transition ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                          }`}
                        >
                          <td className="px-4 py-4">
                            <img
                              src={p.floor_plan_url || 'https://images.pexels.com/photos/6045245/pexels-photo-6045245.jpeg?auto=compress&cs=tinysrgb&w=200'}
                              alt={`${p.property_number} alaprajz`}
                              className="w-16 h-16 object-cover rounded-lg shadow"
                            />
                          </td>
                          <td className="px-4 py-4">
                            <span className="font-bold text-gray-800">{p.property_number}</span>
                          </td>
                          <td className="px-4 py-4 text-gray-700">{p.floor}. emelet</td>
                          <td className="px-4 py-4 text-gray-700">{p.rooms} szoba</td>
                          <td className="px-4 py-4 text-gray-700">
                            <span className="font-semibold">{p.area}</span> m²
                          </td>
                          <td className="px-4 py-4 text-gray-700">
                            {p.balcony ? <span className="font-semibold">{p.balcony}</span> : '-'} {p.balcony ? 'm²' : ''}
                          </td>
                          <td className="px-4 py-4">
                            <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold">
                              {p.orientation}
                            </span>
                          </td>
                          {showPrice && (
                            <td className="px-4 py-4">
                              <span className="font-bold text-gray-800">
                                {(p.price / 1000000).toFixed(1)} M Ft
                              </span>
                            </td>
                          )}
                          <td className="px-4 py-4">
                            <div className="flex flex-col items-center gap-1">
                              {getStatusIcon(p.status)}
                              <span className="text-xs text-gray-600">{getStatusText(p.status)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <a
                              href={`/property/${p.id}`}
                              className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 hover:shadow-lg transition text-sm font-semibold"
                            >
                              <Eye size={16} />
                              Részletek
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`p-3 rounded-full ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                    } transition`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full font-semibold transition ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-3 rounded-full ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                    } transition`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

              <div className="text-center mt-4 text-gray-600">
                {startIndex + 1} - {Math.min(endIndex, properties.length)} / {properties.length} lakás
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
