import { useState, useEffect } from 'react';
import { supabase, Property } from '../lib/supabase';
import { X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';

interface PropertyEditorProps {
  property: Property | null;
  onClose: () => void;
  onSave: () => void;
}

export default function PropertyEditor({ property, onClose, onSave }: PropertyEditorProps) {
  const [formData, setFormData] = useState({
    property_number: '',
    title: '',
    description: '',
    price: 0,
    area: 0,
    rooms: 1,
    floor: 0,
    balcony: false,
    orientation: '',
    status: 'available' as 'available' | 'sold' | 'reserved',
  });
  const [images, setImages] = useState<string[]>([]);
  const [floorPlan, setFloorPlan] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (property) {
      setFormData({
        property_number: property.property_number,
        title: property.title,
        description: property.description,
        price: property.price,
        area: property.area,
        rooms: property.rooms,
        floor: property.floor,
        balcony: property.balcony || false,
        orientation: property.orientation || '',
        status: property.status,
      });
      setImages(property.images || []);
      setFloorPlan(property.floor_plan || '');
    }
  }, [property]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isFloorPlan = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Csak képfájlokat tölthetsz fel!');
      return;
    }

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `properties/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      if (isFloorPlan) {
        setFloorPlan(publicUrl);
      } else {
        setImages([...images, publicUrl]);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Hiba történt a kép feltöltése során: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUrlAdd = () => {
    const url = prompt('Add meg a kép URL-jét:');
    if (url && url.trim()) {
      setImages([...images, url.trim()]);
    }
  };

  const handleFloorPlanUrlAdd = () => {
    const url = prompt('Add meg az alaprajz URL-jét:');
    if (url && url.trim()) {
      setFloorPlan(url.trim());
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        images,
        floor_plan: floorPlan || null,
      };

      if (property) {
        const { error } = await supabase
          .from('properties')
          .update(data)
          .eq('id', property.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('properties').insert([data]);
        if (error) throw error;
      }

      onSave();
      onClose();
    } catch (error: any) {
      console.error('Error saving property:', error);
      alert('Hiba történt a mentés során: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">
            {property ? 'Ingatlan szerkesztése' : 'Új ingatlan hozzáadása'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ingatlan szám
              </label>
              <input
                type="text"
                value={formData.property_number}
                onChange={(e) => setFormData({ ...formData, property_number: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                placeholder="A1, B2, stb."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Státusz
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              >
                <option value="available">Elérhető</option>
                <option value="reserved">Foglalt</option>
                <option value="sold">Eladva</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cím
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              placeholder="Például: Budapest, XIII. kerület, Váci út 100."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Leírás
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              placeholder="Részletes leírás az ingatlanról..."
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ár (Ft)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Terület (m²)
              </label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Szobák
              </label>
              <input
                type="number"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Emelet
              </label>
              <input
                type="number"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tájolás
              </label>
              <select
                value={formData.orientation}
                onChange={(e) => setFormData({ ...formData, orientation: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
              >
                <option value="">Válassz tájolást</option>
                <option value="Észak">Észak</option>
                <option value="Észak-Kelet">Észak-Kelet</option>
                <option value="Kelet">Kelet</option>
                <option value="Dél-Kelet">Dél-Kelet</option>
                <option value="Dél">Dél</option>
                <option value="Dél-Nyugat">Dél-Nyugat</option>
                <option value="Nyugat">Nyugat</option>
                <option value="Észak-Nyugat">Észak-Nyugat</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.balcony}
                  onChange={(e) => setFormData({ ...formData, balcony: e.target.checked })}
                  className="w-5 h-5 text-slate-900 border-slate-300 rounded focus:ring-slate-900"
                />
                <span className="text-sm font-medium text-slate-700">Erkély van</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Képek
            </label>
            <div className="space-y-4">
              <div className="flex gap-2">
                <label className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-slate-400 transition">
                  <Upload className="w-5 h-5 mr-2 text-slate-600" />
                  <span className="text-sm text-slate-600">
                    {uploadingImage ? 'Feltöltés...' : 'Kép feltöltése'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
                <button
                  type="button"
                  onClick={handleImageUrlAdd}
                  className="px-4 py-3 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition"
                >
                  URL hozzáadása
                </button>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {images.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Alaprajz
            </label>
            <div className="space-y-4">
              <div className="flex gap-2">
                <label className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-slate-400 transition">
                  <ImageIcon className="w-5 h-5 mr-2 text-slate-600" />
                  <span className="text-sm text-slate-600">
                    {uploadingImage ? 'Feltöltés...' : 'Alaprajz feltöltése'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
                <button
                  type="button"
                  onClick={handleFloorPlanUrlAdd}
                  className="px-4 py-3 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition"
                >
                  URL hozzáadása
                </button>
              </div>

              {floorPlan && (
                <div className="relative group">
                  <img
                    src={floorPlan}
                    alt="Floor plan"
                    className="w-full h-48 object-contain bg-slate-50 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFloorPlan('')}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition"
            >
              Mégse
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mentés...' : 'Mentés'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
