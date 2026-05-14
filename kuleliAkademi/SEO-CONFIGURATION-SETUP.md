# SEO Configuration & Setup Instructions

## Critical Configuration Updates Required

### 1. Update Site Configuration
**File**: `resources/js/utils/seoHelpers.js`

```javascript
export const siteConfig = {
  siteName: 'Kuleli Akademi',
  siteUrl: 'https://akademikuleli.com', // ← CHANGE TO YOUR DOMAIN
  siteDescription: '...',
  siteLocale: 'tr_TR',
  logo: 'https://akademikuleli.com/logo.png', // ← CHANGE TO YOUR LOGO URL
  organizationName: 'Kuleli Akademi',
  organizationEmail: 'info@akademikuleli.com', // ← CHANGE TO YOUR EMAIL
  organizationPhone: '+90XXX-XXX-XXXX', // ← CHANGE TO YOUR PHONE
};
```

**Action Items**:
- [ ] Replace `https://akademikuleli.com` with your actual domain
- [ ] Replace with actual logo URL (1200x630px recommended for social sharing)
- [ ] Update contact email address
- [ ] Update phone number with country code

---

### 2. Update Social Media Links
**File**: `resources/js/utils/seoHelpers.js`

In `generateOrganizationSchema()` function:
```javascript
sameAs: [
  'https://www.facebook.com/kuleliakademi', // ← UPDATE
  'https://www.instagram.com/kuleliakademi', // ← UPDATE
  'https://www.linkedin.com/company/kuleliakademi', // ← UPDATE
]
```

**Action Items**:
- [ ] Replace with actual Facebook page URL
- [ ] Replace with actual Instagram profile URL
- [ ] Replace with actual LinkedIn company page URL

---

### 3. Create OpenGraph Image
You need a social sharing image (1200x630px):

**Recommended**:
- Create: `public/og-image.png` (1200x630px)
- Format: PNG or JPG
- Content: Your logo + "Polonya Üniversite Danışmanlığı"
- Update reference in `resources/views/app.blade.php` if different location

```html
<meta property="og:image" content="{{ url('/og-image.png') }}">
```

---

### 4. Verify Google Site Verification Meta Tags
**File**: `resources/views/app.blade.php`

```html
<!-- Add your verification codes -->
<meta name="google-site-verification" content="YOUR_CODE_HERE">
<meta name="msvalidate.01" content="YOUR_CODE_HERE">
```

**Steps**:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property with your domain
3. Choose HTML tag verification method
4. Copy the content value
5. Paste into the meta tag above

---

### 5. Update Twitter Handle
**File**: `resources/js/utils/seoHelpers.js`

```javascript
export const generateTwitterTags = (data) => {
  return {
    // ...
    'twitter:site': data.site || '@KuleliAkademi', // ← CHANGE TO YOUR HANDLE
  };
};
```

**Action Items**:
- [ ] Replace `@KuleliAkademi` with your actual Twitter/X handle

---

## Testing & Validation

### 1. Test Robots.txt
Visit: `https://your-domain.com/robots.txt`

**Expected Output**:
```
User-agent: *
Allow: /
Allow: /hizmetler/
...
Sitemap: https://your-domain.com/sitemap.xml
```

---

### 2. Test Sitemap.xml
Visit: `https://your-domain.com/sitemap.xml`

**Expected Output**: XML with all URLs and proper formatting

---

### 3. Validate Structured Data
Use: [Google Structured Data Testing Tool](https://developers.google.com/search/docs/advanced/structured-data)

**Check**:
- [ ] No errors in Organization schema
- [ ] No errors in Service schema
- [ ] BreadcrumbList valid
- [ ] WebPage schema valid

---

### 4. Check OpenGraph Tags
Use: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

**Actions**:
1. Paste your homepage URL
2. Verify og:title, og:description, og:image appear correctly
3. Check preview image displays properly
4. Repeat for service detail pages

---

### 5. Check Twitter Cards
Use: [Twitter Card Validator](https://cards-dev.twitter.com/validator)

**Actions**:
1. Paste your homepage URL
2. Verify summary_large_image format
3. Check title and description
4. Verify image displays

---

### 6. Mobile-Friendly Test
Use: [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

**Expected**: "Page is mobile friendly"

---

### 7. Lighthouse SEO Audit
In Chrome DevTools:
1. Press F12
2. Go to Lighthouse tab
3. Run SEO audit
4. Target: 100/100

**Key metrics**:
- Document has a meta description ✓
- Document has valid hreflang ✓
- HTML has lang attribute ✓
- Page has successful HTTP status code ✓

---

## Google Search Console Setup

### 1. Add Property
1. Go to [Search Console](https://search.google.com/search-console)
2. Click "Add property"
3. Enter your domain with `https://`
4. Follow verification steps

### 2. Submit Sitemap
1. In GSC, go to "Sitemaps"
2. Click "Add/Test sitemaps"
3. Enter: `sitemap.xml`
4. Click "Submit"

### 3. Request Indexing
1. In GSC, use URL Inspection tool
2. Enter: `https://your-domain.com/`
3. Click "Request indexing"
4. Repeat for key pages:
   - `/hizmetler/okul-basvurusu`
   - `/hizmetler/vize-basvurusu`
   - `/egitimlerimiz`

### 4. Monitor Performance
Check these regularly:
- **Coverage**: All pages indexed?
- **Performance**: Impressions, clicks, CTR
- **Enhancements**: Rich snippets/structured data
- **Mobile Usability**: Any issues?

---

## Bing Webmaster Tools Setup (Optional but recommended)

### 1. Add Site
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Click "Add a site"
3. Enter your domain

### 2. Verify Ownership
Choose from:
- XML file upload
- Meta tag in header
- CNAME record

### 3. Submit Sitemap
1. Go to "Sitemaps"
2. Add: `sitemap.xml`

---

## Local SEO Enhancement (Optional)

If you have a physical location:

**Update in `seoHelpers.js`**:
```javascript
address: {
  '@type': 'PostalAddress',
  addressCountry: 'TR',
  addressRegion: 'İzmir', // or your city
  addressLocality: 'Alsancak',
  postalCode: '35000',
  streetAddress: 'Your Street Name',
}
```

---

## Monitoring & Maintenance

### Weekly
- Check Google Search Console for new errors
- Monitor indexing status
- Check for crawl errors

### Monthly
- Review search performance data
- Check Core Web Vitals
- Monitor backlinks (if any)

### Quarterly
- Audit internal links
- Update keyword strategy
- Analyze competitor SEO
- Update service descriptions if needed

---

## FAQ

**Q: How often does Google crawl my site?**
A: Typically 1-2 times per week for new domains, more frequently for established sites.

**Q: When will pages appear in search results?**
A: Usually 3-5 days after crawling, but can take 2-4 weeks for full indexing.

**Q: Should I do anything special for Turkish SEO?**
A: Your hreflang is already set to `tr_TR`. Keep content naturally Turkish without translation.

**Q: How do I improve CTR (Click-Through Rate)?**
A: Write compelling titles and descriptions, include numbers/statistics, use keywords naturally.

**Q: Can I change URLs without losing rankings?**
A: Yes, if you set up proper 301 redirects and update GSC.

---

## Important Notes

⚠️ **Do NOT**:
- Block Google bots in robots.txt
- Use noindex on important pages
- Add excessive keywords (stuffing)
- Copy content from other websites
- Add duplicate content across pages
- Ignore Core Web Vitals issues

✅ **DO**:
- Keep content fresh and updated
- Add internal links naturally
- Optimize images properly
- Monitor Search Console regularly
- Test regularly with validation tools
- Keep HTML/CSS semantic
- Maintain mobile-friendly design
- Update content monthly

---

## Quick Checklist Before Going Live

- [ ] Update siteConfig with actual domain
- [ ] Update logo URL
- [ ] Update contact email
- [ ] Update phone number
- [ ] Update social media URLs
- [ ] Create OG image (1200x630px)
- [ ] Add Google verification meta tag
- [ ] Add Bing verification (optional)
- [ ] Test robots.txt
- [ ] Test sitemap.xml
- [ ] Validate structured data
- [ ] Test OpenGraph (Facebook)
- [ ] Test Twitter Cards
- [ ] Run Lighthouse audit
- [ ] Test mobile-friendly
- [ ] Add property to Google Search Console
- [ ] Submit sitemap to GSC
- [ ] Request initial indexing in GSC
- [ ] Monitor first week for errors

---

## Support

For issues or questions:
1. Check [Google Search Central](https://developers.google.com/search)
2. Validate with [Schema.org](https://schema.org)
3. Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
4. Review [SEO-IMPLEMENTATION-GUIDE.md](./SEO-IMPLEMENTATION-GUIDE.md)

