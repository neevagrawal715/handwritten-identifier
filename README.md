# Handwritten Number Identifier

A web application that uses Google's Gemini AI to identify handwritten digits from images. Upload an image containing a handwritten digit (0-9) and watch the AI recognize it instantly.

## ✨ Features

- 🖼️ **Easy Upload**: Drag-and-drop or click to upload images
- 🤖 **AI Recognition**: Google Gemini 1.5 Flash vision API
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **Fast**: Real-time processing, 1-3 seconds per image
- 🎨 **Modern UI**: Beautiful gradient design

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v16+
- npm or yarn

### 2. Setup (3 minutes)

```bash
# Install dependencies
npm install

# Get API key from https://ai.google.dev/

# Create .env.local
echo "VITE_GEMINI_API_KEY=your_key_here" > .env.local

# Start dev server
npx vite
```

Open http://localhost:5173/ in your browser.

### 3. Use It

1. Upload an image with a handwritten digit
2. Click "Identify Number"
3. View the recognized digit

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup & deployment guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Firebase, Netlify, Vercel deployment
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Technical overview

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **AI**: Google Gemini 1.5 Flash
- **Hosting**: Firebase (optional)
- **Styling**: CSS3 with gradients

## 📦 Build & Deploy

```bash
# Build production bundle
npm run build

# Deploy to Firebase
firebase deploy

# Or use Netlify/Vercel (see DEPLOYMENT.md)
```

## 🔑 Environment Variables

Create `.env.local`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional Firebase config:
VITE_FIREBASE_API_KEY=your_value
VITE_FIREBASE_PROJECT_ID=your_value
# ... other Firebase vars
```

Get free Gemini API key: https://ai.google.dev/

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "API key not configured" | Add `VITE_GEMINI_API_KEY` to `.env.local` and restart |
| Cannot identify digit | Use a clearer, well-lit image |
| Port 5173 in use | Run `npx vite --port 3000` |

## 📊 Performance

- Bundle: ~68KB (gzipped)
- Load time: <100ms (production)
- API response: 1-3 seconds per image

## 🔒 Security

- API key stored locally only (.env.local)
- No server-side image storage
- Client-side processing
- 10MB file size limit

## 🚀 Deploy Now

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Netlify
- Connect GitHub repo
- Set build: `npm run build`
- Publish dir: `dist`
- Add env var: `VITE_GEMINI_API_KEY`

### Vercel
- Import GitHub repo
- Add env var: `VITE_GEMINI_API_KEY`
- Auto-deploys on push

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📞 Resources

- [Gemini API Docs](https://ai.google.dev/docs)
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

## 📄 License

Open source for educational and personal use.

---

**Ready to use?** Follow [SETUP.md](./SETUP.md) to get started!


