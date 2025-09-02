# 🚀 SkillHouse Deployment Guide

## Pre-Deployment Checklist ✅

### 1. Build Optimization
- [x] Code splitting implemented with React.lazy()
- [x] Manual chunking configured for vendor libraries
- [x] Terser minification enabled
- [x] Console logs removed in production
- [x] Asset path issues resolved

### 2. Performance Metrics
- **Bundle Size Reduction**: 62% (1.38MB → 525KB)
- **Build Time**: 13.55s (improved from 30.33s)
- **Chunks Generated**: 13 optimized vendor chunks
- **Gzipped Main Bundle**: 163.63 kB

### 3. Quick Commands

```bash
# Build for production
npm run build

# Build and analyze bundle
npm run build:analyze

# Preview production build locally
npm run preview

# Lint and fix code
npm run lint:fix
```

## Deployment Options 🌐

### Option 1: Netlify (Recommended for Static Sites)
1. Build: `npm run build`
2. Deploy folder: `dist`
3. Environment variables: Configure in Netlify dashboard

### Option 2: Vercel
1. Connect GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Option 3: Traditional Web Server
1. Run: `npm run build`
2. Upload `dist` folder contents to web server
3. Configure server for SPA routing (history mode)

## Environment Variables 🔧

Create `.env.production` file:
```
VITE_API_BASE_URL=https://your-api-domain.com
VITE_RAZORPAY_KEY=your_production_razorpay_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

## Server Configuration 🖥️

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache .htaccess
```apache
RewriteEngine On
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
</filesMatch>
```

## Performance Monitoring 📊

### Tools to Monitor
- **Google PageSpeed Insights**: Check Core Web Vitals
- **GTmetrix**: Analyze loading performance
- **Chrome DevTools**: Monitor bundle loading
- **Bundle Analyzer**: Track bundle size over time

### Key Metrics to Watch
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

## Post-Deployment Tasks ✨

### 1. Test Key Functionality
- [ ] User authentication (login/signup)
- [ ] Course enrollment and viewing
- [ ] Payment integration
- [ ] Dashboard functionality
- [ ] Mobile responsiveness

### 2. Performance Validation
- [ ] Run PageSpeed Insights
- [ ] Check loading times on 3G/4G
- [ ] Verify asset caching
- [ ] Test lazy loading

### 3. SEO & Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Configure Google Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Add Open Graph meta tags

## Troubleshooting 🔧

### Common Issues

**1. White Screen on Load**
- Check browser console for errors
- Verify asset paths in production
- Ensure environment variables are set

**2. Routing Issues**
- Configure server for SPA routing
- Check history mode configuration
- Verify base URL settings

**3. Large Bundle Size**
- Run `npm run build:analyze`
- Check for unused dependencies
- Consider further code splitting

**4. Slow Loading**
- Enable gzip compression on server
- Use CDN for static assets
- Optimize images and fonts

## Security Considerations 🔒

- [ ] Enable HTTPS
- [ ] Set security headers
- [ ] Validate environment variables
- [ ] Remove development tools from production
- [ ] Configure CORS properly

## Backup & Rollback 💾

- Keep previous build artifacts
- Use version tags in deployment
- Have rollback procedure ready
- Monitor error rates post-deployment

---

**Need Help?** Check the [bundle analysis report](./bundle-analysis.html) for detailed performance insights.
