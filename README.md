# Relax Mobile — Review Redirect Widget

A beautiful, AI-powered review collection page for your mobile repair shop.

---

## ✅ Features
- **⭐ Interactive 5-star rating** — tap to rate
- **🤖 AI-generated reviews** — Chrome Gemini Nano → Gemini API → 18 pre-written templates (automatic fallback)
- **📋 Auto-copy** — generated review is copied to clipboard with one click
- **🗺️ 5-star → Google Maps** — opens your Google Maps review page
- **🔒 1–4 stars → WhatsApp** — sends private feedback directly to you
- **📱 Fully responsive** — works perfectly on mobile

---

## ⚙️ Setup (edit `app.js`)

Open `app.js` and update the `CONFIG` object at the top:

```js
const CONFIG = {
  shopName:       'Relax Mobile',          // ← Your shop name
  ownerName:      'Tejas',                 // ← Your first name
  location:       'Your Area, City',       // ← Your locality (used in AI reviews)
  googleMapsUrl:  'https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID_HERE',
  whatsappNumber: '919999999999',          // ← WhatsApp: country code + number (no +)
  geminiApiKey:   'YOUR_GEMINI_API_KEY',   // ← Free key from https://aistudio.google.com
};
```

### How to get your Google Maps Review URL
1. Search your shop on Google Maps
2. Click **"Write a review"**
3. Copy the URL from your browser — it looks like:
   `https://search.google.com/local/writereview?placeid=ChIJXXXXXXXXXXXX`

### How to get a free Gemini API key
1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click **"Create API key"**
3. Copy the key and paste it into `CONFIG.geminiApiKey`

---

## 🚀 How to use
1. Open `index.html` directly in a browser — **no server needed**!
2. Or host on GitHub Pages / Netlify / any static host for free.

---

## 📁 Files
| File | Purpose |
|------|---------|
| `index.html` | Main page |
| `style.css` | Dark green/teal glassmorphism theme |
| `app.js` | Star rating, AI generation, routing logic |
| `reviews.js` | 18 SEO-friendly review templates (fallback) |