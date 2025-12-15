# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ "Connection failed. If the problem persists, please check your internet connection or VPN"

This error occurs when the AI service cannot connect to the Google Gemini API. Here are the most common causes and solutions:

#### **Cause 1: Missing API Key** (Most Common)

**Symptoms:**
- Error message appears when trying to use AI features
- Console shows warnings about API key not configured

**Solution:**
1. Create a `.env` file in the project root directory
2. Add your API key:
   ```
   VITE_API_KEY=your_actual_api_key_here
   ```
3. **Important:** Restart the development server after creating/updating `.env`
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

**How to get an API key:**
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Sign in with your Google account
- Click "Create API Key"
- Copy the key and paste it in your `.env` file

---

#### **Cause 2: Invalid API Key**

**Symptoms:**
- Error persists even after setting API key
- Console shows authentication errors

**Solution:**
1. Verify your API key is correct (no extra spaces, complete key)
2. Check that the API key starts with `AIza...` (Google API keys typically start with this)
3. Ensure Gemini API is enabled in your Google Cloud Console
4. Regenerate the API key if needed

---

#### **Cause 3: Network/Firewall Issues**

**Symptoms:**
- Error appears even with valid API key
- Works on some networks but not others

**Solution:**
1. **Check Internet Connection:**
   - Ensure you have an active internet connection
   - Try accessing other websites to verify connectivity

2. **VPN Issues:**
   - If using VPN, try disabling it temporarily
   - Some VPNs block API connections
   - Try switching VPN servers or providers

3. **Firewall/Antivirus:**
   - Check if firewall is blocking Node.js/Vite
   - Temporarily disable antivirus to test
   - Add exceptions for Node.js and your project directory

4. **Corporate Network:**
   - Some corporate networks block API calls
   - Contact IT department to whitelist `generativelanguage.googleapis.com`
   - Consider using mobile hotspot for testing

---

#### **Cause 4: Environment Variable Not Loaded**

**Symptoms:**
- `.env` file exists but error persists
- API key seems correct

**Solution:**
1. **Verify `.env` file location:**
   - Must be in the project root (same directory as `package.json`)
   - File name must be exactly `.env` (not `.env.txt` or `.env.local`)

2. **Check file format:**
   ```
   VITE_API_KEY=your_key_here
   ```
   - No spaces around `=`
   - No quotes needed (unless key contains special characters)
   - No trailing spaces

3. **Restart development server:**
   ```bash
   # Stop server completely (Ctrl+C)
   npm run dev
   ```
   - Vite only reads `.env` on startup
   - Changes require server restart

4. **Verify in browser console:**
   - Open browser DevTools (F12)
   - Check Console tab for API key warnings
   - Should see: "API key not configured" if missing

---

#### **Cause 5: API Quota/Rate Limits**

**Symptoms:**
- Works initially but fails after multiple requests
- Error mentions "rate limit" or "quota"

**Solution:**
1. Check your Google Cloud Console for API quotas
2. Wait a few minutes before retrying
3. Consider upgrading your API plan if needed

---

## 🔍 Diagnostic Steps

### Step 1: Verify API Key Setup

```bash
# Check if .env file exists
ls -la .env

# On Windows PowerShell:
Test-Path .env

# View .env contents (be careful not to expose your key publicly)
cat .env
```

### Step 2: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for:
   - "API key not configured" → Missing API key
   - "Connection failed" → Network/API key issue
   - "Authentication error" → Invalid API key

### Step 3: Test API Key Manually

You can test your API key using curl:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

Replace `YOUR_API_KEY` with your actual key. If this fails, the issue is with the API key or network.

---

## ✅ Quick Fix Checklist

- [ ] `.env` file exists in project root
- [ ] `.env` contains `VITE_API_KEY=your_key`
- [ ] API key is valid and active
- [ ] Development server restarted after creating `.env`
- [ ] Internet connection is active
- [ ] VPN disabled (if applicable)
- [ ] Firewall not blocking connections
- [ ] Browser console checked for specific errors

---

## 🆘 Still Having Issues?

1. **Check the full error message** in browser console (F12 → Console)
2. **Verify API key** at [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Test network connectivity** to `generativelanguage.googleapis.com`
4. **Review logs** in terminal where `npm run dev` is running
5. **Try a different network** (mobile hotspot) to rule out network issues

---

## 📝 Notes

- The `.env` file should **never** be committed to Git (it's in `.gitignore`)
- API keys are sensitive - don't share them publicly
- For production deployment, set environment variables in your hosting platform (Vercel, Netlify, etc.)
- The app will work without AI features if API key is missing, but AI tools will show errors

---

**Last Updated:** December 15, 2025

