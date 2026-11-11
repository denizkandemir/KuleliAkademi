/**
 * Yurt dışı ülke ve program tanımları için tek kaynak.
 * Menü, ana sayfa / merkez sayfa kartları ve form program seçimleri buradan okur.
 *
 * Program anahtarları app/Support/StudyPrograms.php ile birebir aynı olmalıdır
 * (formlardaki `program` alanı backend'de bu listeyle doğrulanır).
 */

export const studyPrograms = [
    { value: 'poland_university', label: 'Polonya · Üniversite (lisans, yüksek lisans, hazırlık)' },
    { value: 'spain_language', label: 'İspanya · Dil okulu' },
    { value: 'spain_foundation', label: 'İspanya · Üniversiteye hazırlık yılı' },
    { value: 'malta_language', label: 'Malta · İngilizce dil okulu (yakında, ön kayıt)' },
    { value: 'aliaga_courses', label: 'Aliağa · Yüz yüze dersler (LGS, ortaokul)' },
];

export const isStudyProgram = (value) => studyPrograms.some((program) => program.value === value);

export const getStudyProgramLabel = (value) => studyPrograms.find((program) => program.value === value)?.label || null;

// Ana sayfa ve /yurtdışıeğitim üzerindeki ülke / program kartları
export const destinationCards = [
    {
        id: 'poland-university',
        country: 'Polonya',
        program: 'Üniversite',
        title: "Polonya'da Üniversite",
        description: "İngilizce lisans, yüksek lisans ve hazırlık programları. Okul seçiminden vize ve oturum iznine, Polonya'da yerleşmeye kadar birebir takip.",
        highlights: ['YKS şartı olmadan başvuru seçenekleri', 'Avrupa’da geçerli diploma', 'Varşova’da yaşayan danışman'],
        href: '/polonyada-universite',
        cta: 'Polonya Sayfası',
        image: '/storage/images/polandPicture2.webp',
        imageAlt: "Polonya'da üniversite kampüsü",
        status: 'active',
    },
    {
        id: 'spain-language',
        country: 'İspanya',
        program: 'Dil Okulu',
        title: "İspanya'da Dil Okulu",
        description: 'Enforex, Hispania ve Linguaschools ile 12 şehirde İspanyolca kursları. Kurs, konaklama, transfer ve vize sürecini birlikte planlıyoruz.',
        highlights: ['Kısa ve uzun dönem kurslar', 'Aile yanı ya da öğrenci dairesi', 'DELE / SIELE hazırlık'],
        href: '/ispanyada-egitim',
        cta: 'İspanya Sayfası',
        // [DOLDURULACAK] İspanya'ya özel görsel eklenince değiştirilecek (şu an genel öğrenci görseli)
        image: '/storage/images/studentsPicture8.webp',
        imageAlt: 'Dil okulunda birlikte çalışan öğrenciler',
        status: 'active',
    },
    {
        id: 'spain-foundation',
        country: 'İspanya',
        program: 'Üniversiteye Hazırlık',
        title: "İspanya'da Üniversiteye Hazırlık Yılı",
        description: "İspanyolca ile birlikte PCE / EBAU sınav hazırlığı ve pathway programları. İspanya'da üniversite hedefleyen öğrenciler için bir yıllık plan.",
        highlights: ['PCE ve EBAU hazırlığı', 'Pathway programları', 'Öğrenci vizesine uygun uzun dönem'],
        href: '/ispanyada-egitim#universite-hazirlik',
        cta: 'Hazırlık Programları',
        // [DOLDURULACAK] İspanya'ya özel görsel eklenince değiştirilecek (şu an genel öğrenci görseli)
        image: '/storage/images/studentsPicture1.webp',
        imageAlt: 'Üniversiteye hazırlanan öğrenciler',
        status: 'active',
    },
    {
        id: 'malta-language',
        country: 'Malta',
        program: 'İngilizce Dil Okulu',
        title: "Malta'da İngilizce",
        description: "Malta'daki İngilizce dil okullarıyla anlaşmalarımız sürüyor. Programlar açıldığında ilk sizi bilgilendirelim.",
        highlights: ['Çok yakında'],
        href: '/iletişim?program=malta_language',
        cta: 'Ön Kayıt Bırakın',
        image: '/storage/images/studentsPicture3.webp',
        imageAlt: 'Çimlerde ders çalışan öğrenciler',
        status: 'soon',
    },
];

// Navbar / MobileMenu / Footer "Yurt Dışında Eğitim" alt menüsü
export const studyAbroadMenu = [
    { label: 'Tüm Ülkeler ve Programlar', href: '/yurtdışıeğitim' },
    { label: "Polonya'da Üniversite", href: '/polonyada-universite', tag: 'Polonya' },
    { label: 'Polonya Üniversiteleri', href: '/üniversiteler', tag: 'Polonya' },
    { label: "İspanya'da Eğitim", href: '/ispanyada-egitim', tag: 'İspanya' },
    { label: 'Dil Okulları', href: '/dil-okullari' },
    { label: 'Malta', href: null, tag: 'Yakında', soon: true },
];

export default destinationCards;
