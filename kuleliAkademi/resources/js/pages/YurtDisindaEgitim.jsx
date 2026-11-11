import React from "react";
import SEOHead from '../components/SEOHead/SEOHead';
import { generateBreadcrumbSchema, generateCanonical, generateFaqSchema, getPageMetadata } from '../utils/seoHelpers';
import Banner from "../components/Banner/Banner";
import DestinationPicker from "../components/DestinationPicker/DestinationPicker";
import HowWeWork from "../components/HowWeWork/HowWeWork";
import FaqSection from "../components/faqSection/faqSection";
import HomepageContact from "../components/homepageContact/HomepageContact";
import { AbroadSection, ComparisonTable, CtaBand, NoteBox } from "../components/AbroadSections/AbroadSections";
import { contactConfig } from "../config/contactConfig";

const bannerImg = "/storage/images/headerImg7.webp";
const PAGE_PATH = '/yurtdışıeğitim';

const comparisonColumns = ["Ülke ve program", "Kimler için", "Eğitim dili", "Süre", "Vize (genel bilgi)"];

const comparisonRows = [
    [
        "Polonya · Üniversite",
        "Lise son sınıf ya da mezunlar; lisans, yüksek lisans ve hazırlık adayları",
        "İngilizce programlar",
        "Bölüme göre değişir; 3 yılda lisans imkânı, hazırlık 1 yıl",
        "Ulusal öğrenci vizesi (D tipi); Polonya'da oturum izni",
    ],
    [
        "İspanya · Dil okulu",
        "Gençler ve yetişkinler (alt yaş okula göre değişir)",
        "İspanyolca",
        "1 haftadan 52 haftaya kadar",
        "90 güne kadar Schengen vizesi; daha uzun kurslarda öğrenci vizesi",
    ],
    [
        "İspanya · Üniversiteye hazırlık",
        "İspanya'da lisans ya da yüksek lisans hedefleyenler",
        "İspanyolca",
        "Yaklaşık bir akademik yıl",
        "Öğrenci vizesi",
    ],
    [
        "Malta · İngilizce dil okulu",
        "Yakında",
        "İngilizce",
        "Programlar açıldığında duyurulacak",
        "90 günü aşan programlarda ulusal (D) vize ve oturum izni",
    ],
];

const generalFaqs = [
    {
        id: 1,
        question: "Hangi ülke ve program bana uygun?",
        answer: "Bu karar hedefinize, bütçenize, başlangıç tarihinize ve dil seviyenize göre değişir. Üniversite diplomasını hedefliyorsanız Polonya'daki İngilizce programlar ya da İspanya'da üniversiteye hazırlık yılı öne çıkar; dil öğrenmek ya da dil seviyenizi yükseltmek istiyorsanız İspanya'daki dil okulları uygun olabilir. İlk görüşmede seçenekleri birlikte karşılaştırıyoruz.",
    },
    {
        id: 2,
        question: "Yurt dışında eğitim için vize gerekir mi?",
        answer: "Türk vatandaşları için genellikle evet. Polonya'da üniversite için ulusal öğrenci vizesi (D tipi) gerekir. İspanya'da 90 güne kadar süren kurslar için Schengen vizesi, daha uzun programlar için öğrenci vizesi gerekir. Malta'da 90 günü aşan programlar için ulusal (D) vize ve oturum izni gerekir. Belge listesini konsolosluğun güncel duyurusuna göre birlikte hazırlıyoruz.",
    },
    {
        id: 3,
        question: "Kabul ya da vize garantisi veriyor musunuz?",
        answer: "Hayır. Kabul kararını üniversite ya da okul, vize kararını konsolosluk verir. Bizim işimiz doğru program seçimi, eksiksiz bir dosya ve süreci zamanında takip etmektir.",
    },
    {
        id: 4,
        question: "YKS puanı gerekiyor mu?",
        answer: "Polonya'da başvuru YKS ile değil; lise diploması, transkript ve dil yeterliliğiyle yapılır, şartlar okula göre değişir. İspanya'da üniversiteye girişte yabancı lise mezunlarının dosyası UNEDasiss tarafından değerlendirilir ve birçok bölümde PCE sınavları kullanılır.",
    },
    {
        id: 5,
        question: "Dil seviyem yetersizse ne yapabilirim?",
        answer: "Polonya'da birçok üniversite bir yıllık İngilizce hazırlık programı sunuyor; bazı okullar kendi sınavını ya da online mülakatını yapıyor. İspanya'da dil okulunda başlayıp üniversiteye hazırlık yılına geçmek mümkün. Seviyenize göre yolu birlikte planlıyoruz.",
    },
    {
        id: 6,
        question: "Ücretler nasıl belirleniyor?",
        answer: "Okul ücretleri okula, bölüme, şehre ve süreye göre değişir. İspanya'daki dil okullarında öğrenci okulun resmi fiyatını öder; Kuleli ayrıca hizmet bedeli almaz. Polonya danışmanlık hizmetimizin kapsamını ve koşullarını ilk görüşmede paylaşıyor, süreci sözleşmeyle yürütüyoruz.",
    },
];

// Yurt dışı eğitim merkez sayfası: ülke / program seçimi, karşılaştırma ve genel süreç.
const YurtDisindaEgitim = () => {
    const pageSeo = getPageMetadata(PAGE_PATH);
    const schema = [
        generateBreadcrumbSchema([
            { label: 'Ana Sayfa', url: '/' },
            { label: 'Yurt Dışında Eğitim', url: PAGE_PATH },
        ]),
        generateFaqSchema(generalFaqs),
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
            text="Yurt Dışında Eğitim"
            subtitle="Polonya, İspanya ve yakında Malta"
            img={bannerImg}
            responsiveImg={bannerImg}
            location="Yurt Dışında Eğitim"
            alt="Avrupa'da tarihi bir şehir meydanı"
        />

        <AbroadSection
            id="yurt-disi-giris"
            tone="light"
            eyebrow="Kuleli International"
            title="Yurt Dışında Üniversite ve Dil Eğitimi"
            description="Yurt dışı programlarımızı Kuleli International adıyla yürütüyoruz. Polonya'da üniversite, İspanya'da dil okulu ve üniversiteye hazırlık programlarında; program seçiminden başvuruya, vize dosyasından varış ve yerleşime kadar yanınızdayız. Malta'daki İngilizce dil okulu programlarımız yakında açılıyor."
        />

        <DestinationPicker
            eyebrow="Ülkeler ve Programlar"
            title="Size Uygun Programı Seçin"
            description="Her kartta programın kime uygun olduğunu ve öne çıkan noktalarını bulabilirsiniz. Ayrıntılar ilgili ülke sayfasında."
            titleId="hub-destination-title"
        />

        <AbroadSection
            id="karsilastirma"
            tone="warm"
            eyebrow="Karşılaştırma"
            title="Programlar Bir Bakışta"
            description="Tablo genel bilgi verir. Şartlar okula, programa ve kişisel duruma göre değişir; kesin bilgiyi başvuru öncesinde birlikte kontrol ediyoruz."
        >
            <ComparisonTable caption="Yurt dışı programlarının karşılaştırması" columns={comparisonColumns} rows={comparisonRows} />
            <NoteBox title="Vize hakkında">
                <p>
                    Vize kararını konsolosluk verir. Burada yer alan bilgiler genel kurallardır; güncel belge listesi
                    başvuru yapılacak konsolosluğun duyurusuna göre hazırlanır.
                </p>
            </NoteBox>
        </AbroadSection>

        <HowWeWork titleId="hub-how-we-work-title" />

        <FaqSection
            items={generalFaqs}
            eyebrow="Sıkça Sorulan Sorular"
            title="Yurt Dışında Eğitim Hakkında"
            description="Ülke seçimi, vize, dil seviyesi ve ücretlerle ilgili en çok sorulan sorular."
        />

        <AbroadSection tone="light">
            <CtaBand
                title="Hangi programın size uygun olduğunu birlikte bulalım"
                text="Hedefinizi, bütçenizi ve başlangıç tarihinizi paylaşın; danışmanımız size dönsün."
                primary={{ href: '/basvuru', label: 'Danışmanlık Başvurusu' }}
                secondary={{
                    href: `${contactConfig.whatsapp.poland.url}?text=${encodeURIComponent(contactConfig.whatsapp.poland.message)}`,
                    label: 'WhatsApp',
                }}
            />
        </AbroadSection>

        <HomepageContact />
    </>;
}

export default YurtDisindaEgitim;
