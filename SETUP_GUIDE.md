# Malhar Live Website - Setup & Deployment Guide

## ✅ What's Included

This is a **production-ready Next.js website** with:

- ✅ Responsive design (mobile-first)
- ✅ All pages built (Home, About, Gallery, Music)
- ✅ Components ready (Navbar, Hero, Services, Gallery, Testimonials, CTA, Footer)
- ✅ Tailwind CSS styling (custom brand colors)
- ✅ TypeScript for type safety
- ✅ SEO optimized
- ✅ Cloudinary ready for images
- ✅ Spotify integration ready
- ✅ Contact form ready

---

## 🚀 Deployment Steps

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Create a new repository: `malhar-live`
3. Make it public or private
4. Copy your GitHub username

### Step 2: Upload Project to GitHub

```bash
# Navigate to project
cd /tmp/malhar-live

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Malhar Live website

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/malhar-live.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select `malhar-live` repository
5. Configure environment variables:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloudinary_name
   NEXT_PUBLIC_FORMSPREE_ID = (optional)
   NEXT_PUBLIC_SITE_URL = https://malharLive.com
   NEXT_PUBLIC_BOOKING_EMAIL = malharsings@gmail.com
   ```
6. Click "Deploy"
7. Wait for deployment to finish
8. Copy your Vercel URL

### Step 4: Point Domain to Vercel

1. Buy domain: `malharLive.com` (if not done yet)
2. Go to domain registrar (Namecheap/GoDaddy)
3. Go to Vercel → Settings → Domains
4. Add your domain
5. Update DNS nameservers (instructions provided by Vercel)
6. Wait 24-48 hours for DNS to propagate

### Step 5: Set Up Cloudinary (For Images)

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Go to Dashboard
4. Find "Cloud Name"
5. Add to Vercel environment variable:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloud_name
   ```
6. Redeploy on Vercel

### Step 6: Configure Contact Form (Optional)

1. Go to [formspree.io](https://formspree.io)
2. Sign up free
3. Create new form
4. Point to: `malharsings@gmail.com`
5. Get Form ID
6. Add to Vercel environment variable:
   ```
   NEXT_PUBLIC_FORMSPREE_ID = your_form_id
   ```

---

## 📝 Customization Guide

### Update Artist Information

Edit `/app/about/page.tsx`:
```tsx
// Change artist bio, story, influences
```

### Update Services & Pricing

Edit components/ServiceSelector.tsx:
```tsx
const services = [
  {
    title: 'Solo',
    price: '₹15,000',  // Update price here
    // ...
  }
]
```

### Update Contact Email

Edit multiple files:
- `/components/Footer.tsx` - Update email address
- `/components/Navbar.tsx` - Update email in contact
- `.env.local` - `NEXT_PUBLIC_BOOKING_EMAIL`

### Add Images

1. Upload to Cloudinary
2. Get Cloudinary URL
3. Add to content files or components

### Add Spotify Tracks

Edit `/app/music/page.tsx` and `/components/FeaturedMusic.tsx`:
```tsx
const tracks = [
  {
    id: 'spotify_track_id',  // Replace with real ID
    title: 'Track Title',
  }
]
```

---

## 🎨 Brand Customization

### Colors

Edit `tailwind.config.ts`:
```ts
extend: {
  colors: {
    primary: '#D4AF37',      // Change gold
    secondary: '#1a2332',    // Change navy
    accent: '#F5F1E8',       // Change cream
  },
}
```

### Typography

Edit `app/globals.css`:
```css
h1, h2, h3 {
  font-family: 'Your Font', serif;  // Change fonts
}
```

---

## 🔄 Continuous Deployment

After initial setup:

1. **Edit files locally** (or via GitHub web editor)
2. **Push to GitHub**
3. **Vercel auto-deploys** (within 1-2 minutes)

No terminal needed after setup!

### Update via GitHub UI (No Terminal)

1. Go to GitHub repository
2. Navigate to file (e.g., `app/page.tsx`)
3. Click pencil icon (Edit)
4. Make changes
5. Commit → Vercel auto-deploys

---

## 📊 Project Structure After Setup

```
malhar-live/
├── app/
│   ├── page.tsx          ← Homepage
│   ├── about/page.tsx    ← About page
│   ├── gallery/page.tsx  ← Gallery page
│   ├── music/page.tsx    ← Music page
│   └── globals.css       ← Global styles
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Footer.tsx
│   └── ... (all components)
├── package.json
├── tailwind.config.ts
├── next.config.js
└── .env.local (your secrets)
```

---

## ✅ Pre-Launch Checklist

Before going live:

- [ ] Domain purchased and pointed to Vercel
- [ ] Cloudinary account set up
- [ ] Environment variables configured
- [ ] Contact email updated
- [ ] Artist bio updated
- [ ] Testimonials added
- [ ] Spotify tracks linked
- [ ] Instagram links updated
- [ ] Mobile responsiveness tested
- [ ] All links working
- [ ] Contact form tested
- [ ] Google Analytics added (optional)

---

## 🆘 Troubleshooting

### Deploy Button Not Working
- Ensure GitHub repo is public
- Re-check repository name
- Clear browser cache

### Environment Variables Not Working
- Ensure names match exactly
- Redeploy after adding variables
- Check Vercel dashboard for errors

### Cloudinary Images Not Loading
- Verify Cloud Name is correct
- Check Cloudinary permissions
- Ensure images are published

### Contact Form Not Working
- Verify Formspree ID is correct
- Test email address
- Check spam folder

---

## 📞 Support

- **Artist**: malharsings@gmail.com
- **Instagram**: @malharsings
- **Website Issues**: Check Vercel dashboard → Deployments

---

## 🚀 Next Phase: Service Subdomain

This is the **main site** (malharLive.com)

Next: Build **service booking site** (live.malharLive.com) with:
- Solo/Duo/Trio service pages
- Interactive booking form
- Price comparisons
- Booking workflow

---

**Deployment Time**: 30-45 minutes
**Maintenance**: Minimal (edits via GitHub UI)
**Cost**: $300-500/year (domain only)
**Hosting**: Free forever on Vercel

✨ **Your website is ready to launch!** ✨
