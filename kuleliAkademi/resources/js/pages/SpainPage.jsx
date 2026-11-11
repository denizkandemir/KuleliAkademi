import React from "react";
import SEOHead from '../components/SEOHead/SEOHead';
import { generateBreadcrumbSchema, generateCanonical, generateFaqSchema, getPageMetadata } from '../utils/seoHelpers';
import Banner from "../components/Banner/Banner";
import FaqSection from "../components/faqSection/faqSection";
import HomepageContact from "../components/homepageContact/HomepageContact";
import { AbroadSection, ComparisonTable, CtaBand, InfoCardGrid, NoteBox } from "../components/AbroadSections/AbroadSections";
import { contactConfig } from "../config/contactConfig";
import "./SpainPage.scss";

// [DOLDURULACAK] İspanya'ya özel banner görseli eklenince değiştirilecek (şu an genel öğrenci görseli)
const bannerImg = "/storage/images/studentsPicture8.webp";
const PAGE_PATH = '/ispanyada-egitim';

// Kaynak: Kuleli International iç rehberi (Kasım 2026); okul fiyatları okulların resmi listelerinden.
const cities = [
    "Madrid", "Barselona", "Valensiya", "Malaga", "Granada", "Salamanca",
    "San Sebastián", "Sevilla", "Alicante", "Marbella", "Cádiz", "Tenerife",
];

const partnerSchools = [
    {
        id: "enforex",
        meta: "En geniş ağ · 11 şehir",
        title: "Enforex",
        text: "Madrid, Barselona, Valensiya, Malaga, Granada, Salamanca, Sevilla, Alicante, Marbella, Cádiz ve Tenerife.",
        items: [
            "Yoğun kurslar (haftada 10–30 ders)",
            "Uzun dönem ve gap year programları",
            "Üniversiteye giriş (PAU / PCE) hazırlığı",
            "DELE / SIELE sınav hazırlığı",
            "Gençlik programları (14–21 yaş) ve yaz kampları",
        ],
        footnote: "Çoğu okulda alt yaş 14; Cádiz'de 17, Tenerife'de 18. Fiyat: teklif üzerine.",
    },
    {
        id: "linguaschools",
        meta: "Yetişkinlere odaklı · 7 şehir",
        title: "Linguaschools",
        text: "Barselona, Madrid, Granada, Salamanca, Malaga, Valensiya ve San Sebastián.",
        items: [
            "Yoğun ve uzun dönem kurslar",
            "Üniversiteye hazırlık (pathway) programları",
            "DELE hazırlık",
            "Paylaşımlı daire ve aile yanı konaklama",
        ],
        footnote: "Ağırlıklı olarak yetişkin öğrenciler. Fiyatlar: Linguaschools 2027 fiyat listesi.",
    },
    {
        id: "hispania",
        meta: "Valensiya · 2002'den beri",
        title: "Hispania",
        text: "Instituto Cervantes ve EAQUALS akreditasyonlu okul. 10–14 kişilik sınıflar ve esnek ders saatleri.",
        items: [
            "Öğrenci vizesine uygun uzun dönem kurslar",
            "Üniversiteye hazırlık: PCE ve EBAU",
            "Yaz kursu ve 10–15 yaş yaz kampı",
            "Öğrenci dairesi ve aile yanı konaklama",
        ],
        footnote: "Fiyatlar: Hispania 2026–27 fiyat listesi.",
    },
];

const courseTypes = [
    {
        id: "short",
        title: "Kısa dönem yoğun kurslar",
        text: "Birkaç haftalık programlar. Kurslar çoğunlukla her pazartesi başlar; sıfırdan başlayanlar bazı okullarda belirli tarihlerde başlar.",
    },
    {
        id: "long",
        title: "Uzun dönem kurslar",
        text: "30, 40 ya da 52 haftalık programlar. Okul, öğrenci vizesi dosyası için gereken kabul mektubunu verir.",
    },
    {
        id: "exam",
        title: "DELE / SIELE hazırlık",
        text: "İspanyolca yeterlilik sınavlarına yönelik hazırlık kursları.",
    },
    {
        id: "young",
        title: "18 yaş altı programlar",
        text: "Enforex gençlik programları (14–21 yaş) ve Hispania yaz kampı (10–15 yaş). Linguaschools ağırlıklı olarak yetişkin okuludur.",
    },
];

const foundationPrograms = [
    {
        id: "hispania-pce",
        meta: "Hispania · Valensiya",
        title: "PCE ve EBAU hazırlığı",
        items: [
            "PCE hazırlık: bölüme göre 4 ders, haftada 20 saat",
            "EBAU hazırlık: 6 ders",
            "Yüksek lisans ve meslek yüksekokulu hazırlığı (en az B2 hedefi)",
            "Dönem: Ekim–Ağustos",
        ],
    },
    {
        id: "linguaschools-pathway",
        meta: "Linguaschools · Barselona, Madrid, Granada",
        title: "University pathway",
        items: [
            "Year pathway: 52 hafta, başlangıç 30 Ağustos 2027",
            "Fast track: 47 hafta, başlangıç 4 Ekim 2027",
            "İspanyolca ile birlikte üniversiteye hazırlık",
        ],
    },
    {
        id: "enforex-university",
        meta: "Enforex",
        title: "Üniversiteye giriş hazırlığı",
        items: [
            "PAU / PCE hazırlığı",
            "Uzun dönem ve gap year seçenekleri",
            "Fiyat: teklif üzerine",
        ],
    },
];

const priceColumns = ["Program", "Okul ve şehir", "Başlangıç fiyatı", "Kaynak"];

const priceRows = [
    ["Yoğun kurs (haftada 20 ders), 4 hafta", "Linguaschools · Granada", "620 €'dan başlayan (toplam)", "Linguaschools 2027"],
    ["Yoğun kurs (haftada 20 ders), 4 hafta", "Linguaschools · Barselona, Madrid", "720 €'dan başlayan (toplam)", "Linguaschools 2027"],
    ["Intensive Plus (haftada 20 saat)", "Hispania · Valensiya", "Haftalık 160 €'dan başlayan (hafta sayısına göre)", "Hispania 2026–27"],
    ["Uzun dönem kurs, 30 hafta (vizeye uygun)", "Hispania · Valensiya", "4.500 €'dan başlayan", "Hispania 2026–27"],
    ["Uzun dönem yoğun kurs, 30 hafta", "Linguaschools · Granada", "3.240 €'dan başlayan", "Linguaschools 2027"],
    ["Üniversiteye hazırlık (PCE)", "Hispania · Valensiya", "4.500 €'dan başlayan", "Hispania (Ekim 2026 dönemi)"],
    ["Üniversiteye hazırlık (fast track pathway, 47 hafta)", "Linguaschools · Barselona, Madrid, Granada", "4.750 €'dan başlayan", "Linguaschools 2027"],
    ["Konaklama: paylaşımlı daire, tek kişilik oda", "Linguaschools · Granada", "Haftalık 120 €'dan başlayan (12+ hafta)", "Linguaschools 2027"],
    ["Konaklama: öğrenci dairesi, bireysel oda", "Hispania · Valensiya", "Haftalık 150 €'dan başlayan (5+ hafta)", "Hispania 2026–27"],
];

const spainFaqs = [
    {
        id: 1,
        question: "Ne zaman başlayabilirim?",
        answer: "Kurslar çoğunlukla her pazartesi başlıyor; sıfırdan başlayanlar bazı okullarda belirli tarihlerde başlıyor. Üniversiteye hazırlık programlarının tarihleri sabit (örneğin Linguaschools: 30 Ağustos ve 4 Ekim 2027).",
    },
    {
        id: 2,
        question: "Yaş sınırı var mı?",
        answer: "Linguaschools ağırlıklı olarak yetişkin okulu. 18 yaş altı için Hispania yaz kampı (10–15 yaş) ve Enforex gençlik programları (14–21 yaş) var. Enforex'te çoğu okulda alt yaş 14; Cádiz'de 17, Tenerife'de 18.",
    },
    {
        id: 3,
        question: "İspanya'da üniversite okuyabilir miyim?",
        answer: "İspanya'da lisans hedefleyen yabancı öğrenciler için hazırlık programları var: Hispania PCE / EBAU hazırlığı, Linguaschools pathway ve Enforex üniversiteye giriş hazırlığı. Hangi sınavlara gireceğiniz bölümünüze ve hedef üniversiteye göre değişir; bölüm hedefinizi konuşup yolu birlikte netleştiriyoruz.",
    },
    {
        id: 4,
        question: "Hangi vizeye ihtiyacım var?",
        answer: "90 güne kadar süren kurslar için Schengen vizesi, daha uzun programlar için öğrenci vizesi gerekir. Uzun dönem kurslarda (30, 40 ya da 52 hafta) okul kabul mektubunu verir; vize dosyanızın hazırlığında biz de destek oluyoruz. Vize kararını konsolosluk verir.",
    },
    {
        id: 5,
        question: "Fiyat neden şehre göre değişiyor?",
        answer: "Her okulun kendi fiyat listesi var ve konaklama da şehre göre değişiyor. Örneğin Linguaschools 2027 listesinde paylaşımlı dairede tek kişilik oda Granada'da haftalık 120–145 €, Barselona'da 180–230 €.",
    },
    {
        id: 6,
        question: "Kuleli'ye ayrıca bir ücret ödüyor muyum?",
        answer: "Hayır. İspanya'daki dil okulu programlarında okulun resmi fiyatını ödersiniz; Kuleli International ayrıca hizmet bedeli almaz. Kurs, konaklama, havalimanı transferi ve vize desteğini birlikte planlıyoruz.",
    },
];

// İspanya sayfası: dil okulları + üniversiteye hazırlık yılı.
const SpainPage = () => {
    const pageSeo = getPageMetadata(PAGE_PATH);
    const whatsappHref = `${contactConfig.whatsapp.poland.url}?text=${encodeURIComponent(contactConfig.whatsappMessages.spain)}`;
    const schema = [
        generateBreadcrumbSchema([
            { label: 'Ana Sayfa', url: '/' },
            { label: 'Yurt Dışında Eğitim', url: '/yurtdışıeğitim' },
            { label: "İspanya'da Eğitim", url: PAGE_PATH },
        ]),
        generateFaqSchema(spainFaqs),
    ].filter(Boolean);

    return <>
        <SEOHead
            title={pageSeo.title}
            description={pageSeo.description}
            url={generateCanonical(PAGE_PATH)}
            type={pageSeo.type}
            schema={schema}
        />

        <Banner
            text="İspanya'da Eğitim"
            subtitle="Dil okulları ve üniversiteye hazırlık yılı"
            img={bannerImg}
            responsiveImg={bannerImg}
            location="İspanya'da Eğitim"
            alt="Birlikte ders çalışan öğrenciler"
        />

        <AbroadSection
            id="ispanya-giris"
            tone="light"
            eyebrow="Kuleli International · İspanya"
            title="3 Partner Okul, 12 Şehir"
            description="Enforex, Hispania ve Linguaschools ile İspanya'nın büyük şehirlerinde İspanyolca kursu, konaklama ve üniversiteye hazırlık programları planlıyoruz. Okulun resmi fiyatını ödersiniz; Kuleli International ayrıca hizmet bedeli almaz."
        >
            <ul className="spain-city-list" aria-label="Kurs verilen şehirler">
                {cities.map((city) => (
                    <li key={city}>{city}</li>
                ))}
            </ul>
            <nav className="spain-page-anchors" aria-label="Bu sayfada">
                <a href="#dil-okullari">Dil okulları</a>
                <a href="#universite-hazirlik">Üniversiteye hazırlık</a>
                <a href="#fiyatlar">Fiyatlar</a>
                <a href="#vize">Vize</a>
            </nav>
        </AbroadSection>

        <AbroadSection
            id="dil-okullari"
            tone="warm"
            eyebrow="İspanya'da Dil Okulları"
            title="Partner Okullarımız"
            description="Kurs, konaklama, havalimanı transferi ve vize desteğini birlikte planlıyoruz. Okulları şehir ve konaklama seçenekleriyle dil okulları sayfasında da inceleyebilirsiniz."
        >
            <InfoCardGrid cards={partnerSchools} />
            <div className="spain-page-link-row">
                <a className="spain-page-link" href="/dil-okullari?country=ispanya">İspanya'daki okulları şehir şehir incele →</a>
            </div>
        </AbroadSection>

        <AbroadSection
            id="kurs-turleri"
            tone="light"
            eyebrow="Kurs Türleri"
            title="Size Uygun Kursu Seçin"
        >
            <InfoCardGrid cards={courseTypes} />
        </AbroadSection>

        <AbroadSection
            id="universite-hazirlik"
            tone="grey"
            eyebrow="İspanya'da Üniversiteye Hazırlık"
            title="Üniversiteye Hazırlık Yılı"
            description="İspanya'da lisans hedefleyen öğrenciler için İspanyolca ile birlikte sınav hazırlığı yapılan, yaklaşık bir akademik yıl süren programlar."
        >
            <NoteBox title="PCE ve EBAU nedir?">
                <p>
                    <strong>PCE (Pruebas de Competencias Específicas)</strong>, yurt dışında lise bitiren öğrenciler için
                    UNED'in UNEDasiss servisinin düzenlediği ders bazlı sınavlardır. Bu sınavlar üniversiteye giriş puanını
                    belirlemede kullanılır.
                </p>
                <p>
                    <strong>EBAU (PAU)</strong>, İspanya'daki üniversiteye giriş sınavıdır. Hangi sınavlara gireceğiniz
                    bölümünüze ve hedef üniversiteye göre değişir.
                </p>
            </NoteBox>
            <div className="spain-page-spacer" />
            <InfoCardGrid cards={foundationPrograms} />
        </AbroadSection>

        <AbroadSection
            id="fiyatlar"
            tone="light"
            eyebrow="Fiyatlar"
            title="Örnek Başlangıç Fiyatları"
            description="Okulların resmi fiyat listelerinden alınmış başlangıç fiyatlarıdır. Size özel teklif şehir, süre, başlangıç tarihi ve konaklama tercihine göre hazırlanır."
        >
            <ComparisonTable caption="İspanya dil okulu ve hazırlık programı başlangıç fiyatları" columns={priceColumns} rows={priceRows} />
            <NoteBox title="Fiyatlar hakkında">
                <p>
                    Fiyatlar Linguaschools 2027 ve Hispania 2026–27 fiyat listelerine göredir ve okul tarafından
                    değiştirilebilir. Hispania üniversiteye hazırlık fiyatları Ekim 2026'da başlayan döneme aittir.
                    Kayıt ücreti, yaz dönemi ek ücreti ve konaklama depozitosu gibi kalemler teklif aşamasında netleşir.
                    Enforex fiyatları teklif üzerine verilir.
                </p>
            </NoteBox>
        </AbroadSection>

        <AbroadSection
            id="vize"
            tone="warm"
            eyebrow="Vize"
            title="İspanya'da Eğitim İçin Vize"
        >
            <InfoCardGrid
                columns="two"
                cards={[
                    {
                        id: "short-stay",
                        meta: "90 güne kadar",
                        title: "Schengen vizesi",
                        text: "Kısa kurslar için Schengen vizesi gerekir. Kurs kaydı ve konaklama belgesi vize dosyasının parçası olur.",
                    },
                    {
                        id: "long-stay",
                        meta: "90 günden uzun",
                        title: "Öğrenci vizesi",
                        text: "Uzun dönem kurslarda (30, 40 ya da 52 hafta) okul kabul mektubunu verir; vize dosyanızın hazırlığında destek oluyoruz.",
                    },
                ]}
            />
            <NoteBox>
                <p>
                    Vize kararını konsolosluk verir. Belge listesi konsolosluğa göre değişebilir; dosyanızı başvuru yapacağınız
                    konsolosluğun güncel listesine göre hazırlıyoruz.
                </p>
            </NoteBox>

            <CtaBand
                title="İspanya'da size uygun programı birlikte planlayalım"
                text="Şehir, süre, başlangıç tarihi ve İspanyolca seviyenizi paylaşın; size özel teklif hazırlayalım."
                primary={{ href: '/basvuru?program=spain_language', label: 'Danışmanlık Başvurusu' }}
                secondary={{ href: whatsappHref, label: 'WhatsApp' }}
            />
        </AbroadSection>

        <FaqSection
            items={spainFaqs}
            eyebrow="Sıkça Sorulan Sorular"
            title="İspanya'da Eğitim Hakkında"
            description="Başlangıç tarihleri, yaş sınırı, üniversite hazırlığı, vize ve fiyatlarla ilgili sık sorulanlar."
        />

        <HomepageContact />
    </>;
}

export default SpainPage;
