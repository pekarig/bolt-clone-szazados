import { supabase } from '../lib/supabase';

const orientations = ['É', 'D', 'K', 'Ny', 'ÉK', 'ÉNy', 'DK', 'DNy'];
const buildings = ['A', 'B', 'C'];
const sizeCategories: Array<'S' | 'M' | 'L' | 'XL'> = ['S', 'M', 'L', 'XL'];
const statuses: Array<'available' | 'reserved' | 'sold'> = ['available', 'reserved', 'sold'];

const floorPlanUrls = [
  'https://images.pexels.com/photos/6045245/pexels-photo-6045245.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7174407/pexels-photo-7174407.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6045247/pexels-photo-6045247.jpeg?auto=compress&cs=tinysrgb&w=600',
];

function generateProperties() {
  const properties = [];

  for (let i = 1; i <= 25; i++) {
    const building = buildings[Math.floor(Math.random() * buildings.length)];
    const floor = Math.floor(Math.random() * 8) + 1;
    const apartment = Math.floor(Math.random() * 8) + 1;

    const sizeCategory = sizeCategories[Math.floor(Math.random() * sizeCategories.length)];
    let rooms, area, price;

    switch (sizeCategory) {
      case 'S':
        rooms = Math.random() > 0.5 ? 1 : 2;
        area = 35 + Math.random() * 10;
        price = 30000000 + Math.random() * 10000000;
        break;
      case 'M':
        rooms = 2;
        area = 50 + Math.random() * 15;
        price = 40000000 + Math.random() * 15000000;
        break;
      case 'L':
        rooms = 3;
        area = 70 + Math.random() * 15;
        price = 55000000 + Math.random() * 20000000;
        break;
      case 'XL':
        rooms = Math.random() > 0.5 ? 3 : 4;
        area = 90 + Math.random() * 30;
        price = 70000000 + Math.random() * 30000000;
        break;
    }

    const balcony = Math.random() * 10 + 4;
    const orientation = orientations[Math.floor(Math.random() * orientations.length)];
    const status = i <= 15 ? 'available' : statuses[Math.floor(Math.random() * statuses.length)];

    properties.push({
      property_number: `${building}-${floor}0${apartment}`,
      floor,
      rooms,
      area: parseFloat(area.toFixed(2)),
      balcony: parseFloat(balcony.toFixed(2)),
      orientation,
      price: parseFloat(price.toFixed(2)),
      status,
      description: `Modern, ${rooms} szobás lakás a ${building} épület ${floor}. emeletén. Tökéletes választás azok számára, akik minőségi otthont keresnek. ${sizeCategory === 'XL' ? 'Prémium kategória, különleges alaprajz.' : ''} ${orientation} tájolású, világos, tágas terek jellemzik.`,
      floor_plan_url: floorPlanUrls[Math.floor(Math.random() * floorPlanUrls.length)],
      size_category: sizeCategory,
    });
  }

  return properties;
}

function generateGalleryImages() {
  const images = [
    {
      title: 'Modern homlokzat látványterv',
      category: 'render',
      image_url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 1,
    },
    {
      title: 'Belsőépítészeti terv - nappali',
      category: 'render',
      image_url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 2,
    },
    {
      title: 'Modern konyha látványterv',
      category: 'render',
      image_url: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 3,
    },
    {
      title: 'Fürdőszoba terv',
      category: 'render',
      image_url: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 4,
    },
    {
      title: 'Kész lakás fotó',
      category: 'photo',
      image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 5,
    },
    {
      title: 'Nappali részlet',
      category: 'photo',
      image_url: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 6,
    },
    {
      title: 'Épület külső fotó',
      category: 'photo',
      image_url: 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 7,
    },
    {
      title: 'Építkezés - alapozás',
      category: 'construction',
      image_url: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 8,
    },
    {
      title: 'Építkezés - szerkezet',
      category: 'construction',
      image_url: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 9,
    },
    {
      title: 'Építkezés - homlokzat',
      category: 'construction',
      image_url: 'https://images.pexels.com/photos/162557/scaffolding-building-site-construction-work-162557.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/162557/scaffolding-building-site-construction-work-162557.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 10,
    },
    {
      title: 'Hálószoba látványterv',
      category: 'render',
      image_url: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 11,
    },
    {
      title: 'Erkély terv',
      category: 'render',
      image_url: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1920',
      thumbnail_url: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=600',
      display_order: 12,
    },
  ];

  return images;
}

export async function seedDatabase() {
  try {
    console.log('Tesztadatok generálása...');

    const { data: existingProperties } = await supabase
      .from('properties')
      .select('id')
      .limit(1);

    if (existingProperties && existingProperties.length > 0) {
      console.log('Tesztadatok már léteznek!');
      return;
    }

    const properties = generateProperties();
    const { error: propertiesError } = await supabase
      .from('properties')
      .insert(properties);

    if (propertiesError) {
      console.error('Hiba a lakások beszúrása során:', propertiesError);
      return;
    }

    console.log(`${properties.length} lakás sikeresen létrehozva!`);

    const images = generateGalleryImages();
    const { error: imagesError } = await supabase
      .from('gallery_images')
      .insert(images);

    if (imagesError) {
      console.error('Hiba a galéria képek beszúrása során:', imagesError);
      return;
    }

    console.log(`${images.length} galéria kép sikeresen létrehozva!`);
    console.log('Tesztadatok generálása kész!');
  } catch (error) {
    console.error('Hiba:', error);
  }
}
