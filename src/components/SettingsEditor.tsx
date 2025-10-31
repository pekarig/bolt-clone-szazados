import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Settings, Save, Upload, Plus, Trash2 } from 'lucide-react';

interface Setting {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'image' | 'json' | 'html';
  category: string;
  description: string;
}

export default function SettingsEditor() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('homepage');

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('category, key');

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(setting: Setting, newValue: string) {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: newValue, updated_at: new Date().toISOString() })
        .eq('id', setting.id);

      if (error) throw error;

      setSettings(settings.map(s => s.id === setting.id ? { ...s, value: newValue } : s));
      alert('Beállítás mentve!');
    } catch (error) {
      console.error('Error saving setting:', error);
      alert('Hiba a mentés során');
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload(setting: Setting, file: File) {
    setSaving(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `settings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      await handleSave(setting, publicUrl);
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Hiba a feltöltés során: ' + error.message);
    } finally {
      setSaving(false);
    }
  }

  function handleArrayAdd(setting: Setting) {
    const url = prompt('Add meg az új kép URL-jét:');
    if (!url) return;

    try {
      const currentArray = JSON.parse(setting.value || '[]');
      const newArray = [...currentArray, url.trim()];
      handleSave(setting, JSON.stringify(newArray));
    } catch (error) {
      alert('Hiba az URL hozzáadásakor');
    }
  }

  function handleArrayRemove(setting: Setting, index: number) {
    try {
      const currentArray = JSON.parse(setting.value || '[]');
      const newArray = currentArray.filter((_: any, i: number) => i !== index);
      handleSave(setting, JSON.stringify(newArray));
    } catch (error) {
      alert('Hiba az elem törlésekor');
    }
  }

  const categories = [
    { id: 'homepage', label: 'Főoldal' },
    { id: 'technical', label: 'Műszaki adatok' },
    { id: 'gallery', label: 'Galéria' },
    { id: 'general', label: 'Általános' },
  ];

  const filteredSettings = settings.filter(s => s.category === activeCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Settings className="w-6 h-6 text-slate-900" />
        <h2 className="text-2xl font-bold text-slate-900">Oldal beállítások</h2>
      </div>

      <div className="flex space-x-2 border-b border-slate-200">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 font-medium transition ${
              activeCategory === cat.id
                ? 'border-b-2 border-slate-900 text-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredSettings.map(setting => (
          <div key={setting.id} className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="mb-4">
              <h3 className="font-semibold text-slate-900">{setting.description}</h3>
              <p className="text-sm text-slate-500 mt-1">{setting.key}</p>
            </div>

            {setting.type === 'text' && (
              <div>
                <input
                  type="text"
                  defaultValue={setting.value}
                  onBlur={(e) => {
                    if (e.target.value !== setting.value) {
                      handleSave(setting, e.target.value);
                    }
                  }}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                />
              </div>
            )}

            {setting.type === 'html' && (
              <div>
                <textarea
                  defaultValue={setting.value}
                  onBlur={(e) => {
                    if (e.target.value !== setting.value) {
                      handleSave(setting, e.target.value);
                    }
                  }}
                  rows={8}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none font-mono text-sm"
                />
              </div>
            )}

            {setting.type === 'image' && (
              <div className="space-y-4">
                {setting.value && (
                  <img src={setting.value} alt="Preview" className="h-32 object-cover rounded-lg" />
                )}
                <div className="flex gap-2">
                  <label className="flex-1 flex items-center justify-center px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-slate-400 transition">
                    <Upload className="w-5 h-5 mr-2 text-slate-600" />
                    <span className="text-sm text-slate-600">Új kép feltöltése</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(setting, file);
                      }}
                      className="hidden"
                      disabled={saving}
                    />
                  </label>
                  <button
                    onClick={() => {
                      const url = prompt('Vagy add meg a kép URL-jét:', setting.value);
                      if (url && url !== setting.value) {
                        handleSave(setting, url);
                      }
                    }}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition"
                  >
                    URL megadása
                  </button>
                </div>
              </div>
            )}

            {setting.type === 'json' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {JSON.parse(setting.value || '[]').map((url: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleArrayRemove(setting, index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleArrayAdd(setting)}
                  className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition"
                >
                  <Plus className="w-5 h-5" />
                  <span>Új kép hozzáadása</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
