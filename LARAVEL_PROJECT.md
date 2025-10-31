# Laravel Ingatlan Projekt - Teljes Kód Útmutató
## XAMPP / Osztott Tárhelyen / Bármilyen Hosting

Ez a dokumentum a teljes Laravel projekt szerkezetét tartalmazza, amit átmásolhatsz a saját Laravel projektedbe.

---

## 🚀 Gyors Telepítés

### 1️⃣ Laravel Projekt Létrehozása

**A. XAMPP-on (Localhost):**

```bash
# Nyisd meg a parancssort (cmd)
cd C:\xampp\htdocs

# Laravel projekt létrehozása
composer create-project laravel/laravel ingatlan-projekt

# Belépés a projektbe
cd ingatlan-projekt
```

**B. Osztott Tárhelyen:**

1. **Hozz létre egy Laravel projektet lokálisan** (fenti lépések szerint)
2. **Tömörítsd be a projektet** (zip fájl)
3. **Töltsd fel FTP-n keresztül** a hosting `public_html` mappájába
4. **Csomagold ki** a hosting cPanel fájlkezelőjében

---

### 2️⃣ Supabase PostgreSQL Kapcsolat

**Másold be a `.env` fájlba:**

```env
APP_NAME="Ingatlan Projekt"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://localhost  # VAGY https://te-domain.hu

# Supabase PostgreSQL kapcsolat
DB_CONNECTION=pgsql
DB_HOST=aws-0-eu-central-1.pooler.supabase.com
DB_PORT=6543
DB_DATABASE=postgres
DB_USERNAME=postgres.mfubchqhyvimaqjvwztu
DB_PASSWORD=[YOUR_SUPABASE_PASSWORD]
DB_SSLMODE=require
```

**VAGY helyi MySQL használata:**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ingatlan_db
DB_USERNAME=root
DB_PASSWORD=
```

---

### 3️⃣ Telepítendő Csomagok

```bash
composer require doctrine/dbal
```

---

### 4️⃣ Alkalmazás Kulcs Generálása

```bash
php artisan key:generate
```

---

### 5️⃣ XAMPP Konfiguráció

**Opció A: Egyszerű Verzió (Alap URL)**

```
http://localhost/ingatlan-projekt/public
```

**Opció B: Virtual Host (Ajánlott - Szebb URL)**

**1. Apache Virtual Host beállítása:**

Nyisd meg: `C:\xampp\apache\conf\extra\httpd-vhosts.conf`

Másold be az alábbit:

```apache
<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs/ingatlan-projekt/public"
    ServerName ingatlan.local

    <Directory "C:/xampp/htdocs/ingatlan-projekt/public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

**2. Hosts fájl módosítása:**

Nyisd meg: `C:\Windows\System32\drivers\etc\hosts` (rendszergazdaként)

Másold be:

```
127.0.0.1  ingatlan.local
```

**3. Apache újraindítása** XAMPP Control Panel-ben

**4. Nyisd meg:**

```
http://ingatlan.local
```

---

### 6️⃣ Osztott Tárhelyen (Hosting)

**A. Webroot beállítása (cPanel):**

1. Lépj be a cPanel-be
2. Menj a **"Domains"** vagy **"Addon Domains"** menübe
3. Állítsd be a Document Root-ot: `public_html/ingatlan-projekt/public`

**B. .htaccess fájl (ha szükséges):**

Ha a domain root-ja nem a `public` mappára mutat, hozz létre egy `.htaccess` fájlt a projekt gyökérkönyvtárában:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

**C. Jogosultságok beállítása (SSH-n keresztül):**

```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

**D. Composer csomagok telepítése (SSH-n keresztül):**

```bash
cd public_html/ingatlan-projekt
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

### 7️⃣ Szerver Indítása

**XAMPP:**
```bash
# Egyszerű verzió
php artisan serve
# Nyisd meg: http://localhost:8000

# VAGY használd az Apache-t
# Nyisd meg: http://localhost/ingatlan-projekt/public
# VAGY: http://ingatlan.local
```

**Hosting:**
```
https://te-domain.hu
```

---

## ⚙️ Adatbázis Beállítás

### Opció A: Supabase PostgreSQL (AJÁNLOTT!)

**Előnyök:**
- ✅ Már van adatod benne a React projektből
- ✅ Ingyenes
- ✅ Működik bárhol (localhost, hosting)
- ✅ Nem kell migráció

**Használat:**
- Csak állítsd be a `.env` fájlt (lásd fentebb)
- A táblák már léteznek a Supabase-ben

### Opció B: MySQL (XAMPP / Hosting)

**Ha mégis MySQL-t akarsz használni:**

1. **Hozz létre adatbázist phpMyAdmin-ban:**
   - Nyisd meg: `http://localhost/phpmyadmin`
   - Kattints "New" → Adatbázis név: `ingatlan_db`

2. **Állítsd be a `.env` fájlt:**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=ingatlan_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

3. **Futtasd a migrációkat:**
   ```bash
   php artisan migrate
   ```

---

## 🔧 Gyakori Problémák

### Problem: "Class not found"
```bash
composer dump-autoload
```

### Problem: "Storage permission denied"
```bash
chmod -R 775 storage bootstrap/cache
```

### Problem: "500 Internal Server Error"
```bash
# Nézd meg a logokat
tail -f storage/logs/laravel.log
```

### Problem: "APP_KEY is missing"
```bash
php artisan key:generate
```

### Problem: "SQLSTATE[08006] connection failed"
- Ellenőrizd a `.env` fájlban a Supabase kapcsolati adatokat
- Ellenőrizd, hogy a Supabase projekt fut-e

---

## 📁 Fájl Struktúra Ellenőrzés

**XAMPP:**
```
C:\xampp\htdocs\ingatlan-projekt\
├── app\
├── bootstrap\
├── config\
├── database\
├── public\              ← Ez a webroot
├── resources\
├── routes\
├── storage\
├── .env                 ✓ FONTOS!
└── composer.json
```

**Hosting:**
```
public_html/
└── ingatlan-projekt/
    ├── app/
    ├── public/          ← Ez legyen a Document Root
    ├── .env             ✓ FONTOS!
    └── ...
```

---

## 2. Database Migráció Fájlok

### 2.1 Properties Tábla
**Fájl:** `database/migrations/2024_01_01_000001_create_properties_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // A tábla már létezik a Supabase-ben, ezt csak referenciaként használjuk
        // Ha új Laravel projektben dolgozol, akkor futtasd ezt a migrációt
        Schema::create('properties', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->string('property_number')->unique();
            $table->integer('floor');
            $table->integer('rooms');
            $table->decimal('area', 10, 2);
            $table->decimal('balcony', 10, 2)->default(0)->nullable();
            $table->string('orientation');
            $table->decimal('price', 15, 2);
            $table->string('status')->default('available');
            $table->text('description')->nullable()->default('');
            $table->text('floor_plan_url')->nullable()->default('');
            $table->string('size_category', 10)->nullable()->default('M');
            $table->timestampTz('created_at')->default(DB::raw('now()'));
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
```

### 2.2 Gallery Images Tábla
**Fájl:** `database/migrations/2024_01_01_000002_create_gallery_images_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery_images', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->string('title');
            $table->string('category');
            $table->text('image_url');
            $table->text('thumbnail_url');
            $table->integer('display_order')->default(0)->nullable();
            $table->timestampTz('created_at')->default(DB::raw('now()'));
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery_images');
    }
};
```

### 2.3 Contact Inquiries Tábla
**Fájl:** `database/migrations/2024_01_01_000003_create_contact_inquiries_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_inquiries', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->uuid('property_id')->nullable();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable()->default('');
            $table->text('message');
            $table->timestampTz('created_at')->default(DB::raw('now()'));

            $table->foreign('property_id')->references('id')->on('properties')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_inquiries');
    }
};
```

## 3. Models (app/Models/)

### 3.1 Property Model
**Fájl:** `app/Models/Property.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasUuids;

    protected $table = 'properties';
    public $timestamps = false;

    protected $fillable = [
        'property_number',
        'floor',
        'rooms',
        'area',
        'balcony',
        'orientation',
        'price',
        'status',
        'description',
        'floor_plan_url',
        'size_category',
    ];

    protected $casts = [
        'floor' => 'integer',
        'rooms' => 'integer',
        'area' => 'decimal:2',
        'balcony' => 'decimal:2',
        'price' => 'decimal:2',
        'created_at' => 'datetime',
    ];

    public function contactInquiries()
    {
        return $this->hasMany(ContactInquiry::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeFilterByPrice($query, $minPrice, $maxPrice)
    {
        return $query->whereBetween('price', [$minPrice, $maxPrice]);
    }

    public function scopeFilterByArea($query, $minArea, $maxArea)
    {
        return $query->whereBetween('area', [$minArea, $maxArea]);
    }

    public function scopeFilterByRooms($query, $rooms)
    {
        if ($rooms > 0) {
            return $query->where('rooms', $rooms);
        }
        return $query;
    }

    public function getFormattedPriceAttribute()
    {
        return number_format($this->price, 0, ',', ' ') . ' Ft';
    }

    public function getFormattedAreaAttribute()
    {
        return number_format($this->area, 0, ',', ' ') . ' m²';
    }
}
```

### 3.2 GalleryImage Model
**Fájl:** `app/Models/GalleryImage.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    use HasUuids;

    protected $table = 'gallery_images';
    public $timestamps = false;

    protected $fillable = [
        'title',
        'category',
        'image_url',
        'thumbnail_url',
        'display_order',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'created_at' => 'datetime',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order');
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
```

### 3.3 ContactInquiry Model
**Fájl:** `app/Models/ContactInquiry.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ContactInquiry extends Model
{
    use HasUuids;

    protected $table = 'contact_inquiries';
    public $timestamps = false;

    protected $fillable = [
        'property_id',
        'name',
        'email',
        'phone',
        'message',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
```

## 4. Controllers (app/Http/Controllers/)

### 4.1 PropertyController
**Fájl:** `app/Http/Controllers/PropertyController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::available();

        // Szűrés
        if ($request->has('min_price') && $request->has('max_price')) {
            $query->filterByPrice($request->min_price, $request->max_price);
        }

        if ($request->has('min_area') && $request->has('max_area')) {
            $query->filterByArea($request->min_area, $request->max_area);
        }

        if ($request->has('rooms')) {
            $query->filterByRooms($request->rooms);
        }

        $properties = $query->orderBy('property_number')->get();

        return view('properties.index', compact('properties'));
    }

    public function show($id)
    {
        $property = Property::findOrFail($id);
        return view('properties.show', compact('property'));
    }

    public function flatList()
    {
        $properties = Property::available()
            ->orderBy('property_number')
            ->get();

        return view('properties.flat-list', compact('properties'));
    }
}
```

### 4.2 GalleryController
**Fájl:** `app/Http/Controllers/GalleryController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = GalleryImage::ordered();

        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        $images = $query->get();
        $categories = GalleryImage::distinct()->pluck('category');

        return view('gallery.index', compact('images', 'categories'));
    }
}
```

### 4.3 ContactController
**Fájl:** `app/Http/Controllers/ContactController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\ContactInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string',
            'property_id' => 'nullable|uuid|exists:properties,id',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        ContactInquiry::create($request->all());

        return redirect()->back()->with('success', 'Üzenetét sikeresen elküldtük!');
    }

    public function quote()
    {
        return view('contact.quote');
    }
}
```

### 4.4 HomeController
**Fájl:** `app/Http/Controllers/HomeController.php`

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function technical()
    {
        return view('technical');
    }
}
```

## 5. Routes (routes/web.php)

**Fájl:** `routes/web.php`

```php
<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

// Főoldal
Route::get('/', [HomeController::class, 'index'])->name('home');

// Lakások
Route::get('/flat-list', [PropertyController::class, 'flatList'])->name('flat-list');
Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');
Route::get('/properties/{id}', [PropertyController::class, 'show'])->name('properties.show');

// Galéria
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');

// Kapcsolat / Ajánlatkérés
Route::get('/quote', [ContactController::class, 'quote'])->name('quote');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Műszaki információk
Route::get('/technical', [HomeController::class, 'technical'])->name('technical');
```

## 6. Blade Views (resources/views/)

### 6.1 Layout Fájl
**Fájl:** `resources/views/layouts/app.blade.php`

```blade
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Ingatlan Projekt')</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .slider-container {
            position: relative;
            height: 600px;
            overflow: hidden;
        }
        .slider-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }
        .slider-image.active {
            opacity: 1;
        }
    </style>
</head>
<body class="bg-gray-50">
    @include('partials.header')

    <main>
        @yield('content')
    </main>

    @include('partials.footer')

    @yield('scripts')
</body>
</html>
```

### 6.2 Header Partial
**Fájl:** `resources/views/partials/header.blade.php`

```blade
<header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
    <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between h-20">
            <a href="{{ route('home') }}" class="flex items-center gap-3 group">
                <div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                <span class="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent">
                    ModernHome
                </span>
            </a>

            <ul class="hidden md:flex items-center gap-8">
                <li><a href="{{ route('home') }}" class="text-gray-700 hover:text-cyan-600 font-medium transition">Főoldal</a></li>
                <li><a href="{{ route('flat-list') }}" class="text-gray-700 hover:text-cyan-600 font-medium transition">Lakások</a></li>
                <li><a href="{{ route('gallery') }}" class="text-gray-700 hover:text-cyan-600 font-medium transition">Galéria</a></li>
                <li><a href="{{ route('technical') }}" class="text-gray-700 hover:text-cyan-600 font-medium transition">Műszaki</a></li>
                <li>
                    <a href="{{ route('quote') }}" class="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition">
                        Ajánlatkérés
                    </a>
                </li>
            </ul>

            <button class="md:hidden p-2" id="mobile-menu-btn">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </nav>

        <div id="mobile-menu" class="hidden md:hidden pb-4">
            <ul class="flex flex-col gap-4">
                <li><a href="{{ route('home') }}" class="block text-gray-700 hover:text-cyan-600">Főoldal</a></li>
                <li><a href="{{ route('flat-list') }}" class="block text-gray-700 hover:text-cyan-600">Lakások</a></li>
                <li><a href="{{ route('gallery') }}" class="block text-gray-700 hover:text-cyan-600">Galéria</a></li>
                <li><a href="{{ route('technical') }}" class="block text-gray-700 hover:text-cyan-600">Műszaki</a></li>
                <li><a href="{{ route('quote') }}" class="block px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold rounded-lg text-center">Ajánlatkérés</a></li>
            </ul>
        </div>
    </div>
</header>

<script>
    document.getElementById('mobile-menu-btn').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });
</script>
```

### 6.3 Footer Partial
**Fájl:** `resources/views/partials/footer.blade.php`

```blade
<footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <span class="text-xl font-bold">ModernHome</span>
                </div>
                <p class="text-gray-400 text-sm">Találd meg az álmaid otthonát a legjobb lokációkon.</p>
            </div>

            <div>
                <h3 class="font-bold mb-4">Hasznos linkek</h3>
                <ul class="space-y-2 text-gray-400 text-sm">
                    <li><a href="{{ route('home') }}" class="hover:text-white transition">Főoldal</a></li>
                    <li><a href="{{ route('flat-list') }}" class="hover:text-white transition">Lakások</a></li>
                    <li><a href="{{ route('gallery') }}" class="hover:text-white transition">Galéria</a></li>
                    <li><a href="{{ route('technical') }}" class="hover:text-white transition">Műszaki információk</a></li>
                </ul>
            </div>

            <div>
                <h3 class="font-bold mb-4">Kapcsolat</h3>
                <ul class="space-y-2 text-gray-400 text-sm">
                    <li>Email: info@modernhome.hu</li>
                    <li>Telefon: +36 1 234 5678</li>
                    <li>Cím: Budapest, Példa utca 1.</li>
                </ul>
            </div>

            <div>
                <h3 class="font-bold mb-4">Közösségi média</h3>
                <div class="flex gap-4">
                    <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition">
                        <span class="sr-only">Facebook</span>
                        <span>f</span>
                    </a>
                    <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition">
                        <span class="sr-only">Instagram</span>
                        <span>i</span>
                    </a>
                    <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition">
                        <span class="sr-only">LinkedIn</span>
                        <span>in</span>
                    </a>
                </div>
            </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 ModernHome. Minden jog fenntartva.</p>
        </div>
    </div>
</footer>
```

### 6.4 Home View
**Fájl:** `resources/views/home.blade.php`

```blade
@extends('layouts.app')

@section('title', 'Főoldal - ModernHome')

@section('content')
<div class="pt-20">
    {{-- Slider --}}
    <div class="slider-container">
        <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg" alt="Slide 1" class="slider-image active">
        <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" alt="Slide 2" class="slider-image">
        <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" alt="Slide 3" class="slider-image">

        <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 flex items-center justify-center">
            <div class="text-center text-white px-4">
                <h1 class="text-5xl md:text-6xl font-bold mb-4">Találd meg álmaid otthonát</h1>
                <p class="text-xl md:text-2xl mb-8">Prémium lakások Budapest szívében</p>
                <a href="{{ route('flat-list') }}" class="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition text-lg">
                    Lakások megtekintése
                </a>
            </div>
        </div>
    </div>

    {{-- Keresés --}}
    <div class="container mx-auto px-4 -mt-16 relative z-10">
        <div class="bg-white rounded-xl shadow-2xl p-6">
            <form action="{{ route('properties.index') }}" method="GET" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Ár minimum (Ft)</label>
                    <input type="number" name="min_price" value="0" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Ár maximum (Ft)</label>
                    <input type="number" name="max_price" value="200000000" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Szobák száma</label>
                    <select name="rooms" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                        <option value="0">Mindegy</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button type="submit" class="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition">
                        Keresés
                    </button>
                </div>
            </form>
        </div>
    </div>

    {{-- Szolgáltatások --}}
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">Miért válassz minket?</h2>
                <p class="text-gray-600 text-lg">Prémium szolgáltatások az otthonkereséshez</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Prémium Minőség</h3>
                    <p class="text-gray-600">Csak a legjobb minőségű lakások és szolgáltatások</p>
                </div>

                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Kiváló Lokáció</h3>
                    <p class="text-gray-600">Budapest legjobb területein található ingatlanok</p>
                </div>

                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">5 Év Garancia</h3>
                    <p class="text-gray-600">Teljes körű védelem minden lakásra</p>
                </div>
            </div>
        </div>
    </section>
</div>

<script>
    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider-image');

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(() => showSlide(currentSlide + 1), 5000);
</script>
@endsection
```

### 6.5 Properties Index View
**Fájl:** `resources/views/properties/index.blade.php`

```blade
@extends('layouts.app')

@section('title', 'Keresési eredmények')

@section('content')
<div class="pt-32 pb-16">
    <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Keresési eredmények</h1>

        @if($properties->count() > 0)
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                @foreach($properties as $property)
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                        <div class="h-48 bg-gradient-to-br from-cyan-500 to-pink-500"></div>
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-semibold text-cyan-600">{{ $property->property_number }}</span>
                                <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                                    {{ $property->status === 'available' ? 'Elérhető' : 'Foglalt' }}
                                </span>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $property->rooms }} szobás lakás</h3>
                            <div class="space-y-1 text-gray-600 text-sm mb-4">
                                <p>{{ $property->formatted_area }}</p>
                                <p>{{ $property->floor }}. emelet</p>
                                <p>{{ $property->orientation }} tájolás</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-2xl font-bold text-cyan-600">{{ $property->formatted_price }}</span>
                                <a href="{{ route('properties.show', $property->id) }}" class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition">
                                    Részletek
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        @else
            <div class="text-center py-12">
                <p class="text-gray-600 text-lg">Nincs a keresési feltételeknek megfelelő lakás.</p>
            </div>
        @endif
    </div>
</div>
@endsection
```

### 6.6 Property Detail View
**Fájl:** `resources/views/properties/show.blade.php`

```blade
@extends('layouts.app')

@section('title', 'Lakás részletei - ' . $property->property_number)

@section('content')
<div class="pt-32 pb-16">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <div class="h-96 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-xl"></div>
                @if($property->floor_plan_url)
                    <div class="mt-4">
                        <h3 class="text-lg font-bold mb-2">Alaprajz</h3>
                        <img src="{{ $property->floor_plan_url }}" alt="Alaprajz" class="w-full rounded-lg">
                    </div>
                @endif
            </div>

            <div>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm font-semibold text-cyan-600">{{ $property->property_number }}</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {{ $property->status === 'available' ? 'Elérhető' : 'Foglalt' }}
                    </span>
                </div>

                <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $property->rooms }} szobás lakás</h1>
                <p class="text-3xl font-bold text-cyan-600 mb-6">{{ $property->formatted_price }}</p>

                <div class="space-y-4 mb-6">
                    <div class="flex items-center gap-3">
                        <span class="font-semibold text-gray-700">Terület:</span>
                        <span class="text-gray-600">{{ $property->formatted_area }}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-semibold text-gray-700">Emelet:</span>
                        <span class="text-gray-600">{{ $property->floor }}. emelet</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-semibold text-gray-700">Szobák:</span>
                        <span class="text-gray-600">{{ $property->rooms }} szoba</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-semibold text-gray-700">Erkély:</span>
                        <span class="text-gray-600">{{ $property->balcony }} m²</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-semibold text-gray-700">Tájolás:</span>
                        <span class="text-gray-600">{{ $property->orientation }}</span>
                    </div>
                </div>

                @if($property->description)
                    <div class="mb-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-3">Leírás</h2>
                        <p class="text-gray-600">{{ $property->description }}</p>
                    </div>
                @endif

                <div class="bg-gray-50 rounded-xl p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Érdeklődöm</h3>
                    <form action="{{ route('contact.store') }}" method="POST">
                        @csrf
                        <input type="hidden" name="property_id" value="{{ $property->id }}">

                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Név *</label>
                            <input type="text" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                            <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
                            <input type="tel" name="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Üzenet *</label>
                            <textarea name="message" rows="4" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"></textarea>
                        </div>

                        <button type="submit" class="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition">
                            Üzenet küldése
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
```

## 7. Composer Telepítés és Konfiguráció

```bash
# Projekt létrehozása
composer create-project laravel/laravel ingatlan-projekt

# Belépés a projektbe
cd ingatlan-projekt

# Doctrine DBAL telepítése (UUID support)
composer require doctrine/dbal

# .env fájl beállítása (Supabase kapcsolat)
# Másold be a fenti .env tartalmát

# Alkalmazás kulcs generálása
php artisan key:generate

# Migráció futtatása (ha új adatbázissal dolgozol)
php artisan migrate

# Szerver indítása
php artisan serve
```

---

## 8. További Fejlesztési Lehetőségek

1. **Admin Panel**: Laravel Breeze vagy Filament használata admin felülethez
2. **Képfeltöltés**: Laravel Media Library vagy saját implementáció
3. **Email Értesítések**: Mail facade használata új érdeklődésekről
4. **API**: Laravel API Resources használata React frontend számára
5. **Keresés**: Laravel Scout használata teljes szöveges kereséshez
6. **Cache**: Redis cache használata teljesítmény optimalizáláshoz

---

## ✅ Telepítési Checklist

**Localhost (XAMPP):**
- [ ] XAMPP telepítve
- [ ] Composer telepítve
- [ ] Laravel projekt létrehozva `htdocs` mappában
- [ ] `.env` fájl beállítva (Supabase VAGY MySQL)
- [ ] `php artisan key:generate` lefutott
- [ ] Fájlok bemásolva a dokumentációból
- [ ] Virtual Host beállítva (opcionális)
- [ ] Szerver elindul: `php artisan serve`
- [ ] Böngészőben működik: `http://localhost:8000`

**Osztott Tárhelyen:**
- [ ] Laravel projekt létrehozva lokálisan
- [ ] Fájlok feltöltve FTP-n keresztül
- [ ] `.env` fájl beállítva
- [ ] Composer csomagok telepítve (SSH)
- [ ] Jogosultságok beállítva (`storage`, `bootstrap/cache`)
- [ ] Document Root beállítva `public` mappára
- [ ] Cache-ek generálva (`config:cache`, `route:cache`, `view:cache`)
- [ ] Böngészőben működik: `https://te-domain.hu`

---

## 📞 Támogatás

### Hasznos Parancsok

```bash
# Cache törlése
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimalizálás production-re
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

# Log megtekintése
tail -f storage/logs/laravel.log

# Adatbázis kapcsolat tesztelése
php artisan tinker
>>> DB::connection()->getPdo();
```

### Laravel Dokumentáció

- **Hivatalos dokumentáció:** https://laravel.com/docs
- **Laracasts (videós oktatók):** https://laracasts.com
- **Laravel News:** https://laravel-news.com

---

## 💡 Tippek

1. **Mindig használj `.env` fájlt** érzékeny adatok tárolására
2. **Debug mode-ot kapcsold ki** production környezetben: `APP_DEBUG=false`
3. **Cache-elj mindent** production-ben a jobb teljesítményért
4. **Használj Queue-kat** hosszú futású műveletekhez (pl. email küldés)
5. **Rate limiting** beállítása API endpoint-okhoz
6. **HTTPS használata** production környezetben mindig!

---

## Összefoglalás

Ez a dokumentum tartalmazza a teljes Laravel projekt struktúráját. A kódot átmásolhatod a saját Laravel projektedbe a megfelelő fájlokba.

**Fontos lépések összefoglalva:**

### XAMPP Localhost:
1. Laravel projekt létrehozása `C:\xampp\htdocs\` mappában
2. Composer csomagok telepítése
3. `.env` fájl beállítása (Supabase PostgreSQL ajánlott!)
4. `php artisan key:generate`
5. Fájlok bemásolása a dokumentációból
6. `php artisan serve` → `http://localhost:8000`

### Osztott Tárhelyen:
1. Laravel projekt létrehozása lokálisan
2. Fájlok feltöltése FTP-n keresztül
3. `.env` fájl beállítása
4. SSH-n keresztül: `composer install --no-dev`
5. Jogosultságok és cache-ek beállítása
6. Document Root beállítása `public` mappára
7. `https://te-domain.hu`

**Ha mindent követtél, akkor kész vagy! A Laravel projekt működni fog mind localhost-on, mind hosting-on! 🚀**
