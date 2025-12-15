# 🔧 Fix: "Connection failed" Error - Step by Step

## Current Status Check

Your `.env` file exists but may have one of these issues:

### Issue 1: API Key Not Actually Set
The `.env` file might still have the placeholder. Verify:

1. **Open `.env` file** in the project root
2. **Check the value** - it should look like:
   ```
   VITE_API_KEY=AIzaSyC...your_actual_long_key_here
   ```
   NOT:
   ```
   VITE_API_KEY=your_actual_api_key_here
   ```

### Issue 2: Development Server Not Restarted
**Vite only reads `.env` when the server starts!**

**Solution:**
1. **Stop the current dev server** (Press `Ctrl+C` in the terminal)
2. **Start it again:**
   ```bash
   npm run dev
   ```

### Issue 3: Formatting Issues in .env File

**Common mistakes:**
- ❌ `VITE_API_KEY = value` (spaces around `=`)
- ❌ `VITE_API_KEY="value"` (quotes not needed)
- ❌ `VITE_API_KEY= value` (space after `=`)
- ❌ Multiple spaces or tabs
- ❌ Trailing spaces

**Correct format:**
- ✅ `VITE_API_KEY=AIzaSyC...your_key_here`
- ✅ No spaces around `=`
- ✅ No quotes
- ✅ No trailing spaces

### Issue 4: Wrong Variable Name

Make sure it's exactly `VITE_API_KEY` (not `API_KEY` or `GEMINI_API_KEY`)

---

## ✅ Step-by-Step Fix

### Step 1: Verify Your API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Make sure you have a valid API key
3. Copy the entire key (it should be long, starting with `AIza...`)

### Step 2: Update .env File

1. Open `.env` in your code editor
2. Replace the entire line with:
   ```
   VITE_API_KEY=AIzaSyC...paste_your_actual_key_here
   ```
3. **Save the file** (Ctrl+S)

### Step 3: Restart Development Server

**This is critical!**

```bash
# In the terminal where npm run dev is running:
# Press Ctrl+C to stop

# Then restart:
npm run dev
```

### Step 4: Verify It's Loaded

1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `import.meta.env.VITE_API_KEY`
4. You should see your API key (not `undefined`)

**If you see `undefined`:**
- The server wasn't restarted, OR
- The `.env` file format is wrong

---

## 🔍 Diagnostic Commands

Run these to check:

```powershell
# Check if .env exists
Test-Path .env

# View .env contents (be careful!)
Get-Content .env

# Check if API key is being read (after restarting server)
# Open browser console and type:
# import.meta.env.VITE_API_KEY
```

---

## 🚨 Still Not Working?

### Check Browser Console

1. Open DevTools (F12)
2. Look for these messages:
   - "API key not configured" → API key not loaded
   - "Connection failed" → Network/API issue
   - "Authentication error" → Invalid API key

### Test API Key Manually

```bash
# Replace YOUR_KEY with your actual key
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_KEY" -H "Content-Type: application/json" -d "{\"contents\":[{\"parts\":[{\"text\":\"Hello\"}]}]}"
```

If this fails, the API key itself might be invalid.

---

## 📝 Quick Checklist

- [ ] `.env` file exists in project root
- [ ] `.env` contains `VITE_API_KEY=your_actual_key` (not placeholder)
- [ ] No spaces around `=` sign
- [ ] No quotes around the key
- [ ] Development server restarted after editing `.env`
- [ ] Browser console shows API key when checking `import.meta.env.VITE_API_KEY`
- [ ] API key is valid (tested manually)

---

**Most Common Issue:** Forgetting to restart the dev server after editing `.env`!

