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
