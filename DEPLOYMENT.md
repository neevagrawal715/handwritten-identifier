# Deployment Guide

## Quick Setup

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Select "Create new API key"
5. Copy your API key

### Step 2: Update Environment Variables

Edit `.env.local` in the project root:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### Step 3: Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173` and test with a handwritten digit image.

---

## Deployment Options

### Option A: Firebase Hosting (Recommended)

#### Prerequisites:
- Firebase CLI installed (`npm install -g firebase-tools`)
- Google Cloud account with Firebase enabled

#### Steps:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Create a Firebase project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Enter project name: `handwritten-identifier`
   - Enable Google Analytics (optional)
   - Create project

4. **Initialize Firebase in your project:**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to: `dist`
   - Configure single-page app: Yes (rewrite all URLs to index.html)

5. **Deploy:**
   ```bash
   firebase deploy
   ```

6. **Your app is now live!** The URL will be shown in the output.

---

### Option B: Netlify

#### Steps:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Sign up with GitHub
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Add environment variables:**
   - In Netlify dashboard, go to Site settings > Build & deploy > Environment
   - Add `VITE_GEMINI_API_KEY` with your API key value

4. **Deploy:**
   - Push to GitHub, Netlify will auto-deploy

---

### Option C: Vercel

#### Steps:

1. **Push code to GitHub**

2. **Go to [Vercel](https://vercel.com)**
   - Sign up with GitHub
   - Click "Import Project"
   - Select your repository

3. **Configure:**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Add Environment Variables:**
   - Add `VITE_GEMINI_API_KEY` in project settings

5. **Deploy**

---

## Setting Environment Variables

### Firebase Hosting:

Environment variables won't be exposed on the client side by default. For client-side env vars, use `.env.local`:

```bash
VITE_GEMINI_API_KEY=your_key_here
```

Then rebuild and redeploy.

### Netlify/Vercel:

Set through dashboard:
1. Go to Site Settings > Environment
2. Add new variable: `VITE_GEMINI_API_KEY`
3. Value: Your actual API key
4. Redeploy

---

## Security Best Practices

⚠️ **Important:** Exposing your Gemini API key in the frontend is acceptable for free tier with request limits, but for production:

1. **Restrict API key** in Google Cloud Console to only Generative AI API
2. **Set request rate limits**
3. **Monitor usage** regularly
4. **Consider a backend** for sensitive operations

---

## Monitoring and Debugging

### View Logs:

**Firebase:**
```bash
firebase functions:log
```

**Netlify/Vercel:**
- Check deployment logs in dashboard

### Test Deployment:

1. Visit your live URL
2. Upload a test image
3. Click "Identify Number"
4. Verify it works

### Check API Usage:

Go to [Google Cloud Console](https://console.cloud.google.com/) and check API usage metrics.

---

## Troubleshooting

### "Cannot identify number"
- Image quality issue - try with a clearer image
- API issue - check if quota is reached

### "API key not configured"
- Rebuild the project: `npm run build`
- Check `.env.local` has the correct key
- Restart the server

### Build Fails
- Delete `node_modules`: `rm -rf node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run build`

### Deployment Fails
- Check build succeeds locally: `npm run build`
- Verify all environment variables are set
- Check Firebase project settings

---

## Post-Deployment Checklist

- [ ] App loads successfully
- [ ] Image upload works
- [ ] Gemini API integration works
- [ ] Results display correctly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] API key not exposed in code

---

## Getting Help

- Google Gemini API: https://ai.google.dev/docs
- Firebase Hosting: https://firebase.google.com/docs/hosting
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
