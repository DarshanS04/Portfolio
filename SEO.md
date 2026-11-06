# Post-Deployment SEO Guide for Darshan Saravari

This guide outlines the critical manual actions required after deploying **Darshan.sh** to ensure rapid search engine indexing so queries for **"Darshan Saravari"** immediately rank your portfolio at position #1.

---

## 1. Live Domain Status
Your portfolio is live at:
- **Production URL**: `https://darshansaravari.vercel.app`
- **Sitemap**: `https://darshansaravari.vercel.app/sitemap.xml`
- **Robots**: `https://darshansaravari.vercel.app/robots.txt`

If you later connect a custom domain (e.g. `darshansaravari.dev`):
1. In your **Vercel Dashboard**, go to **Settings > Domains** and add it.
2. Update `VITE_SITE_URL` in your Vercel Environment Variables.

---

## 2. Google Search Console (GSC) Setup
1. Visit [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property** and enter your live domain URL.
3. Choose **HTML Tag Verification**:
   - Copy the verification meta tag provided by Google (e.g. `<meta name="google-site-verification" content="..." />`).
   - Paste it into `index.html` inside `<head>`.
4. Deploy the update and click **Verify** in Google Search Console.
5. Once verified, navigate to **Sitemaps** on the left menu:
   - Enter `sitemap.xml` in the "Add a new sitemap" input.
   - Click **Submit**. Google will crawl all 4 prerendered routes (`/`, `/projects/electronic-gadget-ecommerce`, `/projects/bake-track`, `/projects/minor-it-sphere`).
6. Request Priority Indexing:
   - Use the URL Inspection tool at the top of GSC for `https://darshansaravari.vercel.app`.
   - Click **Request Indexing**.

---

## 3. Bing Webmaster Tools
1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Sign in and select **Import from Google Search Console** (fastest, 1-click synchronization).
3. Confirm that `sitemap.xml` is listed and status is set to Success.

---

## 4. Authoritative Backlinks & Knowledge Graph Seeding
Google uses identity backlinks to connect your name to this website:
1. **GitHub Profile (`github.com/DarshanS04`)**:
   - Edit your public profile.
   - In the **Website** field, add your portfolio URL: `https://darshansaravari.vercel.app`.
   - In your profile bio or `README.md`, include: `Check out my portfolio: https://darshansaravari.vercel.app`.
2. **LinkedIn Profile**:
   - Add your website link in your contact info: **Edit Contact Info > Add Website**.
   - URL: `https://darshansaravari.vercel.app`
   - Select type: **Personal**.
   - Add a featured link on your LinkedIn profile pointing to the portfolio.
3. **Resume (PDF)**:
   - Ensure your website URL is prominently featured under your contact header.

---

## 5. Ongoing Monitoring
- Run a PageSpeed Insights test: [pagespeed.web.dev](https://pagespeed.web.dev).
- Check your Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).
- Query Google every 2-3 days for `"Darshan Saravari"` to verify the snippet rendering with title:
  `Darshan Saravari | Full-Stack & Android Developer`.

