# Troubleshooting Guide

## White Screen Issues

If you encounter a white screen, this is usually caused by one of these issues:

### 1. **3D Component Loading Errors**

**Symptoms:** 
- White screen on initial load
- Works after refresh
- Console errors mentioning Three.js or WebGL

**Solutions:**

a) **Check Browser Console** (F12):
```
- Look for red error messages
- Check for "WebGL" or "THREE" errors
- Look for module loading errors
```

b) **Clear Browser Cache:**
```
Ctrl + Shift + Delete (Windows/Linux)
Cmd + Shift + Delete (Mac)
- Clear cached images and files
- Hard reload: Ctrl + Shift + R
```

c) **Disable Browser Extensions:**
- Ad blockers can interfere with 3D rendering
- Privacy extensions may block WebGL
- Try in incognito/private mode

### 2. **Build/Development Server Issues**

**Symptoms:**
- White screen persists across refreshes
- Console shows module not found errors

**Solutions:**

a) **Restart Dev Server:**
```powershell
# Stop the server (Ctrl + C)
# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Reinstall dependencies (if needed)
Remove-Item -Recurse -Force node_modules
npm install

# Start fresh
npm run dev
```

b) **Check Port Conflicts:**
```powershell
# Default is localhost:3000
# If blocked, Next.js will use 3001, 3002, etc.
# Check the terminal output for the actual port
```

### 3. **Memory/Performance Issues**

**Symptoms:**
- Page loads then freezes
- White screen appears after a few seconds
- Browser tab becomes unresponsive

**Solutions:**

a) **Reduce 3D Complexity:**
Edit `components/Hero3D.tsx`:
```typescript
// Reduce particle count
<ParticleField mousePosition={mousePosition} count={1000} /> // was 2000

// Reduce floating shapes
<FloatingShapes mousePosition={mousePosition} count={8} /> // was 15
```

b) **Close Other Browser Tabs:**
- 3D rendering is GPU-intensive
- Close unnecessary tabs to free resources

### 4. **Hydration Mismatch Errors**

**Symptoms:**
- White screen with console warning about hydration
- "Text content did not match" errors

**Solutions:**

a) **All client components use `"use client"`** (already implemented)

b) **Check `isMounted` state:**
```typescript
// Already implemented in page.tsx and Hero3D.tsx
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);
```

### 5. **Network/Resource Loading Issues**

**Symptoms:**
- White screen with network errors in console
- 404 errors for assets

**Solutions:**

a) **Check Asset Paths:**
```bash
# Verify avatar image exists
ls public/sam-avatar.jpg

# Verify data files exist
ls data/about.json
ls data/projects.json
```

b) **Check Network Tab** (F12 → Network):
- Look for failed requests (red)
- Check if assets are loading
- Verify response codes (should be 200)

## Debugging Steps

### Step 1: Check Browser Compatibility
```
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

❌ Internet Explorer (not supported)
❌ Very old browsers without WebGL support
```

### Step 2: Enable Error Boundaries
The app now has error boundaries that will show error messages instead of white screens.

If you see "Something went wrong" or "3D Scene Error":
1. Click "Reload Page" button
2. Check browser console for details
3. Follow specific error guidance

### Step 3: Test Without 3D
To isolate if 3D is the issue, temporarily disable it:

Edit `app/page.tsx`:
```typescript
{/* Temporarily comment out Hero3D */}
{/* <ErrorBoundary>
  <DynamicHero3D />
</ErrorBoundary> */}

{/* Add simple hero instead */}
<div className="h-screen flex items-center justify-center">
  <h1 className="text-6xl text-white">Sameer Das</h1>
</div>
```

If the page works without 3D, the issue is with WebGL/Three.js rendering.

### Step 4: Check WebGL Support
Visit: https://get.webgl.org/

If you see a spinning cube → WebGL works
If you see an error → Your browser/GPU doesn't support WebGL

**WebGL Fixes:**
- Update graphics drivers
- Enable hardware acceleration in browser settings
- Try a different browser

## Common Error Messages

### "Failed to compile"
```bash
# Clear cache and rebuild
Remove-Item -Recurse -Force .next
npm run dev
```

### "Module not found"
```bash
# Reinstall dependencies
npm install
```

### "WebGL context lost"
```
# Too many GPU-intensive operations
# Solution: Reduce particle count or close other GPU-heavy tabs
```

### "Hydration failed"
```
# Already fixed with isMounted checks
# If persists, hard refresh: Ctrl + Shift + R
```

## Performance Optimization

If the site is slow or laggy:

1. **Reduce Particle Count** (components/Hero3D.tsx):
   ```typescript
   count={1000} // instead of 2000
   ```

2. **Disable Animations on Mobile**:
   Already implemented with responsive breakpoints

3. **Use Production Build**:
   ```bash
   npm run build
   npm start
   ```
   Production is much faster than dev mode

## Still Having Issues?

1. **Check your browser console** (F12) for specific error messages
2. **Try in a different browser** to isolate browser-specific issues
3. **Verify your system meets minimum requirements:**
   - Modern browser (last 2 years)
   - WebGL-capable GPU
   - 4GB+ RAM recommended

4. **Contact for help** with:
   - Browser version
   - Operating system
   - Console error messages
   - Steps to reproduce

## Quick Reset
If all else fails:
```powershell
# Nuclear option - full reset
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
Remove-Item package-lock.json
npm install
npm run dev
```
