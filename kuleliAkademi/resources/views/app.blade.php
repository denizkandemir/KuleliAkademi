<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hizmeti sunan uzman danışmanlık platformu.">
    <meta name="keywords" content="Polonya üniversite, yurtdışı eğitim, eğitim danışmanlığı, Polonya başvurusu">
    
    <!-- Search Engine Verification -->
    <meta name="google-site-verification" content="">
    <meta name="msvalidate.01" content="">
    
    <!-- Robots and Crawling -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Open Graph Tags -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Polonya Üniversite Danışmanlığı | Kuleli Akademi">
    <meta property="og:description" content="Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hizmeti sunan uzman platform.">
    <meta property="og:image" content="{{ url('/og-image.png') }}">
    <meta property="og:url" content="{{ url('/') }}">
    <meta property="og:site_name" content="Kuleli Akademi">
    <meta property="og:locale" content="tr_TR">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Polonya Üniversite Danışmanlığı | Kuleli Akademi">
    <meta name="twitter:description" content="Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hizmeti sunan uzman platform.">
    <meta name="twitter:image" content="{{ url('/og-image.png') }}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}">
    
    <!-- Alternate Languages -->
    <link rel="alternate" hreflang="tr" href="{{ url()->current() }}">
    
    <!-- Preconnect to External Resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Vite and Inertia -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
    
    <!-- Organization Schema -->
    <script type="application/ld+json">
    {
        "@@context": "https://schema.org",
        "@@type": "EducationalOrganization",
        "name": "Kuleli Akademi",
        "description": "Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hizmeti sunan uzman danışmanlık platformu.",
        "url": "{{ url('/') }}",
        "logo": "{{ url('/logo.png') }}",
        "sameAs": [
            "https://www.facebook.com/kuleliakademi",
            "https://www.instagram.com/kuleliakademi",
            "https://www.linkedin.com/company/kuleliakademi"
        ],
        "contactPoint": {
            "@@type": "ContactPoint",
            "contactType": "Customer Support",
            "email": "info@akademikuleli.com"
        }
    }
    </script>
    
    <!-- Website Schema -->
    <script type="application/ld+json">
    {
        "@@context": "https://schema.org",
        "@@type": "WebSite",
        "name": "Kuleli Akademi",
        "url": "{{ url('/') }}",
        "description": "Polonya üniversite danışmanlığı ve yurtdışı eğitim hizmetleri",
        "potentialAction": {
            "@@type": "SearchAction",
            "target": {
                "@@type": "EntryPoint",
                "urlTemplate": "{{ url('/') }}?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    }
    </script>
</head>
<body>
    @inertia
</body>
</html>