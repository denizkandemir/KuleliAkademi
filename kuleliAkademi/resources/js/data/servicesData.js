import { contactConfig } from "../config/contactConfig";

import service1 from "../assets/images/servicesDetailImg2.png";
import service2 from "../assets/images/servicesImg5.png";
import service3 from "../assets/images/servicesImg10.png";
import service4 from "../assets/images/servicesImg4.png";
import service5 from "../assets/images/servicesImg9.png";
import service6 from "../assets/images/servicesImg8.png";

import banner1 from "../assets/images/uniWarsaw2.png";
import banner2 from "../assets/images/polandPicture1.png";
import banner3 from "../assets/images/warsawImg1.png";
import banner4 from "../assets/images/gdansk1.png";
import banner5 from "../assets/images/lublin1.png";
import banner6 from "../assets/images/krakow1.png";

import servicesHomepageImg1 from "../assets/images/servicesImg11.png";

import widgetImg1 from "../assets/images/servicesDetailImg3.png";

const applicationFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSf6EDVF2JpfO0Bzg3qZoMwefMoTFrxWuIsKUxqPZggljQvY_w/viewform?usp=dialog";

export const servicesData = [{
        slug: "okul-basvurusu",
        title: "Polonya Üniversite Başvurusu",
        subtitle: "Polonya’da üniversite okumak isteyen öğrenciler için okul seçimi, bölüm analizi, belge hazırlığı ve başvuru takibini tek bir plan içinde yönetiyoruz.",
        shortDescription: "Polonya üniversite başvurusu için uygun okul ve bölüm seçimi, evrak hazırlığı, başvuru dosyası düzeni ve kabul süreci planlı şekilde takip edilir.",
        bannerImage: banner1,
        detailImage: service1,
        widgetImg: widgetImg1,
        detailObjectPosition: "50% 42%",

        introTitle: "Polonya üniversite başvurusu hizmeti nedir?",
        introParagraphs: [
            "Polonya’da üniversite okumak isteyen öğrenciler için başvuru süreci yalnızca bir online form doldurmaktan ibaret değildir. Öğrencinin lise diploması, not dökümü, dil seviyesi, bütçesi, hedeflediği bölüm ve uzun vadeli kariyer planı birlikte değerlendirilmelidir. Çünkü Polonya üniversitelerinde her programın kabul kriteri, eğitim dili, başvuru takvimi ve belge beklentisi farklı olabilir.",

            "Polonya’daki birçok lisans programı için temel başlangıç noktası lise diploması ve transkripttir. Buna ek olarak İngilizce veya Lehçe eğitim veren programlarda dil yeterliliği istenebilir. Bazı üniversiteler IELTS, TOEFL veya Cambridge gibi uluslararası sınavları kabul ederken, bazı okullar kendi iç dil sınavı ya da hazırlık programı seçeneği sunabilir. Bu nedenle öğrencinin mevcut seviyesine göre doğrudan lisans, hazırlık eğitimi veya alternatif program seçenekleri birlikte değerlendirilmelidir.",

            "Başvuru dosyasında genellikle diploma, transkript, pasaport fotokopisi, biyometrik fotoğraf, niyet mektubu, başvuru formu, dil belgesi ve gerekli durumlarda onaylı çeviri veya apostil/legalizasyon işlemleri yer alabilir. Belgelerin İngilizce veya Lehçe hazırlanması, üniversitenin istediği formatta sunulması ve son başvuru tarihinden önce eksiksiz tamamlanması kabul sürecinin en önemli parçalarından biridir.",

            "Polonya üniversitelerinde akademik yıl çoğunlukla sonbahar döneminde başlar. Başvuru ve kayıt süreçleri genellikle yaz aylarında yoğunlaşır; ancak her üniversitenin kendi takvimi, kontenjan durumu ve son başvuru tarihi farklı olabilir. Bu yüzden öğrencinin başvuruya son dakikada değil, okul seçimi, evrak hazırlığı, kabul mektubu, vize ve konaklama adımlarını da düşünerek daha erken başlaması gerekir.",

            "Bu hizmet kapsamında öğrencinin profiline uygun Polonya üniversiteleri ve bölümleri araştırılır, başvuru şartları karşılaştırılır, belge listesi çıkarılır ve dosya düzenli hale getirilir. Amaç yalnızca bir okula başvuru yapmak değil; öğrencinin akademik geçmişine, bütçesine ve hedeflerine en uygun eğitim yolunu kurmaktır. Böylece öğrenci hangi belgeyi neden hazırladığını, hangi adımı ne zaman tamamlaması gerektiğini ve kabul sonrası hangi sürecin başlayacağını net şekilde görür.",

            "Üniversite kabul kararı her zaman ilgili okulun değerlendirmesine, kontenjanına ve program şartlarına bağlıdır. Danışmanlık hizmeti, öğrencinin başvuru dosyasını mümkün olan en doğru ve eksiksiz şekilde hazırlamasına yardımcı olur; nihai kabul kararı üniversite tarafından verilir.",
        ],

        highlights: [
            "Polonya üniversite ve bölüm analizi",
            "Öğrencinin akademik profiline göre okul seçimi",
            "Başvuru tarihleri ve kabul şartlarının kontrolü",
            "Diploma, transkript ve dil belgesi yönlendirmesi",
            "Niyet mektubu ve başvuru formu desteği",
            "Çeviri, apostil ve belge formatı yönlendirmesi",
        ],

        processSteps: [
            "Öğrencinin akademik geçmişi, hedefleri, bütçesi ve dil seviyesi analiz edilir.",
            "Polonya’da başvuru yapılabilecek uygun üniversite ve bölümler belirlenir.",
            "Programların eğitim dili, kabul şartları, ücretleri ve başvuru tarihleri karşılaştırılır.",
            "Gerekli belgeler listelenir; diploma, transkript, pasaport ve dil belgesi gibi evraklar kontrol edilir.",
            "Başvuru dosyası üniversitenin istediği formata göre düzenlenir ve süreç takip edilir.",
            "Kabul sonrası vize, konaklama ve yerleşim adımları için öğrenci bilgilendirilir.",
        ],

        documentsOrRequirements: [
            "Pasaport veya kimlik bilgileri",
            "Lise diploması veya mezuniyet belgesi",
            "Transkript / not dökümü",
            "İngilizce veya Lehçe dil yeterlilik belgesi",
            "Niyet mektubu",
            "Biyometrik fotoğraf",
            "Başvuru formu bilgileri",
            "Gerekirse onaylı çeviri, apostil veya ek akademik belgeler",
        ],

        sidebarShortInfo: "Polonya üniversite başvurusunda en önemli adım doğru okul ve doğru bölüm seçimidir. Öğrencinin akademik geçmişi, bütçesi, dil seviyesi ve kariyer hedefi birlikte değerlendirilerek başvuru süreci planlanır.",

        ctaTitle: "Polonya üniversite başvurusu için destek alın",
        ctaText: "Polonya’da üniversite okumak istiyorsanız, başvuru formunu doldurarak okul seçimi, bölüm analizi ve belge hazırlığı sürecinizi birlikte planlayabiliriz.",
        ctaButtonText: "Başvuru Formunu Doldur",
        ctaHref: applicationFormUrl,
        whatsappKey: "poland",

        detailPageNote: "Polonya’da üniversite eğitimi almak isteyen öğrenciler için okul seçiminden kabul sürecine kadar planlı yurtdışı eğitim danışmanlığı hizmeti.",
        homepageImage: servicesHomepageImg1,
    },

    {
        slug: "vize-basvurusu",
        title: "Polonya Öğrenci Vizesi",
        subtitle: "Polonya öğrenci vizesi için kabul belgesi, sigorta, finansal evraklar, randevu ve başvuru dosyası adımlarını düzenli şekilde planlıyoruz.",
        shortDescription: "Polonya öğrenci vizesi başvurusu için gerekli belgeler, D tipi vize süreci, randevu hazırlığı ve dosya düzeni kontrollü şekilde takip edilir.",
        bannerImage: banner2,
        detailImage: service2,
        detailObjectPosition: "50% 34%",

        introTitle: "Polonya öğrenci vizesi başvurusu nedir?",
        introParagraphs: [
            "Polonya’da 90 günden uzun süre eğitim alacak öğrenciler için vize süreci, üniversite kabulünden sonra gelen en kritik resmi adımlardan biridir. Uzun süreli eğitim planlayan öğrenciler genellikle D tipi ulusal vize başvurusu yapar. Bu vize, öğrencinin Polonya’da eğitim amacıyla yasal olarak kalabilmesi için hazırlanır ve başvuru dosyasının resmi kurallara uygun şekilde düzenlenmesi gerekir.",

            "Polonya öğrenci vizesi başvurusunda genellikle üniversiteden alınan kabul mektubu, geçerli pasaport, biyometrik fotoğraf, vize başvuru formu, sağlık sigortası, finansal yeterlilik belgeleri ve konaklama kanıtı gibi evraklar istenir. Sağlık sigortasının Polonya’da kalış amacına ve planlanan süreye uygun olması, ayrıca gerekli teminat koşullarını karşılaması önemlidir. Finansal belgelerde ise öğrencinin eğitim ve yaşam masraflarını karşılayabileceğini gösterebilmesi beklenir.",

            "Vize sürecinde en sık yaşanan sorunlar eksik belge, yanlış belge formatı, yetersiz finansal kanıt, hatalı tarih aralıkları, geç alınan randevu veya kabul mektubu ile diğer belgeler arasındaki tutarsızlıklardır. Bu nedenle vize başvurusu yalnızca belgeleri toplamak değil; belgelerin birbirini desteklediği düzenli bir dosya hazırlamak anlamına gelir.",

            "Vize başvuruları genellikle seyahat tarihinden belirli bir süre önce planlanmalıdır. Resmi süreçlerde randevu yoğunluğu, konsolosluk takvimi ve ek belge talepleri değişebileceği için öğrencinin kabul mektubu çıkar çıkmaz vize evraklarına başlaması avantaj sağlar. Bazı başvurular kısa sürede sonuçlansa da resmi değerlendirme süresi yoğunluklara göre uzayabilir.",

            "Bu hizmet kapsamında öğrencinin Polonya öğrenci vizesi için ihtiyaç duyabileceği belgeler listelenir, dosya düzeni kontrol edilir, randevu ve başvuru süreci için yönlendirme yapılır. Kabul belgesi, konaklama evrakı, sigorta, finansal belgeler ve başvuru formu gibi kritik parçaların birbiriyle uyumlu olması hedeflenir.",

            "Vize sonucu her zaman ilgili konsolosluk veya resmi makam tarafından değerlendirilir. Danışmanlık hizmeti, öğrencinin dosyasını eksiksiz ve anlaşılır şekilde hazırlamasına yardımcı olur; nihai karar resmi kurumlara aittir.",
        ],

        highlights: [
            "Polonya D tipi öğrenci vizesi süreci",
            "Vize evrak listesi ve dosya düzeni",
            "Kabul belgesi, konaklama ve sigorta kontrolü",
            "Finansal belgeler için yönlendirme",
            "Randevu ve başvuru süreci planlaması",
            "Eksik veya riskli belge noktalarının belirlenmesi",
        ],

        processSteps: [
            "Öğrencinin kabul durumu ve planlanan eğitim süresi değerlendirilir.",
            "Polonya öğrenci vizesi için gerekli belge listesi hazırlanır.",
            "Pasaport, kabul belgesi, sigorta, finansal evrak ve konaklama belgeleri kontrol edilir.",
            "Başvuru formu, randevu ve dosya sıralaması için yönlendirme yapılır.",
            "Başvuru öncesi dosyada eksik veya tutarsız bilgi olup olmadığı gözden geçirilir.",
            "Süreç tamamlanana kadar öğrenci düzenli olarak bilgilendirilir.",
        ],

        documentsOrRequirements: [
            "Geçerli pasaport",
            "Biyometrik fotoğraf",
            "Polonya üniversite kabul belgesi",
            "Vize başvuru formu",
            "Sağlık sigortası",
            "Finansal yeterlilik belgeleri",
            "Konaklama belgesi veya adres bilgisi",
            "Uçuş ve planlanan kalış bilgileri",
            "Gerekirse ek resmi belgeler",
        ],

        sidebarShortInfo: "Polonya öğrenci vizesi sürecinde belge düzeni, finansal kanıtlar, sigorta ve randevu zamanlaması dikkatle hazırlanmalıdır. Eksik veya tutarsız belgeler süreci zorlaştırabilir.",

        ctaTitle: "Polonya öğrenci vizesi sürecinizi birlikte planlayalım",
        ctaText: "Kabul belgenizi aldıktan sonra Polonya öğrenci vizesi için gerekli evrakları ve başvuru adımlarını birlikte düzenleyebiliriz.",
        ctaButtonText: "Başvuru Formunu Doldur",
        ctaHref: applicationFormUrl,
        whatsappKey: "poland",

        detailPageNote: "Polonya öğrenci vizesi için gerekli resmi adımları, belge hazırlığını ve başvuru dosyası düzenini kolaylaştıran danışmanlık hizmeti.",
        homepageImage: service2,
    },

    {
        slug: "karsilama-ve-yerlesim",
        title: "Karşılama ve Yerleşim",
        subtitle: "Polonya’ya varıştan sonraki ilk ulaşım, konaklama adresine geçiş, temel ihtiyaçlar ve ilk hafta yerleşim sürecini öğrenciler için kolaylaştırıyoruz.",
        shortDescription: "Polonya havalimanı karşılama, şehir içi ulaşım, konaklama noktasına geçiş ve ilk gün yerleşim adımları planlı şekilde organize edilir.",
        bannerImage: banner3,
        detailImage: service3,
        detailObjectPosition: "50% 28%",

        introTitle: "Polonya’da karşılama ve yerleşim desteği nedir?",
        introParagraphs: [
            "Polonya’ya ilk kez gelen öğrenciler için varış günü çoğu zaman en stresli aşamalardan biridir. Öğrenci uçaktan indikten sonra havalimanından şehir merkezine nasıl geçeceğini, konaklama adresine nasıl ulaşacağını, telefon hattı veya internet bağlantısını nasıl çözeceğini ve ilk ihtiyaçlarını nereden karşılayacağını bilemeyebilir. Karşılama ve yerleşim desteği bu ilk karmaşayı azaltmak için hazırlanır.",

            "Bu hizmette öğrencinin uçuş bilgileri, varış saati, havalimanı, şehir ve konaklama adresi önceden değerlendirilir. Varış sonrası ulaşım planı netleştirilir ve öğrencinin güvenli şekilde konaklama noktasına geçmesi hedeflenir. Özellikle Varşova, Krakow, Gdansk, Wroclaw, Poznan veya Lublin gibi öğrenci şehirlerinde havalimanı, tren, otobüs ve şehir içi ulaşım bağlantıları önceden bilinirse ilk gün çok daha rahat ilerler.",

            "Yerleşim sürecinde öğrencinin konaklama noktasına geçtikten sonra temel ihtiyaçlarını hızlıca karşılaması önemlidir. İlk günlerde market, eczane, telefon hattı, toplu taşıma bileti, şehir kartı, banka hesabı ve okul çevresi gibi pratik bilgiler öğrencinin yeni hayatına daha güvenli başlamasını sağlar. Bu yüzden karşılama hizmeti yalnızca transfer değil, aynı zamanda ilk gün oryantasyonu anlamına gelir.",

            "Özellikle ailesinden ilk kez ayrılan veya daha önce yurtdışında yaşamamış öğrenciler için bu süreç psikolojik olarak da önemlidir. Öğrenci yeni bir ülkeye geldiğinde yalnız hissetmek yerine, hangi adımı ne zaman atacağını bilirse adaptasyon süreci çok daha sağlıklı ilerler. Bu da eğitim hayatına daha sakin ve özgüvenli başlamasına yardımcı olur.",

            "Bu hizmet kapsamında öğrencinin varış öncesi planı hazırlanır, ilk ulaşım adımları netleştirilir, konaklama adresine geçiş ve ilk hafta ihtiyaçları hakkında yönlendirme yapılır. Amaç öğrencinin Polonya’daki ilk günlerini plansız, stresli ve belirsiz geçirmek yerine kontrollü bir başlangıç yapmasını sağlamaktır.",
        ],

        highlights: [
            "Polonya’ya varış sonrası ilk yönlendirme",
            "Havalimanı ve şehir içi ulaşım planı",
            "Konaklama adresine geçiş desteği",
            "İlk gün market, telefon hattı ve ulaşım bilgileri",
            "Okul çevresi ve şehir hakkında pratik bilgilendirme",
            "İlk hafta adaptasyon süreci için destek",
        ],

        processSteps: [
            "Öğrencinin uçuş bilgileri, varış saati ve konaklama adresi alınır.",
            "Havalimanından konaklama noktasına ulaşım planı hazırlanır.",
            "İlk gün ihtiyaç duyulabilecek temel noktalar belirlenir.",
            "Şehir içi ulaşım, telefon hattı ve temel alışveriş hakkında bilgilendirme yapılır.",
            "Okul çevresi ve günlük yaşam için pratik yönlendirmeler paylaşılır.",
            "Öğrencinin ilk hafta adaptasyon süreci takip edilir.",
        ],

        documentsOrRequirements: [
            "Uçuş ve varış bilgileri",
            "Konaklama adresi",
            "Pasaport veya kimlik bilgileri",
            "Telefon ve iletişim bilgileri",
            "Okul ve şehir bilgileri",
            "Gerekirse transfer veya kayıt bilgileri",
        ],

        sidebarShortInfo: "Polonya’ya ilk varış sürecinde doğru ulaşım ve yerleşim planı, öğrencinin yeni ülkeye daha güvenli ve rahat başlamasını sağlar.",

        ctaTitle: "Polonya’ya varış ve yerleşim sürecinizi planlayalım",
        ctaText: "İlk günlerinizi daha rahat geçirmek için havalimanı karşılama, ulaşım ve yerleşim sürecinizi birlikte organize edebiliriz.",
        ctaButtonText: "Başvuru Formunu Doldur",
        ctaHref: applicationFormUrl,
        whatsappKey: "poland",

        detailPageNote: "Polonya’ya yeni gelen öğrenciler için havalimanı, ulaşım, konaklama ve ilk hafta yerleşim adımlarını kolaylaştıran destek hizmeti.",
        homepageImage: service3,
    },

    {
        slug: "oturum-izni",
        title: "Polonya Oturum İzni Başvurusu",
        subtitle: "Polonya’da uzun süre eğitim alacak öğrenciler için oturum kartı başvurusu, gerekli belgeler ve resmi süreç adımlarını düzenli şekilde planlıyoruz.",
        shortDescription: "Polonya geçici oturum izni başvurusu için gerekli belgeler, adres kaydı, sigorta ve dosya düzeni kontrollü şekilde hazırlanır.",
        bannerImage: banner4,
        detailImage: service4,
        detailObjectPosition: "50% 38%",

        introTitle: "Polonya oturum izni başvurusu nedir?",
        introParagraphs: [
            "Polonya’ya öğrenci vizesi ile giriş yapan birçok öğrenci, eğitim süresi uzadığında veya uzun dönem yasal kalış hakkını devam ettirmek istediğinde geçici oturum izni başvurusu yapar. Bu süreç genellikle 'karta pobytu' olarak bilinen oturum kartı sistemi üzerinden ilerler ve öğrencinin Polonya’da eğitim amacıyla resmi olarak kalmaya devam etmesini sağlar.",

            "Oturum izni sürecinde öğrencinin aktif öğrenci statüsünü, adres kaydını, sağlık sigortasını ve finansal durumunu gösterebilmesi gerekir. Başvurularda genellikle pasaport, güncel öğrenci belgesi, konaklama kanıtı, banka dökümleri, biyometrik fotoğraf ve resmi başvuru formları gibi belgeler istenir. Belgelerin eksiksiz hazırlanması ve doğru sırada sunulması sürecin daha sağlıklı ilerlemesine yardımcı olur.",

            "Polonya’daki oturum başvuruları şehirden şehre değişebilen yoğunluklara sahip olabilir. Özellikle Varşova gibi büyük şehirlerde randevu süreleri ve işlem yoğunluğu daha uzun sürebilir. Bu nedenle öğrencinin mevcut vize veya yasal kalış süresi bitmeden önce hazırlıklara başlaması önemlidir.",

            "Oturum izni sürecinde öğrencilerin en sık yaşadığı sorunlar eksik belge, adres kayıt problemleri, sigorta eksikliği veya yanlış başvuru zamanlamasıdır. Ayrıca bazı durumlarda ek belge talepleri veya resmi yazışmalar gelebilir. Bu yüzden öğrencinin süreç boyunca düzenli ve takip edilebilir bir dosya sistemi kullanması avantaj sağlar.",

            "Bu hizmet kapsamında öğrencinin mevcut durumu değerlendirilir, gerekli belgeler listelenir ve oturum başvuru dosyası için yönlendirme yapılır. Amaç öğrencinin Polonya’daki eğitim hayatını kesintisiz ve resmi kurallara uygun şekilde sürdürebilmesine yardımcı olmaktır.",

            "Oturum izni değerlendirmesi ilgili resmi kurumlar tarafından yapılır. Danışmanlık hizmeti, öğrencinin belgelerini daha düzenli ve anlaşılır şekilde hazırlamasına destek olur; nihai karar resmi makamlar tarafından verilir.",
        ],

        highlights: [
            "Polonya geçici oturum izni süreci",
            "Karta pobytu başvuru yönlendirmesi",
            "Adres kaydı ve konaklama belgeleri",
            "Sigorta ve finansal belge kontrolü",
            "Başvuru dosyası düzeni",
            "Eksik belge risklerinin azaltılması",
        ],

        processSteps: [
            "Öğrencinin mevcut vize ve eğitim durumu değerlendirilir.",
            "Oturum izni için gerekli belgeler listelenir.",
            "Adres kaydı, sigorta ve öğrenci belgeleri kontrol edilir.",
            "Başvuru formu ve dosya düzeni hazırlanır.",
            "Eksik veya riskli noktalar belirlenir.",
            "Başvuru sonrası süreç hakkında yönlendirme yapılır.",
        ],

        documentsOrRequirements: [
            "Pasaport",
            "Geçerli vize veya giriş bilgileri",
            "Öğrenci belgesi",
            "Konaklama veya adres kaydı",
            "Sağlık sigortası",
            "Banka dökümleri veya finansal belgeler",
            "Biyometrik fotoğraf",
            "Başvuru formu",
        ],

        sidebarShortInfo: "Polonya’da uzun süre eğitim alacak öğrenciler için oturum izni başvurusu resmi süreçlerin en önemli parçalarından biridir.",

        ctaTitle: "Polonya oturum izni sürecinizi planlayalım",
        ctaText: "Oturum kartı başvurusu için gerekli belgeleri ve resmi süreci birlikte düzenleyebiliriz.",
        ctaButtonText: "Başvuru Formunu Doldur",
        ctaHref: applicationFormUrl,
        whatsappKey: "poland",

        detailPageNote: "Polonya’da eğitim hayatını sürdüren öğrenciler için geçici oturum izni ve karta pobytu sürecine yönelik danışmanlık desteği.",
        homepageImage: service4,
    },

    {
        slug: "konaklama-danismanligi",
        title: "Konaklama Danışmanlığı",
        subtitle: "Polonya’da öğrenci yurdu, özel yurt, oda veya daire seçeneklerini bütçe, şehir ve okul konumuna göre birlikte değerlendiriyoruz.",
        shortDescription: "Polonya’da öğrenci konaklama seçenekleri, yurt ve kiralık daire araştırmaları öğrencinin bütçesine ve okuluna göre planlanır.",
        bannerImage: banner5,
        detailImage: service5,
        detailObjectPosition: "50% 34%",

        introTitle: "Polonya’da öğrenci konaklama süreci nasıl işler?",
        introParagraphs: [
            "Polonya’da eğitim alacak öğrenciler için doğru konaklama seçimi, eğitim hayatının en önemli parçalarından biridir. Öğrencinin okula ulaşım süresi, aylık bütçesi, şehir tercihi ve yaşam tarzı konaklama seçiminde doğrudan etkili olur. Bu nedenle yalnızca ucuz veya merkezi seçeneklere bakmak yerine öğrencinin günlük hayatına uygun bir denge kurulmalıdır.",

            "Polonya’da öğrenciler genellikle üniversite yurtları, özel yurtlar, paylaşımlı odalar veya kiralık daire seçeneklerini değerlendirir. Üniversite yurtları çoğu zaman daha ekonomik olabilir; ancak kontenjanları sınırlı olabilir. Özel yurtlar daha modern ve uluslararası öğrenci odaklı seçenekler sunabilirken, maliyetleri daha yüksek olabilir. Paylaşımlı ev veya oda seçenekleri ise şehir ve lokasyona göre değişken fiyatlara sahiptir.",

            "Özellikle Varşova, Krakow, Gdansk ve Wroclaw gibi büyük öğrenci şehirlerinde konaklama talebi dönemsel olarak çok yoğun olabilir. Eğitim yılı başlangıcına yakın dönemlerde uygun oda veya yurt bulmak zorlaşabilir. Bu nedenle öğrencinin kabul aldıktan sonra konaklama araştırmasına erken başlaması önemlidir.",

            "Konaklama sürecinde öğrencilerin dikkat etmesi gereken en önemli konular kira sözleşmesi, depozito koşulları, ulaşım bağlantıları, internet ve faturaların dahil olup olmadığı gibi detaylardır. Bazı öğrenciler yalnız yaşamayı tercih ederken bazıları paylaşımlı ev ortamında yaşam maliyetini düşürmek isteyebilir. Bu yüzden tek bir doğru seçenek yoktur; öğrencinin önceliklerine göre değerlendirme yapılmalıdır.",

            "Bu hizmet kapsamında öğrencinin bütçesi, okul konumu, şehir tercihi ve yaşam beklentileri değerlendirilir; uygun konaklama seçenekleri hakkında yönlendirme yapılır. Amaç öğrencinin Polonya’daki eğitim hayatına güvenli, ulaşılabilir ve sürdürülebilir bir yaşam düzeniyle başlamasına yardımcı olmaktır.",
        ],

        highlights: [
            "Öğrenci yurdu ve özel yurt seçenekleri",
            "Oda ve kiralık daire araştırmaları",
            "Bütçe ve lokasyon analizi",
            "Okula ulaşım süresi değerlendirmesi",
            "Kira ve depozito süreçleri hakkında yönlendirme",
            "Şehir bazlı öğrenci yaşam bilgileri",
        ],

        processSteps: [
            "Öğrencinin bütçesi ve şehir tercihi değerlendirilir.",
            "Okul konumuna uygun konaklama bölgeleri belirlenir.",
            "Yurt, oda veya daire seçenekleri karşılaştırılır.",
            "Kira, depozito ve temel yaşam giderleri değerlendirilir.",
            "Ulaşım ve günlük yaşam açısından uygunluk kontrol edilir.",
            "Öğrenciye karar süreci için yönlendirme yapılır.",
        ],

        documentsOrRequirements: [
            "Şehir ve üniversite bilgisi",
            "Yaklaşık aylık bütçe",
            "Planlanan kalış süresi",
            "Konaklama tercihleri",
            "Varsa mevcut kabul veya kayıt belgeleri",
        ],

        sidebarShortInfo: "Polonya’da doğru konaklama seçimi öğrencinin hem bütçesini hem de günlük yaşam konforunu doğrudan etkiler.",

        ctaTitle: "Polonya’da konaklama seçeneklerini birlikte değerlendirelim",
        ctaText: "Şehrinize, okulunuza ve bütçenize uygun öğrenci konaklama seçeneklerini birlikte planlayabiliriz.",
        ctaButtonText: "Başvuru Formunu Doldur",
        ctaHref: applicationFormUrl,
        whatsappKey: "poland",

        detailPageNote: "Polonya’da öğrenci yurdu, oda ve kiralık daire seçenekleri için şehir ve bütçe odaklı konaklama danışmanlığı.",
        homepageImage: service5,
    },

    {
        slug: "sehir-ve-ogrenci-hayati-rehberligi",
        title: "Şehir ve Öğrenci Hayatı Rehberliği",
        subtitle: "Polonya’da öğrenci yaşamı, ulaşım, günlük giderler, sosyal hayat ve şehir düzeni hakkında pratik bilgilerle adaptasyon sürecini kolaylaştırıyoruz.",
        shortDescription: "Polonya’da öğrenci hayatı, yaşam maliyetleri, ulaşım sistemi ve şehir düzeni hakkında rehberlik sağlanır.",
        bannerImage: banner6,
        detailImage: service6,
        detailObjectPosition: "50% 36%",

        introTitle: "Polonya’da öğrenci hayatı nasıldır?",
        introParagraphs: [
            "Polonya, son yıllarda uluslararası öğrenciler için Avrupa’daki en popüler eğitim ülkelerinden biri haline gelmiştir. Özellikle yaşam maliyetlerinin birçok Batı Avrupa ülkesine göre daha ulaşılabilir olması, güvenli şehir yapısı ve öğrenci odaklı yaşam düzeni nedeniyle birçok öğrenci tarafından tercih edilmektedir.",

            "Varşova, Krakow, Gdansk, Poznan, Wroclaw ve Lublin gibi şehirlerin her biri farklı bir öğrenci deneyimi sunar. Varşova daha büyük ve hızlı bir şehir yapısına sahipken, Krakow daha tarihi ve öğrenci odaklı bir atmosfere sahip olabilir. Gdansk sahil yaşamı ve uluslararası yapısıyla dikkat çekerken, Lublin daha sakin ve ekonomik bir öğrenci yaşamı sunabilir.",

            "Polonya’da öğrenci yaşamında en önemli konular genellikle ulaşım, aylık yaşam giderleri, market fiyatları, telefon hattı, banka hesabı, sağlık sistemi ve sosyal adaptasyon süreçleridir. Özellikle ilk aylarda öğrencinin şehir düzenini öğrenmesi günlük hayatı büyük ölçüde kolaylaştırır.",

            "Birçok şehirde öğrenciler için indirimli toplu taşıma kartları bulunur. Ayrıca üniversitelerin çevresinde öğrenci yoğunluğu yüksek olduğu için kafe, kütüphane, çalışma alanı ve sosyal etkinlik seçenekleri oldukça yaygındır. Bunun yanında öğrencinin bütçe yönetimi yapabilmesi ve aylık giderlerini önceden planlaması da önemlidir.",

            "Bu hizmet kapsamında öğrencinin gideceği şehir hakkında temel yaşam bilgileri paylaşılır, günlük hayat düzeni ve ilk dönem adaptasyonu için yönlendirme yapılır. Amaç öğrencinin yalnızca akademik değil, sosyal ve günlük yaşam açısından da Polonya’ya daha rahat uyum sağlayabilmesidir.",
        ],

        highlights: [
            "Polonya şehirleri hakkında öğrenci odaklı bilgiler",
            "Ulaşım sistemi ve öğrenci kartları",
            "Aylık yaşam giderleri hakkında yönlendirme",
            "Telefon hattı ve banka hesabı süreçleri",
            "Şehir içi günlük yaşam rehberliği",
            "İlk dönem adaptasyon desteği",
        ],

        processSteps: [
            "Öğrencinin gideceği şehir belirlenir.",
            "Şehirdeki temel yaşam düzeni hakkında bilgilendirme yapılır.",
            "Ulaşım, market ve günlük ihtiyaç noktaları paylaşılır.",
            "Öğrenci bütçesi için temel gider planı değerlendirilir.",
            "Telefon hattı, banka hesabı ve temel sistemler anlatılır.",
            "İlk dönem adaptasyonu için pratik öneriler sunulur.",
        ],

        documentsOrRequirements: [
            "Şehir ve üniversite bilgisi",
            "Yaklaşık yaşam bütçesi",
            "Konaklama bilgileri",
            "Varış tarihi",
            "Öğrencinin temel ihtiyaç ve beklentileri",
        ],

        sidebarShortInfo: "Polonya’daki öğrenci hayatına hızlı adapte olmak için şehir düzenini ve günlük yaşam sistemini önceden tanımak büyük avantaj sağlar.",

        ctaTitle: "Polonya’daki öğrenci hayatını birlikte planlayalım",
        ctaText: "Gideceğiniz şehirde ulaşım, yaşam maliyetleri ve günlük hayat düzeni hakkında detaylı bilgi alabilirsiniz.",
        ctaButtonText: "Başvuru Formunu Doldur",
        ctaHref: applicationFormUrl,
        whatsappKey: "poland",

        detailPageNote: "Polonya’da eğitim hayatına başlayacak öğrenciler için şehir yaşamı, ulaşım ve günlük düzen hakkında rehberlik hizmeti.",
        homepageImage: service6,
    },
];

export const homepageServices = servicesData.map(({ slug, title, shortDescription, homepageImage, homepageButtonText, detailObjectPosition }) => ({
    slug,
    title,
    description: shortDescription,
    image: homepageImage,
    buttonText: homepageButtonText || "Detayları Gör",
    objectPosition: detailObjectPosition,
    href: `/hizmetler/${slug}`,
}));

export const getServiceBySlug = (slug) =>
    servicesData.find((service) => service.slug === slug);

export const getServiceContact = (service) => {
    const whatsappKey = service ? service.whatsappKey || "poland" : "poland";
    const whatsappContact = contactConfig.whatsapp[whatsappKey] || contactConfig.whatsapp.poland;

    return {
        phone: contactConfig.phone,
        email: contactConfig.email,
        whatsapp: contactConfig.whatsapp,
        ...whatsappContact,
    };
};