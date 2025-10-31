# React/Vite Projekt Telepítési Útmutató
## XAMPP / Osztott Tárhelyen

---

## 🚀 Gyors Telepítés - 3 Lépésben

### 1️⃣ Build Készítése

Nyisd meg a parancsort a projekt mappájában és futtasd:

```bash
npm run build
```

Ez létrehoz egy `dist` mappát az összes statikus fájllal.

---

### 2️⃣ XAMPP Telepítés (Localhost)

**A. Másold át a fájlokat:**

```
Forrás: dist mappa TARTALMA
Cél: C:\xampp\htdocs\ingatlan\

Fájlok:
├── index.html
├── assets/
│   ├── index-BPmjBmv0.js
│   └── index-mCWJFcZw.css
└── _redirects
```

**B. Nyisd meg a böngészőben:**

```
http://localhost/ingatlan/
```

**KÉSZ! 🎉**

---

### 3️⃣ Osztott Tárhelyen (FTP Feltöltés)

**A. Csatlakozz FTP-n keresztül:**
- FileZilla vagy más FTP kliens
- Host: ftp.te-domain.hu
- Username: FTP felhasználóneved
- Password: FTP jelszavad

**B. Töltsd fel a dist mappa tartalmát:**

```
Forrás: dist mappa TARTALMA
Cél: public_html/

Fájlok:
├── index.html
├── assets/
│   ├── index-BPmjBmv0.js
│   └── index-mCWJFcZw.css
└── _redirects
```

**C. .htaccess fájl létrehozása (ha szükséges):**

Ha az oldal nem tölt be rendesen, hozz létre egy `.htaccess` fájlt a `public_html` mappában:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**D. Nyisd meg:**

```
https://te-domain.hu
```

**KÉSZ! 🎉**

---

## ⚙️ Fontos Beállítások

### Supabase Kapcsolat

Az adatbázis kapcsolat már be van állítva a `.env` fájlban:

```env
VITE_SUPABASE_URL=https://uomdhfywqowdegcpxvzz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

Ez a konfiguráció a build során beégetődik a JavaScript fájlokba, így **bárhol működni fog** (localhost, hosting).

### Ha Módosítasz Valamit

1. **Kód módosítása után MINDIG futtasd:**
```bash
npm run build
```

2. **Másold át újra a dist mappa tartalmát** a megfelelő helyre

---

## 🔧 Gyakori Problémák

### Problem: "Blank page" vagy "404 Not Found"

**Megoldás:** Ellenőrizd, hogy az `index.html` a megfelelő helyen van-e:
- XAMPP: `C:\xampp\htdocs\ingatlan/index.html`
- Hosting: `public_html/index.html`

### Problem: "Failed to fetch" vagy adatbázis hiba

**Megoldás:**
1. Ellenőrizd, hogy a Supabase kapcsolat működik-e
2. Nézd meg a böngésző Console-ját (F12)
3. Ellenőrizd a Supabase projekt státuszát

### Problem: Router nem működik (404 a navigálásnál)

**Megoldás:** Hozz létre `.htaccess` fájlt (lásd fentebb)

### Problem: CSS nem tölt be

**Megoldás:** Ellenőrizd, hogy az `assets` mappa is fel van-e töltve

---

## 📁 Fájl Struktúra Ellenőrzés

**XAMPP (localhost/ingatlan/):**
```
C:\xampp\htdocs\ingatlan\
├── index.html              ✓
├── _redirects              ✓
└── assets\
    ├── index-BPmjBmv0.js   ✓
    └── index-mCWJFcZw.css  ✓
```

**Hosting (public_html/):**
```
public_html/
├── index.html              ✓
├── _redirects              ✓
├── .htaccess               ✓ (ha szükséges)
└── assets/
    ├── index-BPmjBmv0.js   ✓
    └── index-mCWJFcZw.css  ✓
```

---

## 🎯 Gyors Ellenőrzés

**1. Nyisd meg a böngészőt**
**2. Navigálj a megfelelő URL-re:**
   - XAMPP: `http://localhost/ingatlan/`
   - Hosting: `https://te-domain.hu`

**3. Ellenőrizd, hogy minden működik:**
   - ✓ Főoldal betölt
   - ✓ Navigáció működik
   - ✓ Lakások listája megjelenik
   - ✓ Képek látszódnak
   - ✓ Keresés működik

---

## 💡 Tippek

1. **Mindig a dist mappa TARTALMÁT** másold, ne magát a dist mappát!

2. **FileZilla használata FTP-hez:**
   - Letöltés: https://filezilla-project.org/
   - Egyszerű drag & drop feltöltés

3. **Ha módosítasz a kódon:**
   ```bash
   npm run build
   # Majd töltsd fel újra a fájlokat
   ```

4. **Cache probléma esetén:**
   - Töröld a böngésző cache-t (Ctrl + Shift + Del)
   - Vagy nyisd meg inkognitó módban (Ctrl + Shift + N)

---

## 📞 Támogatás

Ha bármi nem működik:
1. Nézd meg a böngésző Console-ját (F12 → Console)
2. Ellenőrizd a fájlok helyét
3. Nézd meg a `.htaccess` fájlt
4. Ellenőrizd a Supabase kapcsolatot

---

## ✅ Sikeres Telepítés Checklist

- [ ] `npm run build` lefutott
- [ ] dist mappa tartalma átmásolva
- [ ] index.html a megfelelő helyen van
- [ ] assets mappa átmásolva
- [ ] Böngészőben megnyitva működik
- [ ] Navigáció működik
- [ ] Adatok betöltődnek a Supabase-ből

**Ha minden pipás, akkor kész vagy! 🚀**
