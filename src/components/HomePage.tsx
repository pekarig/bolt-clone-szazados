import { useState } from 'react';
import { Home, Star, Award, Shield } from 'lucide-react';
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

      {filters ? (
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Keresési eredmények</h2>
          {loading ? (
            <div className="text-center py-12"><div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">Nincs a keresési feltételeknek megfelelő lakás.</div>
          )}
        </section>
      ) : (
        <>
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-gray-900">Találd meg az ideális értékesítési lehetőséget</h2>
                  <p className="text-gray-600 text-lg">
                    Ahogy az épületek komplexitása növekszik, az építészet területe is folyamatosan fejlődik.
                    Mi pedig itt vagyunk, hogy segítsünk megtalálni az álmaid otthonát.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Találd meg a kiváló ajánlatokat</h3>
                        <p className="text-gray-600">Széles választék a legjobb árakon</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Barátságos támogatás és gyors segítség</h3>
                        <p className="text-gray-600">Szakértő csapatunk mindig rendelkezésre áll</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Listázd saját ingatlanodat</h3>
                        <p className="text-gray-600">Egyszerű és hatékony értékesítés</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <a
                      href="/flat-list"
                      className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition"
                    >
                      Tudj meg többet
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Modern épület"
                    className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 lg:order-1">
                  <img
                    src="https://images.pexels.com/photos/6045035/pexels-photo-6045035.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Pár nézi az új lakást"
                    className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6">
                    <div className="text-sm font-semibold text-gray-600 mb-2">10k+ Exkluzív ügynökök</div>
                    <div className="flex -space-x-2">
                      <img
                        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Ügynök"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                      <img
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Ügynök"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                      <img
                        src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Ügynök"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                      <img
                        src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Ügynök"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-900 flex items-center justify-center text-white text-sm font-semibold">
                        +
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 order-1 lg:order-2">
                  <h2 className="text-4xl font-bold text-gray-900">Prémium szolgáltatások minden vásárlónak</h2>
                  <p className="text-gray-600 text-lg">
                    Tapasztalt szakértőink segítenek megtalálni az ideális otthont, amely tökéletesen illeszkedik
                    az életstílusodhoz és az igényeidhez. Több mint 10 000 ügynökünk áll rendelkezésre.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Home className="text-white" size={24} />
                      </div>
                      <h3 className="font-bold text-gray-900">Modern design</h3>
                      <p className="text-gray-600 text-sm">Korszerű, elegáns lakások</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Star className="text-white" size={24} />
                      </div>
                      <h3 className="font-bold text-gray-900">Prémium minőség</h3>
                      <p className="text-gray-600 text-sm">Csak a legjobb anyagok</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Award className="text-white" size={24} />
                      </div>
                      <h3 className="font-bold text-gray-900">Kiváló lokáció</h3>
                      <p className="text-gray-600 text-sm">Budapest szívében</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Shield className="text-white" size={24} />
                      </div>
                      <h3 className="font-bold text-gray-900">5 év garancia</h3>
                      <p className="text-gray-600 text-sm">Teljes körű védelem</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
