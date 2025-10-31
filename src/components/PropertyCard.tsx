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
