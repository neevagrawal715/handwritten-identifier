# Setup Guide - Handwritten Number Identifier

This guide will walk you through setting up, running, and deploying the Handwritten Number Identifier application.

## Table of Contents
1. [Local Development](#local-development)
2. [Getting API Keys](#getting-api-keys)
3. [Configuration](#configuration)
4. [Running the App](#running-the-app)
5. [Building for Production](#building-for-production)
6. [Deployment](#deployment)

---

## Local Development

### Prerequisites
- Node.js v16 or higher
- npm or yarn package manager
- A text editor or IDE (VS Code recommended)
- A web browser

### Installation Steps

1. **Clone or navigate to the project**
   ```bash
   cd handwritten-identifier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm run build
   ```
   You should see a successful build output with file sizes.

---

## Getting API Keys

### Google Gemini API Key

1. **Visit Google AI Studio:**
   - Go to https://ai.google.dev/
   - Click "Get API Key"

2. **Create New API Key:**
   - Click "Create new API key in Google Cloud"
   - Or select an existing project
   - Click "Create API key"
   - Copy the generated key

3. **Save the key** for the configuration step below

### Firebase (Optional for Deployment)

1. **Go to Firebase Console:**
   - Visit https://console.firebase.google.com/
   - Click "Create a new project"
   - Enter project name: `handwritten-identifier`
   - Enable/disable Google Analytics (your choice)
   - Click "Create project"

2. **Enable Firebase Hosting:**
   - Go to "Hosting" in the left sidebar
   - Click "Get Started"
   - Follow the prompts

3. **Get Firebase Configuration:**
   - Go to Project Settings
   - Copy your Firebase config (for .env configuration)

---

## Configuration

### Create Environment File

1. **Create `.env.local` in the project root:**
   ```bash
   touch .env.local
   ```

2. **Add your Gemini API key:**
   ```env
   VITE_GEMINI_API_KEY=paste_your_key_here
   ```

3. **Optional: Add Firebase config**
   ```env
   VITE_FIREBASE_API_KEY=your_value
   VITE_FIREBASE_AUTH_DOMAIN=your_value
   VITE_FIREBASE_PROJECT_ID=your_value
   VITE_FIREBASE_STORAGE_BUCKET=your_value
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_value
   VITE_FIREBASE_APP_ID=your_value
   ```

⚠️ **Important:** Never commit `.env.local` to version control

---

## Running the App

### Development Mode

```bash
npx vite
```

Or if npm scripts work:
```bash
npm run dev
```

**Output:**
```
VITE v7.2.4  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Accessing the App

1. **Open your browser**
2. **Visit:** `http://localhost:5173/`
3. **You should see:**
   - Purple gradient background
   - "Handwritten Number Identifier" title
   - Upload area with drag-and-drop
   - Identify Number button

### Testing

1. **Prepare a test image:**
   - Write a digit (0-9) by hand
   - Take a photo or scan it
   - Ensure good lighting and contrast

2. **Upload and test:**
   - Click on the upload area
   - Select or drag your image
   - Click "Identify Number"
   - Verify the result is displayed

---

## Building for Production

### Create Optimized Build

```bash
npm run build
```

**Output:**
```
vite v7.2.4 building client environment for production...
✓ XX modules transformed.
dist/index.html                   0.48 kB │ gzip:  0.31 kB
dist/assets/index-XXXXX.css       X.XX kB │ gzip:  X.XX kB
dist/assets/index-XXXXX.js      XXX.XX kB │ gzip: XX.XX kB
✓ built in XXXms
```

### Preview Production Build

```bash
npm run preview
```

The production build will be available at the preview URL.

---

## Deployment

### Option 1: Firebase Hosting (Recommended)

**Best for:** Enterprise apps, good free tier, easy setup

#### Setup

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```
   - Opens browser for authentication
   - Confirm in the terminal

3. **Initialize Firebase project:**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory: `dist`
   - Configure single-page app: `Yes`
   - Don't overwrite `dist/index.html`: `No`

#### Deploy

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase:**
   ```bash
   firebase deploy
   ```

3. **Your app is live!**
   ```
   ✔  Deploy complete!

   Project Console: https://console.firebase.google.com/project/...
   Hosting URL: https://handwritten-identifier-xxx.web.app
   ```

---

### Option 2: Netlify

**Best for:** GitHub-based workflows, continuous deployment

#### Setup

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to https://netlify.com
   - Sign up with GitHub
   - Click "New site from Git"
   - Select your repository

3. **Configure Build:**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables:**
   - Site settings → Build & deploy → Environment
   - Add: `VITE_GEMINI_API_KEY` = `your_key`

#### Deploy

- Push to GitHub
- Netlify auto-deploys
- Check deploy status in dashboard

---

### Option 3: Vercel

**Best for:** Next.js apps, serverless functions, blazing fast

#### Setup

1. **Push to GitHub**

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select React as framework

3. **Add Environment Variables:**
   - Project Settings → Environment Variables
   - Add: `VITE_GEMINI_API_KEY`

#### Deploy

- Vercel auto-deploys on push
- Check deployment in dashboard

---

## Troubleshooting

### Dev Server Issues

**Problem:** Server won't start
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx vite
```

**Problem:** Port 5173 already in use
```bash
# Solution: Use different port
npx vite --port 3000
```

### API Key Issues

**Problem:** "API key not configured"
- Check `.env.local` exists
- Verify `VITE_GEMINI_API_KEY` is set
- Restart dev server

**Problem:** API limit exceeded
- Check free tier limit (15 req/min)
- Wait before next request
- Consider upgrading plan

### Image Recognition Issues

**Problem:** "Cannot identify number"
- Image too dark or blurry
- Digit not clearly visible
- Non-digit content in image
- Try with a clearer image

### Build Issues

**Problem:** Build fails
```bash
# Solution: Clean and rebuild
npm run build -- --force
```

**Problem:** Large bundle size
- Already optimized with Vite
- Check Chrome DevTools Network tab
- Consider removing unused dependencies

---

## Next Steps

1. **Customize the UI** in `src/components/NumberIdentifier.css`
2. **Add more features:**
   - Multiple digits recognition
   - Image preprocessing
   - History/localStorage
   - User authentication
3. **Monitor API usage** in Google Cloud Console
4. **Set up CI/CD pipeline** for automated deployments
5. **Add tests** for component reliability

---

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Google Generative AI](https://ai.google.dev/docs)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review official documentation
3. Check project GitHub issues
4. Contact support for your hosting platform

---

**Happy deploying! 🚀**
