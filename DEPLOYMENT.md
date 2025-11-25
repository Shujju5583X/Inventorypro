# InventoryPro Deployment Guide

This guide covers deploying the InventoryPro application to Railway (backend + database) and Netlify (frontend).

## 📋 Overview

**Architecture:**
- **Railway**: Hosts the Node.js/Express backend + MySQL database
- **Netlify**: Hosts the React frontend (as static files + serverless functions)

---

## 🚂 Part 1: Deploy Backend to Railway

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/inventory-pro.git
git branch -M main
git push -u origin main
```

### Step 2: Create Railway Project
1. Go to [Railway.app](https://railway.app) and log in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `inventory-pro` repository
4. Railway will automatically detect the Node.js project

### Step 3: Add MySQL Database
1. In your Railway project dashboard, click **"New"** → **"Database"** → **"Add MySQL"**
2. Railway will automatically:
   - Create a MySQL instance
   - Generate a `DATABASE_URL` environment variable
   - Link it to your backend service

### Step 4: Add Environment Variables
1. Click on your **backend service** (not the database)
2. Go to **"Variables"** tab
3. Add this variable:
   - `JWT_SECRET` = `your_random_secret_key_here` (e.g., `mySecretKey123!@#`)

**Note:** You don't need to manually add database variables. Railway auto-configures `DATABASE_URL`.

### Step 5: Deploy & Get Backend URL
1. Railway will automatically deploy after you push to GitHub
2. Go to **"Settings"** → **"Networking"** → **"Generate Domain"**
3. **Copy this URL** (e.g., `https://inventorypro-production-abc.up.railway.app`)
   - You'll need this for the Netlify deployment!

---

## 🎯 Part 2: Deploy Frontend to Netlify

### Step 1: Update API Endpoint in Frontend

Before deploying to Netlify, you need to update your frontend to use the Railway backend URL.

**Option A: Environment Variable (Recommended)**

1. Update `client/vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

2. Create `client/.env.production`:
```env
VITE_API_URL=https://your-railway-url.up.railway.app
```

3. Update `client/src/context/AuthContext.jsx` to use the API URL:
```javascript
// At the top of the file
const API_URL = import.meta.env.PROD 
  ? 'https://your-railway-url.up.railway.app' 
  : '';

// Then update axios calls to use API_URL
const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
```

**Option B: Direct URL (Simpler for testing)**

Just replace `'/api/...'` with `'https://your-railway-url.up.railway.app/api/...'` in:
- `client/src/context/AuthContext.jsx`
- `client/src/components/Dashboard.jsx`

### Step 2: Push Frontend Changes
```bash
git add .
git commit -m "Configure frontend for Railway backend"
git push
```

### Step 3: Deploy on Netlify
1. Go to [Netlify](https://app.netlify.com/) and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and select your `inventory-pro` repository
4. **Build settings** (should auto-populate from `netlify.toml`):
   - Build command: `cd client && npm install && npm run build`
   - Publish directory: `client/dist`
   - Functions directory: `functions`

5. Click **"Deploy site"**

### Step 4: Configure Environment Variables (Netlify)
1. Go to **Site configuration** → **Environment variables**
2. Add:
   - `VITE_API_URL` = `https://your-railway-url.up.railway.app` (if using Option A)

### Step 5: Redeploy
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## ✅ Verification

### Test Railway Backend
```bash
curl https://your-railway-url.up.railway.app/api/auth/login
```
You should get a response (even if it's an error about missing credentials).

### Test Netlify Frontend
1. Open your Netlify URL (e.g., `https://inventorypro.netlify.app`)
2. Click **Register** and create an account
3. Login
4. Add an inventory item
5. Check if the dashboard updates

---

## 🔧 Troubleshooting

### Railway: Build Failed
- Check the **Deploy Logs** in Railway
- Make sure `package.json` has the correct `start` script
- Verify that the database is created and linked

### Railway: Database Connection Failed
- Check that the MySQL database is **in the same project**
- Railway should auto-inject `DATABASE_URL`

### Netlify: Functions Not Working
- Check **Functions** tab in Netlify
- Verify `functions/api.js` exists
- Check that `netlify.toml` has the correct redirects

### Netlify: CORS Errors
- Make sure your Railway backend has CORS enabled (check `server/app.js`)
- The `cors()` middleware should be present

### Frontend Can't Connect to Backend
- Double-check the Railway URL is correct (no trailing slash)
- Check browser console for errors
- Verify environment variables in Netlify

---

## 📝 Summary of Key Files

| File | Purpose |
|------|---------|
| `server/app.js` | Express app logic (exportable) |
| `server/server.js` | Local dev server |
| `functions/api.js` | Netlify serverless wrapper |
| `netlify.toml` | Netlify build config |
| `server/config/database.js` | Supports both `DATABASE_URL` and individual vars |
| `package.json` | Root scripts for Railway |

---

## 🎉 Success!

Once both deploys are successful:
- **Backend**: `https://your-app.up.railway.app`
- **Frontend**: `https://your-app.netlify.app`

Your InventoryPro application is now live!
