# 🔍 Connection Error Diagnostic Guide

Since your `.env` file has the API key, let's diagnose why the connection is still failing.

## Quick Diagnostic Steps

### Step 1: Verify API Key is Loaded

1. **Open your browser DevTools** (F12)
2. **Go to Console tab**
3. **Type this command:**
   ```javascript
   import.meta.env.VITE_API_KEY
   ```
4. **Check the result:**
   - ✅ If you see your API key → It's loaded correctly
   - ❌ If you see `undefined` → The dev server needs to be restarted

### Step 2: Check Browser Console for Actual Error

When you see the "Connection failed" error:

1. **Open DevTools** (F12)
2. **Go to Console tab**
3. **Look for the actual error message** (it will be more detailed)
4. **Check for:**
   - Network errors (CORS, blocked requests)
   - Authentication errors (invalid API key)
   - Timeout errors
   - SDK initialization errors

### Step 3: Test API Key Directly

Open this URL in your browser (replace `YOUR_API_KEY` with your actual key):

```
https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY
```

**Method: POST**
**Body (JSON):**
```json
{
  "contents": [{
    "parts": [{"text": "Hello"}]
  }]
}
```

**Results:**
- ✅ If it works → API key is valid, issue is in the app
- ❌ If it fails → API key or network issue

---

## Common Causes (When API Key IS Set)

### Cause 1: Dev Server Not Restarted ⚠️ MOST COMMON

**Problem:** Vite only reads `.env` when the server starts.

**Solution:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Cause 2: Network/VPN/Firewall Blocking

**Symptoms:**
- API key is loaded correctly
- Direct API test fails
- Error mentions "network" or "connection"

**Solutions:**
1. **Disable VPN temporarily** to test
2. **Check firewall settings** - allow Node.js/Vite
3. **Try different network** (mobile hotspot)
4. **Check corporate network** - may block API calls
5. **Whitelist:** `generativelanguage.googleapis.com`

### Cause 3: Invalid API Key Format

**Check:**
- No spaces around `=` in `.env`
- No quotes around the key
- Key is complete (not truncated)
- Key starts with `AIza...` (typically)

**Correct format:**
```
VITE_API_KEY=AIzaSyC...your_complete_key_here
```

### Cause 4: API Key Permissions/Quota

**Check:**
1. Go to: https://makersuite.google.com/app/apikey
2. Verify API key is active
3. Check if Gemini API is enabled
4. Check quota/usage limits

### Cause 5: CORS or Browser Security

**Symptoms:**
- Works in one browser but not another
- Console shows CORS errors

**Solutions:**
1. Try different browser
2. Clear browser cache
3. Disable browser extensions temporarily
4. Check browser console for CORS errors

### Cause 6: SDK Version Issue

**Check package.json:**
```json
"@google/genai": "^1.33.0"
```

**If outdated, update:**
```bash
npm update @google/genai
```

---

## Diagnostic Tool

I've created `test-api-connection.html` - open it in your browser while the dev server is running to test each step:

1. **Check if environment variable is loaded**
2. **Test API key format**
3. **Test direct API call**
4. **Test GenAI SDK**

This will pinpoint exactly where the issue is.

---

## What to Check in Browser Console

When the error occurs, look for:

```javascript
// Check 1: Is API key loaded?
import.meta.env.VITE_API_KEY

// Check 2: What's the actual error?
// Look for red error messages in console

// Check 3: Network tab
// Open Network tab → Look for failed requests to generativelanguage.googleapis.com
```

---

## Still Not Working?

Share these details:

1. **Browser console output** (screenshot or copy error)
2. **Result of:** `import.meta.env.VITE_API_KEY` in console
3. **Network tab** - any blocked/failed requests?
4. **Are you using VPN?**
5. **What happens when you test the API directly?**

This will help identify the exact issue!

