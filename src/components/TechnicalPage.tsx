import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const sections = [
  {
    title: 'Szerkezetek',
    content: [
      'Vasbeton vázas szerkezet, monolit födémmel',
      'EPS homlokzati hőszigetelés, vastagság 15 cm',
      'Hőhídmentes kivitelezés',
      'Ásványi vakolat homlokzati burkolat',
      'Lábazati XPS hőszigetelés, 12 cm vastagság',
    ],
  },
  {
    title: 'Gépészet - Fűtés és HMV',
    content: [
      'Padlófűtés minden lakásban, szobánkénti termosztát szabályozással',
      'Kondenzációs kazán egyedi mérőórával',
      'Központi HMV (használati meleg víz) ellátás',
      'Energiatakarékos rendszer, alacsony üzemeltetési költségekkel',
      'Fűtési szezonban egyenletes hőmérséklet-eloszlás',
    ],
  },
  {
    title: 'Villamos hálózat',
    content: [
      'Korszerű villamos hálózat, egyedi almérővel',
      'LED világítás a közös helyiségekben',
      'Kábel TV és internet előkészítés minden szobában',
      'Videó kaputelefon rendszer',
      'Biztonsági világítás a lépcsőházakban',
    ],
  },
  {
    title: 'Nyílászárók',
    content: [
      '3 rétegű hőszigetelő üvegezés',
      'Műanyag nyílászárók, 7 kamrás profilrendszer',
      'Külső redőny elektromos működtetéssel',
      'Kilincs nélküli bejárati ajtó, biztonsági zárral',
      'Erkélyajtók kilinccsel és zárral',
    ],
  },
  {
    title: 'Burkolatok és felületek',
    content: [
      'Nappali és hálószobák: laminált parketta (tölgy színben)',
      'Fürdőszoba és WC: csúszásmentes kerámia burkolat',
      'Konyha: kerámia padlóburkolat, falburkolat a konyhapult felett',
      'Belső falak: festett, fehér színben',
      'Előszoba: járólapburkolat',
    ],
  },
  {
    title: 'Szaniter és fürdőszoba',
    content: [
      'Prémium minőségű szaniterek (WC, mosdó, zuhanytálca)',
      'Zuhanykabinok edzett üveg ajtóval',
      'Termosztátos csaptelepek',
      'LED tükör világítással',
      'Törölközőszárító radiátor',
    ],
  },
  {
    title: 'Konyha',
    content: [
      'Komplett konyhabútor ajándékba minden lakáshoz',
      'Modern design, fehér magasfényű frontokkal',
      'Gránit munkalap',
      'Beépíthető készülékek (sütő, főzőlap, páraelszívó)',
      'Mosogató csapteleppel',
    ],
  },
  {
    title: 'Közös helyiségek',
    content: [
      'Lift minden épületben',
      'Kamerás megfigyelő rendszer',
      'Központi postaládák',
      'Kerékpártároló',
      'Babakocsi tároló',
      'Zöld udvar, parkosított környezet',
    ],
  },
];

export default function TechnicalPage() {
  const [open, setOpen] = useState<number[]>([0]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-[120px] pb-16">
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Műszaki leírás</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {sections.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md mb-4">
              <button onClick={() => setOpen(open.includes(i) ? open.filter(x => x !== i) : [...open, i])} className="w-full flex justify-between p-6">
                <h3 className="text-xl font-bold">{s.title}</h3>
                {open.includes(i) ? <ChevronUp /> : <ChevronDown />}
              </button>
              {open.includes(i) && (
                <div className="px-6 pb-6 border-t">
                  <ul className="space-y-2 pt-4">
                    {s.content.map((c, j) => (
                      <li key={j} className="flex gap-2"><div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div><span>{c}</span></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
