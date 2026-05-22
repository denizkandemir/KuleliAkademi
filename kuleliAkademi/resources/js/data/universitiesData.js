import uniPolitechnic from '../assets/images/uniPolitechnic1.jpg';
import uniWroclaw from '../assets/images/uniWroclaw1.webp';
import uniGdansk from '../assets/images/uniGdansk1.jpg';
import uniKrakow from '../assets/images/uniKrakow1.png';
import uniPoznan from '../assets/images/uniPoznan1.png';

//uni Warsaw
import uniWarsawBannerImg from '../assets/images/uniWarsaw2.png';
import uniWarsaw from '../assets/images/uniWarsaw3.jpg';
import uniWarsaw2 from '../assets/images/uniWarsawImg2.jpg';
import uniWarsaw3 from '../assets/images/uniWarsawImg.jpg';
import uniWarsaw4 from '../assets/images/uniWarsawImg3.jpg';
import uniWarsaw5 from '../assets/images/uniWarsawImg5.jpg';

//Uni Krakow
import uniJagiellonian1 from '../assets/images/uniJagiellonian1.jpg';
// import uniJagiellonianBannerImg from '../assets/images/uniJagiellonianBanner.jpg';
import uniJagiellonian2 from '../assets/images/uniJagiellonian2.webp';
import uniJagiellonian3 from '../assets/images/uniJagiellonian3.jpg';
import uniJagiellonian4 from '../assets/images/uniJagiellonian4.jpg';
import uniJagiellonian5 from '../assets/images/uniJagiellonian6.jpg';

//Uni politechnic Warsaw
import uniPolitechnic1 from '../assets/images/politechicWarsaw1.png';
import uniPolitechnic2 from '../assets/images/politechicWarsaw2.jpg';
import uniPolitechnicBannerImg from '../assets/images/politechicWarsaw3.jpg';
import uniPolitechnic3 from '../assets/images/politechicWarsaw4.jpg';
import uniPolitechnic4 from '../assets/images/politechicWarsaw5.jpg';

//Uni Agh Krakow
import aghUni1 from '../assets/images/aghUni1.jpg';
import aghUni2 from '../assets/images/aghUni2.jpg';
import aghUni3 from '../assets/images/aghUni3.jpg';
import aghUni4 from '../assets/images/aghUni4.jpg';
import aghUni5 from '../assets/images/aghUni5.jpg';

//uni Wroclaw
import uniWroclaw2 from '../assets/images/uniWroclaw3.jpg';
import uniWroclaw3 from '../assets/images/uniWroclaw8.jpg';
import uniWroclaw4 from '../assets/images/uniWroclaw5.webp';
import uniWroclaw5 from '../assets/images/uniWroclaw6.jpg';
import uniWroclaw6 from '../assets/images/uniWroclaw7.webp';

const universityCardImages = {
    'university-of-warsaw': uniWarsaw,
    'warsaw-university-of-technology': uniPolitechnic,
    'wroclaw-university-of-science-and-technology': uniWroclaw,
    'university-of-wroclaw': uniWroclaw,
    'jagiellonian-university': uniKrakow,
    'adam-mickiewicz-university': uniPoznan,
    'university-of-gdansk': uniGdansk,
    'agh-university-of-krakow': aghUni4,
};

const universityDetailImages = {
    'university-of-warsaw': [uniWarsawBannerImg, uniWarsaw4, uniWarsaw3, uniWarsaw2, uniWarsaw5],
    'jagiellonian-university': [uniJagiellonian1, uniJagiellonian2, uniJagiellonian3, uniJagiellonian4, uniJagiellonian5],
    'adam-mickiewicz-university': [uniPoznan, uniWarsaw, uniWroclaw, uniGdansk, uniKrakow],
    'warsaw-university-of-technology': [uniPolitechnic1, uniPolitechnic2, uniPolitechnicBannerImg, uniPolitechnic3, uniPolitechnic4],
    'wroclaw-university-of-science-and-technology': [uniWroclaw, uniWarsaw, uniPolitechnic, uniGdansk, uniKrakow],
    'university-of-wroclaw': [uniWroclaw6, uniWroclaw2, uniWroclaw3, uniWroclaw5, uniWroclaw4],
    'university-of-gdansk': [uniGdansk, uniWarsaw, uniWroclaw, uniPolitechnic, uniKrakow],
    'agh-university-of-krakow': [aghUni2, aghUni4, aghUni3, aghUni1, aghUni5],
};

const getCardImage = (university) => {
    if (university && typeof university.image === 'string' && university.image.trim()) {
        return university.image;
    }

    if (university && typeof university.id === 'string' && universityCardImages[university.id]) {
        return universityCardImages[university.id];
    }

    if (university && Array.isArray(university.gallery) && typeof university.gallery[0] === 'string' && university.gallery[0].trim()) {
        return university.gallery[0];
    }

    return uniWarsaw;
};

const getCardDescription = (university) => {
    const sourceDescription =
        Array.isArray(university.longDescriptions) ? university.longDescriptions[0] : "Üniversite bilgisi bulunmamaktadır.";

    if (typeof sourceDescription !== 'string') {
        return '';
    }

    const normalized = sourceDescription.trim().replace(/\s+/g, ' ');

    if (!normalized) {
        return '';
    }

    const sentenceMatch = normalized.match(/^.*?[.!?](?:["')\]]+)?(?=\s|$)/u);

    return (sentenceMatch ? sentenceMatch[0] : normalized).trim();
};

const normalizeUniversityForCard = (university) => ({
    id: university.id,
    image: getCardImage(university),
    name: university.name,
    city: university.city,
    badge: university.badge || university.type || university.region,
    description: getCardDescription(university),
    tags: university.tags,
    cta: university.cta || 'Detayları İncele',
    slug: university.slug || university.id,
});

const buildProgramCards = (university) => {
    const popularPrograms = Array.isArray(university.popular_programs) ? university.popular_programs : [];
    const faculties = Array.isArray(university.faculties) ? university.faculties : [];

    const popularProgramCards = popularPrograms.map((program) => ({
        title: program,
        level: 'Popüler Program',
        desc: `${university.name} bünyesinde öne çıkan programlardan biridir.`,
    }));

    const facultyCards = faculties.map((faculty) => ({
        title: faculty,
        level: 'Fakülte',
        desc: `${university.name} içinde ilgili akademik alanda eğitim ve araştırma sunar.`,
    }));

    return [...popularProgramCards, ...facultyCards].slice(0, 8);
};

const normalizeUniversityForDetail = (university) => {
    const galleryImages = (universityDetailImages[university.id] || [])
        .filter((image) => typeof image === 'string' && image.trim());

    return {
        ...university,
        localName: university.name_local || university.localName || university.name,
        bannerImg: university.banner_image || university.bannerImg || getCardImage(university),
        founded: university.established || university.founded,
        students: university.student_count || university.students,
        ranking: university.qs_ranking || university.ranking,
        language: university.language_of_instruction || university.language,
        country: university.country || 'Poland',
        image: getCardImage(university),
        galleryImages: galleryImages.length ? galleryImages : [getCardImage(university)],
        programs: buildProgramCards(university),
    };
};

const collectUniversities = (nodes) => {
    if (!Array.isArray(nodes)) {
        return [];
    }

    return nodes.flatMap((node) => {
        if (Array.isArray(node)) {
            return collectUniversities(node);
        }

        if (node && Array.isArray(node.universities)) {
            return collectUniversities(node.universities);
        }

        if (node && typeof node === 'object' && node.id) {
            return [node];
        }

        return [];
    });
};

export const universitiesData = [{
    "metadata": {
        "generation_date": "2026-05-18T12:27:40Z",
        "source_priority": [
            "Resmi üniversite siteleri",
            "Polonya Eğitim Bakanlığı / YÖK",
            "Erasmus+ resmi sayfaları",
            "QS/Times Üniversite sıralamaları",
            "YÖK ve diğer resmi Türk kaynaklar"
        ],
        "notes": "Her üniversite için resmi kaynaklardan (üniversite siteleri, YÖK, QS, Wikipedia vb.) derlenen bilgiler kullanıldı. Öğrenci sayıları yaklaşık değerlerdir. Belli alanlar için bilgi bulunamadığında null olarak bırakıldı ve notes kısmında belirtildi."
    },
    "universities": [{
            "id": "university-of-warsaw",
            "name": "University of Warsaw",
            "name_local": "Uniwersytet Warszawski",
            "city": "Warsaw",
            "region": "Mazowieckie",
            "website": "https://www.uw.edu.pl",
            "established": 1816,
            "student_count": 48600,
            "qs_ranking": "271",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": null,
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "American Studies Center",
                "Faculty of Biology",
                "Faculty of Chemistry",
                "Faculty of Economic Sciences",
                "Faculty of Geology",
                "Faculty of Management",
                "Faculty of Physics",
                "Faculty of Psychology",
                "Institute of International Relations",
                "Institute of Philosophy"
            ],
            "popular_programs": [
                "Psychology",
                "Computer Science",
                "Physics",
                "Biology",
                "Economics",
                "Finance, Investments and Accounting",
                "International Relations",
            ],
            "english_taught_programs": {
                "bachelor": [
                    "American Studies",
                    "Archeology",
                    "Finance, Investments and Accounting",
                    "International Relations",
                    "Philosophy",
                    "Psychology",
                    "Physics",
                    "Biology",
                    "Economics",
                ],
                "master": [
                    "American Studies",
                    "Archeology",
                    "Chemistry",
                    "Economics",
                    "Environmental Management",
                    "European Administration",
                    "Finance, Investments and Accounting",
                    "Geology",
                    "International Business",
                    "International Relations",
                    "Political Science",
                    "Security Studies",
                    "Teaching English to Young Learners"
                ],
                "long_cycle_master": [
                    "Psychology"
                ],
                "doctoral": [
                    "Biology",
                    "Economics",
                    "Language and Literature Studies",
                    "Management",
                    "Physics",
                    "Physics and Astronomy"
                ],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "University of Warsaw, Polonya’nın en görünür kamu araştırma üniversitelerinden biridir ve başkentte bulunması sayesinde diplomasi, ekonomi, siyaset bilimi, psikoloji ve disiplinlerarası sosyal bilimlerde çok güçlü bir uluslararası profil sunar. İngilizce eğitim seçenekleri yalnızca birkaç sembolik bölümle sınırlı değildir; lisans, yüksek lisans ve doktora düzeyinde sosyal bilimlerden doğa bilimlerine kadar uzanan geniş bir katalog vardır.",
                "Kurumu özellikle uluslararası öğrenci açısından cazip yapan nokta, İngilizce programların fakülte bazında ciddi akademik derinliğe sahip olmasıdır. American Studies, International Relations, Economics, Finance ve Psychology gibi programlar doğrudan küresel kariyer hedefi olan öğrenciler için uygundur; aynı zamanda doktora seviyesinde de İngilizce araştırma ekosistemi mevcuttur.",
                'University of Warsaw, öğrencilerine yalnızca güçlü bir akademik diploma değil; başkent merkezli bir kariyer çevresi, uluslararası araştırma kültürü ve Avrupa kurumlarına yakın bir gelişim alanı sunar. Varşova’daki şirketler, elçilikler, araştırma merkezleri ve kültürel kurumlarla çevrili olmak, özellikle ekonomi, siyaset bilimi, psikoloji, finans ve uluslararası ilişkiler öğrencileri için okul dışındaki öğrenme deneyimini de güçlendirir.',
            ],
            "notes": "İngilizce program listesi study.gov.pl kaydı üzerinden derlendi. Üniversite genel ücret tablosu program ve statüye göre değiştiği için fee alanları standart aralık olarak verilmedi; yayımdan önce sources içindeki admissions ve fee sayfaları ayrıca kontrol edilmelidir.",
            "gallery": [

            ],
            "banner_image": uniWarsawBannerImg,
            "sources": [
                "https://study.gov.pl/university/university-warsaw",
                "https://en.uw.edu.pl",
                "https://www.topuniversities.com/universities/university-warsaw"
            ]
        },
        {
            "id": "jagiellonian-university",
            "name": "Jagiellonian University",
            "name_local": "Uniwersytet Jagielloński w Krakowie",
            "city": "Kraków",
            "region": "Małopolskie",
            "website": "https://www.uj.edu.pl",
            "established": 1364,
            "student_count": 35330,
            "qs_ranking": "303",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": null,
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Chemistry",
                "Faculty of Biology",
                "Faculty of International and Political Studies",
                "Faculty of Law and Administration",
                "Faculty of Medicine",
                "Faculty of Pharmacy",
                "Faculty of Geography and Geology",
                "Centre for European Studies",
                "Faculty of Biochemistry, Biophysics and Biotechnology"
            ],
            "popular_programs": [
                "Medical Doctor Program in English",
                "Doctor of Dental Surgery",
                "European Studies",
                "Global and Development Studies",
                "International Relations and Area Studies",
                "Molecular Biotechnology"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Earth Sciences in a Changing World",
                    "European Studies",
                    "Global and Development Studies",
                    "International Relations and Area Studies"
                ],
                "master": [
                    "Advanced Spectroscopy in Chemistry",
                    "Business and Finance Management",
                    "Drug Discovery and Development",
                    "Environmental Protection and Management",
                    "Erasmus Mundus International Master in Central and East European, Russian and Eurasian Studies",
                    "Erasmus Mundus Joint Master Degree in European Politics and Society",
                    "European Studies",
                    "Governance, Leadership and Democracy Studies / EU Studies",
                    "Intellectual Property and New Technologies",
                    "International Masters in Economy, State and Society",
                    "International Relations and Public Diplomacy",
                    "International Security and Development",
                    "Molecular Biotechnology"
                ],
                "long_cycle_master": [
                    "Doctor of Dental Surgery Program in English",
                    "Medical Doctor Program in English"
                ],
                "doctoral": [],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "Jagiellonian University, Kraków’daki köklü akademik geleneği ile hem tarihî prestij hem de çağdaş araştırma altyapısını bir araya getiren bir kurumdur. İngilizce programları özellikle Avrupa çalışmaları, uluslararası ilişkiler, hukuk-teknoloji kesişimi, yaşam bilimleri ve tıp alanlarında yoğunlaşır.",
                "Bu üniversiteyi ajans açısından güçlü yapan nokta, yalnızca akademik marka değeri değil, aynı zamanda lisans, yüksek lisans ve long-cycle tıp-diş hekimliği seçeneklerini aynı kurum içinde sunabilmesidir. Avrupa odaklı sosyal bilimler ile sağlık bilimlerini aynı katalogda taşıdığı için hem genel lisans öğrencisine hem de yüksek bütçeli tıp adayına aynı anda hitap eder.",
                'Jagiellonian University, tarihî prestijiyle modern akademik üretimi birleştiren özel bir üniversite deneyimi sunar. Kraków’un kültürel dokusu, güçlü öğrenci atmosferi ve Avrupa merkezli akademik bağlantıları sayesinde öğrenciler hem köklü bir kurumda eğitim alır hem de uluslararası çevre edinme, araştırma projelerine katılma ve mezuniyet sonrası Avrupa’da kariyer planlama açısından avantaj kazanır.',
            ],
            "sources": [
                "https://study.gov.pl/university/jagiellonian-university-krakow",
                "https://welcome.uj.edu.pl/admissions",
                "https://www.topuniversities.com/universities/jagiellonian-university"
            ]
        },
        {
            "id": "warsaw-university-of-technology",
            "name": "Warsaw University of Technology",
            "name_local": "Politechnika Warszawska",
            "city": "Warsaw",
            "region": "Mazowieckie",
            "website": "https://www.pw.edu.pl",
            "established": 1915,
            "student_count": 22990,
            "qs_ranking": "487",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "students.cwm@pw.edu.pl",
            "contact_phone": null,
            "address": null,
            "banner_image": uniPolitechnicBannerImg,
            "coordinates": null,
            "faculties": [
                "Faculty of Architecture",
                "Faculty of Civil Engineering",
                "Faculty of Chemical and Process Engineering",
                "Faculty of Electrical Engineering",
                "Faculty of Electronics and Information Technology",
                "Faculty of Materials Science and Engineering",
                "Faculty of Physics",
                "Faculty of Power and Aeronautical Engineering",
                "Faculty of Transport"
            ],
            "popular_programs": [
                "Computer Science",
                "Architecture",
                "Aerospace Engineering and Astronautics",
                "Civil Engineering",
                "Electrical Engineering",
                "Data Engineering"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Aerospace Engineering and Astronautics",
                    "Architecture",
                    "Civil Engineering",
                    "Computer Science",
                    "Electrical Engineering",
                    "Environmental Engineering",
                    "Mechatronic Systems and Materials",
                    "Mechatronics",
                    "Power Engineering"
                ],
                "master": [
                    "Aerospace Engineering and Astronautics",
                    "Architecture for Society of Knowledge",
                    "Automatic Control and Robotics",
                    "Biotechnology",
                    "Chemical Engineering",
                    "Civil Engineering",
                    "Computer Science",
                    "Data Engineering",
                    "Electrical Engineering",
                    "Environmental Engineering",
                    "Materials Engineering",
                    "Mechanical Engineering",
                    "Navigation",
                    "Nuclear Power Engineering",
                    "Physics",
                    "Power Engineering",
                    "Production Engineering",
                    "Spatial Development",
                    "Transport"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": [
                    "Business Management / MBA-type Non-degree Programmes",
                    "Linguistics / Preparatory Language Non-degree Programmes"
                ]
            },
            longDescriptions: [
                "Warsaw University of Technology, Polonya’daki teknik üniversiteler arasında en bilinen kurumlardan biridir ve başkent bağlantısı sayesinde endüstri, kamu, girişimcilik ve araştırma ekosistemiyle güçlü ilişki kurar. İngilizce programları mimarlık, bilgisayar, enerji, ulaştırma, malzeme ve havacılık gibi uygulamalı alanlarda çok geniştir.",
                "Özellikle mühendislik odaklı öğrenci getirmek isteyen danışmanlık ekipleri için bu kurum oldukça stratejiktir; çünkü hem bachelor hem de master düzeyinde İngilizce seçenekleri vardır ve programlar doğrudan ilgili fakülte laboratuvarlarıyla bağlantılıdır. Teknik profilin yanında Data Engineering ve bazı business-oriented non-degree seçenekleri de ek pazarlama imkânı yaratır.",
                "Warsaw University of Technology, mühendislik öğrencileri için teorik eğitimi uygulamalı proje kültürüyle birleştiren güçlü bir teknik ekosistem sunar. Başkentte yer alması sayesinde teknoloji firmaları, araştırma merkezleri, startup çevresi ve sanayi bağlantılarıyla iç içe bir eğitim deneyimi sağlar. Bu yapı özellikle bilgisayar bilimi, veri mühendisliği, mimarlık, enerji ve havacılık gibi alanlarda kariyer hedefleyen öğrenciler için değerli bir avantaj oluşturur.",
            ],
            "notes": "Program isimlerinin bir kısmı aynı alanın farklı fakültelerdeki İngilizce versiyonlarıdır; katalog tasarımında istersen bunları tek başlık altında gruplayabilirsin. Merkez uluslararası ofis e-postası study.gov kaydındaki contact alanı üzerinden alınmıştır.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/warsaw-university-technology",
                "https://eng.pw.edu.pl",
                "https://www.topuniversities.com/universities/warsaw-university-technology"
            ]
        },
        {
            "id": "agh-university-of-krakow",
            "name": "AGH University of Krakow",
            "name_local": "Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie",
            "city": "Kraków",
            "region": "Małopolskie",
            "website": "https://www.agh.edu.pl/en/",
            "established": 1919,
            "student_count": 34190,
            "qs_ranking": "801-850",
            "type": "public",
            "banner_image": aghUni1,
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "international.students@agh.edu.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Computer Science, Electronics and Telecommunications",
                "Faculty of Electrical Engineering, Automatics, Computer Science and Biomedical Engineering",
                "Faculty of Energy and Fuels",
                "Faculty of Geology, Geophysics and Environmental Protection",
                "Faculty of Management",
                "Faculty of Materials Science and Ceramics",
                "Faculty of Mechanical Engineering and Robotics",
                "Faculty of Physics and Applied Computer Science"
            ],
            "popular_programs": [
                "Computer Science",
                "Electronics and Telecommunications",
                "Mechanical Engineering",
                "International Management",
                "Applied Geology",
                "Mechatronic Engineering"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Computer Science",
                    "Electronics and Telecommunications",
                    "Mechanical Engineering",
                    "Mechatronic Engineering",
                    "Computer Physics"
                ],
                "master": [
                    "Space Technologies",
                    "Chemical Technology",
                    "Electrical Engineering",
                    "Energy Engineering",
                    "Applied Geology: Economic Geology",
                    "Applied Geology: Earth and Extraterrestrial Materials",
                    "Applied Geophysics",
                    "International Management",
                    "Materials Engineering",
                    "Mechatronic Design",
                    "Mining and Engineering Geology",
                    "Virtotechnology"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": [
                    "Drilling Engineering Non-degree Programme"
                ]
            },
            longDescriptions: [
                "AGH University of Krakow, mühendislik, enerji, jeoloji, malzeme ve ileri teknoloji odaklı eğitimde Polonya’nın en büyük ve en tanınmış kurumlarından biridir. Kraków’daki güçlü teknoloji ve araştırma ekosistemiyle birleştiğinde özellikle teknik alanlarda uluslararası öğrenci için yüksek marka etkisi yaratır.",
                "Ajans perspektifinden AGH’nin en büyük avantajı, klasik bilgisayar ve elektronik bölümlerinin yanında uygulamalı jeoloji, enerji, mekatronik, malzeme ve space-related uzmanlıklara kadar uzanan sıra dışı İngilizce portföyüdür. Bu sayede sadece standart engineering talebine değil, daha niş ve yüksek katma değerli aday profillerine de hitap etmek mümkündür.",
                "AGH University of Krakow, mühendislik ve teknoloji alanlarında güçlü araştırma altyapısı, modern laboratuvarları ve endüstri odaklı eğitim yaklaşımıyla öne çıkar. Kraków’un akademik ve teknolojik atmosferiyle birleştiğinde öğrencilere yalnızca ders odaklı değil; proje, araştırma, staj ve sektör bağlantılarıyla desteklenen kapsamlı bir gelişim ortamı sunar.",
            ],
            "notes": "Bazı master programları fakülte içi uzmanlık adıyla listelenmiştir; sitede gösterirken istersen ana alan ve specialization biçiminde iki seviyeli yapı kurabilirsin.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/agh-university-science-and-technology",
                "https://www.agh.edu.pl/en/",
                "https://www.topuniversities.com/universities/agh-university-krakow"
            ]
        },
        {
            "id": "university-of-wroclaw",
            "name": "University of Wrocław",
            "name_local": "Uniwersytet Wrocławski",
            "city": "Wrocław",
            "banner_image": uniWroclaw6,
            "region": "Dolnośląskie",
            "website": "https://uwr.edu.pl/en/",
            "established": 1702,
            "student_count": 22670,
            "qs_ranking": "801-850",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "international@uwr.edu.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Biological Sciences",
                "Faculty of Biotechnology",
                "Faculty of Chemistry",
                "Faculty of Law, Administration and Economics",
                "Faculty of Physics and Astronomy",
                "Faculty of Social Sciences",
                "Faculty of Social Communication and Media Studies",
                "Faculty of Languages, Literatures and Cultures",
                "Faculty of Earth Science and Environmental Management"
            ],
            "popular_programs": [
                "Biotechnology",
                "Business Administration",
                "Criminal Justice",
                "International Relations",
                "Law",
                "Global Communication"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Biology",
                    "Biotechnology",
                    "Business Administration",
                    "Chemistry",
                    "Criminal Justice",
                    "Data Analytics, Big Data and Coding",
                    "Euroculture",
                    "International Relations",
                    "Language and Literature Studies",
                    "Law",
                    "Philosophy",
                    "Political Science"
                ],
                "master": [
                    "Administration",
                    "Biology",
                    "Biotechnology",
                    "Chemistry",
                    "Economics, Management and Finance",
                    "Global Communication",
                    "Intercultural Communication",
                    "International Relations",
                    "Law",
                    "Multimedia Communication",
                    "Philosophy",
                    "Physics",
                    "Physics and Astronomy",
                    "Public Relations, Marketing and New Media",
                    "Sociology",
                    "Tourism and Recreation"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "University of Wrocław, beşeri bilimler ile sosyal bilimleri güçlü doğa bilimleri altyapısıyla birleştiren büyük bir kamu üniversitesidir. Wrocław’ın yüksek yaşam kalitesi ve uluslararası öğrenci dostu şehir profili, bu kurumu yalnızca akademik değil yaşam deneyimi açısından da güçlü bir seçenek haline getirir.",
                "İngilizce katalogta hukuk, işletme, uluslararası ilişkiler, medya, felsefe ve biyoteknoloji gibi birbirinden farklı alanların aynı çatı altında bulunması, bu üniversiteyi danışmanlık şirketleri için geniş hedef kitleye uygun yapar. Teknik olmayan ama küresel istihdam odaklı sosyal bilim programları açısından özellikle öne çıkar.",
                "University of Wrocław, sosyal bilimler, hukuk, medya, biyoteknoloji ve uluslararası ilişkiler gibi alanlarda geniş bir akademik çeşitliliği sunarak öğrencilerin farklı kariyer yollarını keşfetmesini sağlar. Wrocław’un canlı öğrenci hayatı, kültürel çeşitliliği ve Avrupa içindeki güçlü bağlantıları sayesinde öğrenciler akademik gelişimlerini sosyal ve profesyonel deneyimlerle destekleyebilir.",
            ],
            "notes": "Law, International Relations ve Media odaklı programlar özellikle görünürdür. Program ücretleri ve intake tarihleri fakülte bazlı ilerleyebildiği için sources alanındaki resmi sayfalar ayrıca kontrol edilmelidir.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/university-wroclaw",
                "https://international.uni.wroc.pl/en",
                "https://www.topuniversities.com/universities/university-wroclaw"
            ]
        },
        {
            "id": "wroclaw-university-of-science-and-technology",
            "name": "Wrocław University of Science and Technology",
            "name_local": "Politechnika Wrocławska",
            "city": "Wrocław",
            "region": "Dolnośląskie",
            "website": "https://pwr.edu.pl/en/",
            "established": 1945,
            "student_count": 27550,
            "qs_ranking": "851-900",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "admission@pwr.edu.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Architecture",
                "Faculty of Chemistry",
                "Faculty of Civil Engineering",
                "Faculty of Computer Science and Management",
                "Faculty of Electronics",
                "Faculty of Electrical Engineering",
                "Faculty of Mechanical Engineering",
                "Faculty of Mechanical and Power Engineering",
                "Faculty of Fundamental Problems of Technology"
            ],
            "popular_programs": [
                "Applied Computer Science",
                "Computer Science and Technology",
                "Civil Engineering",
                "Architecture",
                "Renewable Energy Systems",
                "Big Data Analytics"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Computer Science - Electronics and Computer Engineering",
                    "Applied Computer Science",
                    "Management",
                    "Mechanical Engineering"
                ],
                "master": [
                    "Applied Mathematics",
                    "Architecture",
                    "Architecture and Urban Planning",
                    "Automotive Engineering",
                    "Bioinformatics",
                    "Advanced Chemical Engineering and Nanotechnology",
                    "Technology of Fine Chemicals",
                    "Medicinal Chemistry",
                    "Civil Engineering",
                    "Computer Aided Mechanical and Power Engineering",
                    "Advanced Informatics and Control",
                    "Electronics, Photonics, Microsystems",
                    "Computer Science and Technology",
                    "Computer Security and Cryptography",
                    "Big Data Analytics",
                    "Internet Engineering",
                    "Embedded Robotics",
                    "Renewable Energy Systems",
                    "Control in Electrical Power Engineering",
                    "Advanced Applied Electronics",
                    "Geotechnical and Environmental Engineering",
                    "Environmental Quality Management",
                    "Geomatic for Mineral Resource Management",
                    "Business Intelligence",
                    "Production Management",
                    "Advanced Nano- and Bio-Materials MONABIPHOT",
                    "Mining Engineering",
                    "Nuclear Power Engineering",
                    "Refrigeration and Cryogenics",
                    "Renewable Sources of Energy"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "Wrocław University of Science and Technology, İngilizce master portföyünün genişliği bakımından Polonya’daki en zengin teknik kurumlardan biridir. Özellikle ileri mühendislik uzmanlıkları, enerji, veri, güvenlik, malzeme ve çevre alanlarında çok detaylı specialization seçenekleri sunar.",
                "Bu kurumun siteye eklenmesi özellikle yüksek lisans odaklı lead toplama açısından çok değerlidir; çünkü pek çok program doğrudan sektör uzmanlığına bağlanan isimler taşır. Öğrenciler klasik engineering derecelerinin yanında daha niş alanları da net biçimde görebildikleri için dönüşüm oranı artabilir.",
                "Wrocław University of Science and Technology, teknik eğitimde güçlü uzmanlık alanları, geniş İngilizce yüksek lisans seçenekleri ve ileri mühendislik odaklı araştırma ortamıyla dikkat çeker. Öğrenciler burada yalnızca temel mühendislik bilgisi edinmez; veri analitiği, enerji sistemleri, robotik, siber güvenlik, çevre teknolojileri ve ileri malzeme alanlarında sektöre yakın bir uzmanlık geliştirme imkânı bulur.",
            ],
            "notes": "WUST tarafında programların önemli kısmı master-specialization formatındadır. Sitede bunu ana bölüm + uzmanlık etiketiyle göstermek kullanıcı deneyimini ciddi biçimde iyileştirir.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/wroclaw-university-science-and-technology",
                "https://admission.pwr.edu.pl",
                "https://www.topuniversities.com/universities/wroclaw-university-science-technology-wroclaw-tech"
            ]
        },
        {
            "id": "gdansk-university-of-technology",
            "name": "Gdańsk University of Technology",
            "name_local": "Politechnika Gdańska",
            "city": "Gdańsk",
            "region": "Pomorskie",
            "website": "https://pg.edu.pl",
            "established": 1904,
            "student_count": 23600,
            "qs_ranking": "801-850",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "study@pg.edu.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Architecture",
                "Faculty of Chemistry",
                "Faculty of Civil and Environmental Engineering",
                "Faculty of Electronics, Telecommunications and Informatics",
                "Faculty of Management and Economics",
                "Faculty of Applied Physics and Mathematics",
                "Faculty of Mechanical Engineering and Ship Technology"
            ],
            "popular_programs": [
                "Architecture",
                "Data Engineering",
                "Management",
                "Informatics",
                "Mechanical Engineering",
                "Engineering and Management of Space Systems"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Architecture",
                    "Data Engineering",
                    "Green Technologies and Monitoring",
                    "Management",
                    "Mechanical Engineering",
                    "Power Engineering"
                ],
                "master": [
                    "Architecture",
                    "Automation, Cybernetics and Robotics",
                    "Civil Engineering",
                    "Economic Analytics",
                    "Electronics and Telecommunications",
                    "Environmental Engineering",
                    "Green Technologies and Monitoring",
                    "Informatics",
                    "Management",
                    "Mechanical Engineering",
                    "Nanotechnology",
                    "Ocean Engineering",
                    "Engineering and Management of Space Systems",
                    "Spatial Development"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": [
                    "MBA Management and Economics"
                ]
            },
            longDescriptions: [
                "Gdańsk University of Technology, kuzey Polonya’nın en güçlü teknik üniversitelerinden biridir ve mühendislik ile yönetim alanlarını dengeli biçimde sunar. Denizcilik ekonomisi, liman kenti dinamiği ve teknoloji ekosistemi sayesinde özellikle mekanik, veri, enerji ve built environment programlarında güçlü bir iş piyasası bağlantısı sağlar.",
                "Üniversitenin İngilizce portföyü sadece klasik mühendisliklerle sınırlı değildir; Economic Analytics, Management ve Space Systems gibi alanlar teknik arka planı business veya yeni teknoloji ile birleştirmek isteyen öğrenciler için dikkat çekicidir. Gdańsk’ın uluslararası şehir profili de pazarlamayı kolaylaştırır.",
                "Gdańsk University of Technology, Baltık bölgesinin teknoloji, denizcilik ve mühendislik potansiyelini modern bir kampüs deneyimiyle birleştirir. Veri mühendisliği, mekanik, mimarlık, yönetim ve uzay sistemleri gibi alanlarda sunduğu programlar, öğrencilerin hem teknik hem de stratejik düşünme becerilerini geliştirmesine yardımcı olur. Gdańsk’ın uluslararası liman şehri kimliği de mezuniyet sonrası kariyer perspektifini güçlendirir.",
            ],
            "notes": "Architecture ve Spatial Development gibi design-urbanism programları ile Data Engineering gibi teknik programların aynı kurumda bulunması, farklı öğrenci segmentlerine tek sayfadan hitap etme fırsatı verir.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/gdansk-university-technology",
                "https://pg.edu.pl/en/study-at-gut",
                "https://www.topuniversities.com/universities/gdansk-university-technology"
            ]
        },
        {
            "id": "university-of-gdansk",
            "name": "University of Gdańsk",
            "name_local": "Uniwersytet Gdański",
            "city": "Gdańsk",
            "region": "Pomorskie",
            "website": "https://ug.edu.pl",
            "established": 1970,
            "student_count": 22810,
            "qs_ranking": "851-900",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "fso@ug.edu.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Chemistry",
                "Faculty of Economics",
                "Faculty of Languages",
                "Faculty of Law and Administration",
                "Faculty of Management"
            ],
            "popular_programs": [
                "Finance and Accounting",
                "International Economic Relations",
                "Criminal Justice",
                "Intercultural Communication",
                "Chemistry"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Criminal Justice",
                    "Finance and Accounting",
                    "Intercultural Communication",
                    "International Economic Relations"
                ],
                "master": [
                    "Chemistry",
                    "Finance and Accounting",
                    "International Economic Relations"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "University of Gdańsk, Pomeranya bölgesinin büyük kamu üniversitesidir ve sosyal bilimler, ekonomi, hukuk, dil çalışmaları ve kimya gibi alanlarda dengeli bir İngilizce katalog sunar. Bölgesel iş çevresi ve uluslararası liman-ekonomi bağlantıları nedeniyle özellikle business ve economics odaklı programlarda güçlü bir şehir avantajına sahiptir.",
                "Buradaki İngilizce program sayısı bazı büyük kamu üniversitelerine göre daha sınırlı olsa da yönetimi kolay, niş ve net bir portföy sunması ajans açısından avantajdır. Finance and Accounting, International Economic Relations ve Criminal Justice gibi programlar açık pazarlama diliyle hedef adaylara kolay anlatılabilir.",
                "University of Gdańsk, ekonomi, hukuk, uluslararası ilişkiler, iletişim ve kimya gibi alanları sahil şehri atmosferiyle birleştiren dengeli bir üniversite deneyimi sunar. Gdańsk’ın uluslararası ticaret, liman ekonomisi ve kültürel çeşitlilik yapısı, özellikle business, finance, criminal justice ve intercultural communication gibi programlarda okuyan öğrenciler için ders dışı gözlem ve kariyer fırsatlarını artırır.",
            ],
            "notes": "UG tarafında İngilizce katalog nispeten kompakt olduğu için site üzerinde program bazlı landing page mantığı çok verimli çalışır. Fee ve admission ayrıntıları fakülte sayfalarında teyit edilmelidir.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/university-gdansk",
                "https://en.ug.edu.pl/admissions",
                "https://www.topuniversities.com/universities/university-gdansk"
            ]
        },

        {
            "id": "adam-mickiewicz-university-poznan",
            "name": "Adam Mickiewicz University, Poznań",
            "name_local": "Uniwersytet im. Adama Mickiewicza w Poznaniu",
            "city": "Poznań",
            "region": "Wielkopolskie",
            "website": "https://amu.edu.pl/en",
            "established": 1919,
            "student_count": 35200,
            "qs_ranking": "741-750",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": null,
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Anthropology and Cultural Studies",
                "Faculty of Biology",
                "Faculty of Chemistry",
                "Faculty of English",
                "Faculty of Modern Languages and Literatures",
                "Faculty of Physics",
                "Faculty of Political Science and Journalism"
            ],
            "popular_programs": [
                "International Relations",
                "Intercultural Communication",
                "Chemistry",
                "Biotechnology",
                "Journalism and Social Communication",
                "Public Management"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Balkan Studies",
                    "Chemistry",
                    "Intercultural Communication",
                    "International Relations",
                    "Linguistics",
                    "Literary Studies"
                ],
                "master": [
                    "Biotechnology",
                    "Chemistry",
                    "Cultural Studies",
                    "Digital Entrepreneurship",
                    "Environmental Protection",
                    "Ethnology",
                    "International Relations",
                    "Journalism and Social Communication",
                    "Mediterranean Studies",
                    "Physics",
                    "Public Management"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "Adam Mickiewicz University, Poznań’ın ana kapsamlı üniversitesidir ve özellikle beşeri bilimler, sosyal bilimler, diller ve seçili fen alanlarında güçlüdür. İngilizce katalogta kültür, iletişim, uluslararası ilişkiler ve dil alanları belirgin şekilde öne çıkar; bu da teknik olmayan ama uluslararası kariyer hedefleyen öğrenciler için çok kullanışlıdır.",
                "AMU’nun önemli avantajı, tamamen business-school tipi bir yapı olmadan yine de uluslararası eğitim dilini güçlü şekilde kullanan çok yönlü bir üniversite olmasıdır. Bu sayede daha akademik, kültürel ve araştırma odaklı profiller için de güvenilir bir yerleştirme seçeneği üretir.",
                "Adam Mickiewicz University, dil, kültür, uluslararası ilişkiler, iletişim, fen bilimleri ve sosyal bilimler alanlarında güçlü akademik çeşitlilik sunar. Poznań’ın öğrenci dostu, düzenli ve erişilebilir şehir yapısı sayesinde öğrenciler hem daha dengeli bir yaşam maliyetiyle eğitim alabilir hem de Avrupa merkezli akademik ve kültürel ağlara dahil olabilir.",
            ],
            "notes": "AMU tarafında program temasının humanities ve social sciences ağırlıklı olduğu vurgulanmalıdır. Chemistry, Biotechnology ve Physics gibi fen programları ek değer yaratır ama pazarlama ana omurgası genellikle humanities/social sciences olur.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/adam-mickiewicz-university-poznan",
                "https://amu.edu.pl/en/admissions",
                "https://www.topuniversities.com/universities/adam-mickiewicz-university-poznan"
            ]
        },
        {
            "id": "poznan-university-of-technology",
            "name": "Poznań University of Technology",
            "name_local": "Politechnika Poznańska",
            "city": "Poznań",
            "region": "Wielkopolskie",
            "website": "https://put.poznan.pl/en",
            "established": 1919,
            "student_count": 16000,
            "qs_ranking": "1001-1200",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "study@put.poznan.pl",
            "contact_phone": null,
            "address": "ul. Jacka Rychlewskiego 1, 61-131 Poznań, Poland",
            "coordinates": null,
            "faculties": [
                "Faculty of Architecture",
                "Faculty of Automatic Control, Robotics and Electrical Engineering",
                "Faculty of Chemical Technology",
                "Faculty of Civil and Transport Engineering",
                "Faculty of Computing and Telecommunications",
                "Faculty of Engineering Management",
                "Faculty of Mechanical Engineering"
            ],
            "popular_programs": [
                "Artificial Intelligence",
                "Automatic Control and Robotics",
                "Architecture",
                "Chemical Technology",
                "Engineering Management",
                "Mechanical and Automotive Engineering"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Architecture",
                    "Artificial Intelligence",
                    "Automatic Control and Robotics",
                    "Biomedical Engineering",
                    "Chemical Technology",
                    "Engineering Management",
                    "Mechanical Engineering",
                    "Microelectronics and Digital Communication",
                    "Quantum Technologies",
                    "Sustainable Building Engineering"
                ],
                "master": [
                    "Architecture",
                    "Artificial Intelligence",
                    "Automatic Control and Robotics",
                    "Biomedical Engineering",
                    "Chemical Technology",
                    "Civil Engineering",
                    "Computing",
                    "Electrical Engineering",
                    "Electronics and Telecommunications",
                    "Engineering Management",
                    "Green Energy",
                    "Information Technology for Smart and Sustainable Mobility",
                    "Logistics",
                    "Mechanical and Automotive Engineering",
                    "Transport"
                ],
                "long_cycle_master": [],
                "doctoral": [
                    "Doctoral School"
                ],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "Poznań University of Technology, İngilizce programlarını çok net ve kullanıcı dostu bir katalog halinde sunan teknik üniversitelerden biridir. Lisans ve yüksek lisans düzeyindeki program isimleri doğrudan kariyer yönünü anlattığı için lead toplama ve program eşleştirme süreçlerinde danışmanlık ekiplerine ciddi kolaylık sağlar.",
                "Özellikle Artificial Intelligence, Quantum Technologies, Microelectronics and Digital Communication gibi yeni nesil başlıklar bu üniversiteyi pazarlamada güncel ve güçlü gösterir. Aynı zamanda klasik Architecture, Civil, Chemical ve Mechanical rota arayan öğrenciler için de güvenilir ve dengeli bir mühendislik portföyü sunar.",
                "Poznań University of Technology, yapay zekâ, robotik, biyomedikal mühendislik, mimarlık, mikroelektronik ve sürdürülebilir yapı teknolojileri gibi güncel alanlarda güçlü teknik eğitim sunar. Üniversitenin uygulamalı proje kültürü, öğrencilerin mezuniyet öncesinde gerçek mühendislik problemleriyle çalışmasını ve Avrupa iş piyasasına daha hazır bir profil geliştirmesini destekler.",
            ],
            "notes": "PUT için İngilizce programlar resmî üniversite B.Sc. ve M.Sc. katalog sayfalarından derlenmiştir. Adres ve admission e-postası doğrudan üniversitenin English site footer/contact alanından alınmıştır.",
            "gallery": [],
            "sources": [
                "https://put.poznan.pl/en/courses",
                "https://put.poznan.pl/en/first-cycle-bsc-programmes",
                "https://put.poznan.pl/en/second-cycle-msc-programmes",
                "https://www.topuniversities.com/universities/poznan-university-technology"
            ]
        },
        {
            "id": "poznan-university-of-economics-and-business",
            "name": "Poznań University of Economics and Business",
            "name_local": "Uniwersytet Ekonomiczny w Poznaniu",
            "city": "Poznań",
            "region": "Wielkopolskie",
            "website": "https://ue.poznan.pl/en/",
            "established": 1926,
            "student_count": 10900,
            "qs_ranking": null,
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "bachelor@ue.poznan.pl / master@ue.poznan.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Center for Studies in English",
                "Faculty of Economics",
                "Faculty of Management",
                "Faculty of Finance and Accounting"
            ],
            "popular_programs": [
                "International Business",
                "Finance and Accounting",
                "Management",
                "Economics and IT Applications",
                "Product Manager"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Finance and Accounting",
                    "International Business",
                    "Management",
                    "Product Manager"
                ],
                "master": [
                    "Economics and IT Applications",
                    "International Business",
                    "Management"
                ],
                "long_cycle_master": [],
                "doctoral": [
                    "Economy"
                ],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "Poznań University of Economics and Business, business-school mantığında yapılandırılmış İngilizce programları sayesinde danışmanlık şirketleri için en kolay konumlandırılan kamu üniversitelerinden biridir. Program isimleri doğrudan uluslararası iş piyasasına seslenir ve öğrencinin ne okuyacağını çok net anlatır.",
                "International Business, Finance and Accounting, Management ve Economics and IT Applications gibi başlıklar özellikle Avrupa’da business eğitimi arayan öğrenciler için güçlü bir kombinasyon sunar. Teknik olmayan ama istihdam odaklı bir katalog isteyen kullanıcılar için sitede mutlaka görünmesi gereken kurumlardan biridir.",
                "Poznań University of Economics and Business, finans, muhasebe, uluslararası işletme, yönetim ve ekonomi odaklı İngilizce programlarıyla kariyer hedefi net olan öğrenciler için güçlü bir business school alternatifi sunar. Poznań’ın ticari yapısı ve üniversitenin sektör odaklı eğitim yaklaşımı, öğrencilerin analitik düşünme, finansal okuryazarlık ve uluslararası iş dünyasına uyum becerilerini geliştirmesine katkı sağlar.",
            ],
            "notes": "PUEB için QS tarafında açık bir genel WUR sonucu yerine daha çok konu bazlı görünürlük dikkat çektiğinden `qs_ranking` null bırakıldı. Programların çoğu Center for Studies in English üzerinden yürütüldüğü için başvuru iletişimi bu merkeze göre kurgulanmalıdır.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/poznan-university-economics-and-business",
                "https://ue.poznan.pl/en/",
                "https://www.topuniversities.com/universities/poznan-university-economics"
            ]
        },
        {
            "id": "nicolaus-copernicus-university",
            "name": "Nicolaus Copernicus University in Toruń",
            "name_local": "Uniwersytet Mikołaja Kopernika w Toruniu",
            "city": "Toruń",
            "region": "Kujawsko-Pomorskie",
            "website": "https://www.umk.pl",
            "established": 1945,
            "student_count": 19700,
            "qs_ranking": "1001-1200",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "studywithncu@umk.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Biological and Veterinary Sciences",
                "Faculty of Chemistry",
                "Faculty of Economic Sciences and Management",
                "Faculty of Humanities",
                "Faculty of Medicine",
                "Faculty of Pharmacy",
                "Faculty of Philosophy and Social Sciences",
                "Faculty of Physics, Astronomy and Informatics"
            ],
            "popular_programs": [
                "Medicine",
                "Pharmaceutical Science",
                "Management",
                "English Studies",
                "Economics",
                "Physics and Astronomy"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Chemistry",
                    "English Studies",
                    "Management",
                    "Nursing"
                ],
                "master": [
                    "Biological Sciences",
                    "Cognitive Science",
                    "Economics",
                    "English Studies",
                    "Finance and Accounting",
                    "International Relations",
                    "Physics and Astronomy"
                ],
                "long_cycle_master": [
                    "Medicine",
                    "Pharmaceutical Science",
                    "Physiotherapy"
                ],
                "doctoral": [],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "Nicolaus Copernicus University, klasik kapsamlı üniversite modelini tıp ve sağlık bilimleriyle birleştiren güçlü bir kurumdur. Toruń ve Bydgoszcz eksenli yapısı sayesinde hem sosyal bilimler ve humanities hem de medicine/pharmacy rotaları tek kurum adı altında sunulabilir.",
                "Bu üniversitenin ajans açısından en önemli avantajı, yalnızca tek bir öğrenci profilini hedeflememesi; aynı katalogda management, economics, English studies gibi alanlarla medicine ve pharmacy gibi yüksek talep gören alanları da bulundurmasıdır. Böylece farklı bütçe ve kariyer hedefindeki öğrenciler için verimli bir çapraz satış alanı oluşturur.",
                "Nicolaus Copernicus University, Toruń’un tarihî ve sakin öğrenci atmosferini geniş akademik program çeşitliliğiyle birleştirir. Tıp, eczacılık, yönetim, ekonomi, İngiliz dili ve fen bilimleri gibi farklı alanlarda eğitim sunması, öğrencilerin hem mesleki hem akademik hedeflerine uygun bir yol seçmesini kolaylaştırır. Daha sakin ama köklü bir devlet üniversitesi arayan adaylar için güçlü bir seçenektir.",
            ],
            "notes": "NCU’da sağlık programları ile ana kampüsteki diğer İngilizce programlar farklı akademik birimler üzerinden ilerler. Medicine ve Pharmacy adayları için ayrı sayfa/funnel kullanılması tavsiye edilir.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/nicolaus-copernicus-university",
                "https://www.umk.pl/en/",
                "https://www.topuniversities.com/universities/nicolaus-copernicus-university"
            ]
        },
        {
            "id": "university-of-lodz",
            "name": "University of Łódź",
            "name_local": "Uniwersytet Łódzki",
            "city": "Łódź",
            "region": "Łódzkie",
            "website": "https://www.uni.lodz.pl/en",
            "established": 1945,
            "student_count": 24000,
            "qs_ranking": "951-1000",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "admission@uni.lodz.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Economics and Sociology",
                "Faculty of Law and Administration",
                "Faculty of Management",
                "Faculty of Mathematics and Computer Science",
                "Faculty of Philology",
                "Faculty of International and Political Studies"
            ],
            "popular_programs": [
                "Business Management",
                "Computer Science",
                "Economics",
                "International and Political Studies",
                "Digital Marketing",
                "Global Law and Governance"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Business Management",
                    "Computer Science",
                    "Digital Marketing",
                    "Economics",
                    "Global Law and Governance",
                    "International and Political Studies",
                    "International Marketing",
                    "Management and Finance"
                ],
                "master": [
                    "Business and Digital Analytics",
                    "Business Management",
                    "Computer Science",
                    "Cultural Studies",
                    "Economics",
                    "English Studies",
                    "International and Political Studies"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": [
                    "Preparatory Course in Polish"
                ]
            },
            longDescriptions: [
                "University of Łódź, uluslararası tam zamanlı derece öğrencisi çeken büyük kamu üniversitelerinden biridir ve İngilizce lisans/yüksek lisans seçenekleri dengeli biçimde dağılmıştır. İşletme ve ekonomi ile bilgisayar, hukuk ve uluslararası ilişkileri aynı portföy içinde toplaması, kurumu geniş hedef kitle için uygun hale getirir.",
                "Özellikle iş odaklı bachelor programları ile analytics ve management ağırlıklı master seçenekleri, ajans sitelerinde kolay filtrelenebilen ve anlaşılır bir katalog yapısı oluşturur. Łódź şehrinin maliyet açısından görece erişilebilir olması da fiyat-duyarlı öğrenciler için önemli bir avantajdır.",
                "University of Łódź, işletme, ekonomi, bilgisayar bilimi, dijital pazarlama, hukuk ve uluslararası ilişkiler gibi alanlarda geniş İngilizce program seçenekleri sunarak farklı öğrenci profilleriıne hitap eder. Łódź’un dönüşen şehir yapısı, yaratıcı endüstrileri ve daha erişilebilir yaşam maliyeti, öğrencilerin hem akademik hem de sosyal açıdan dengeli bir deneyim yaşamasını sağlar.",
            ],
            "notes": "University of Łódź için program ücretleri bazı program sayfalarında açıkça gösterilse de üniversite geneli standart tek aralık bulunmadığı için fee alanı genel ifade olarak bırakıldı. Candidate Zone mutlaka ek kontrol kaynağı olarak kullanılmalıdır.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/university-lodz",
                "https://www.uni.lodz.pl/en/candidate-zone",
                "https://www.topuniversities.com/universities/university-lodz"
            ]
        },
        {
            "id": "lodz-university-of-technology",
            "name": "Lodz University of Technology",
            "name_local": "Politechnika Łódzka",
            "city": "Łódź",
            "region": "Łódzkie",
            "website": "https://p.lodz.pl/en",
            "established": 1945,
            "student_count": 12440,
            "qs_ranking": "1001-1200",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "foreignstudents@info.p.lodz.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "International Faculty of Engineering",
                "Faculty of Biotechnology and Food Sciences",
                "Faculty of Chemistry",
                "Faculty of Civil Engineering, Architecture and Environmental Engineering",
                "Faculty of Electrical, Electronic, Computer and Control Engineering",
                "Faculty of Mechanical Engineering",
                "Faculty of Material Technologies and Textile Design",
                "Faculty of Organization and Management"
            ],
            "popular_programs": [
                "Computer Science",
                "Biomedical Engineering",
                "Biotechnology",
                "Architecture",
                "Mechanical Engineering",
                "Textile Studies"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Advanced Materials and Nanotechnology",
                    "Architecture",
                    "Biomedical Engineering",
                    "Biotechnology",
                    "Business Information Science",
                    "Business Management",
                    "Computer Science",
                    "Mathematics",
                    "Mechanical Engineering",
                    "Science and Technology",
                    "Telecommunications",
                    "Textile Studies"
                ],
                "master": [
                    "Architecture",
                    "Art and Design",
                    "Biotechnology",
                    "Business Management",
                    "Electronics",
                    "Energy Technologies",
                    "Information Science",
                    "Management and Production Engineering",
                    "Mechanical Engineering",
                    "Nanotechnology",
                    "Textile Studies"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "Lodz University of Technology, International Faculty of Engineering yapısı sayesinde İngilizce teknik eğitim sunumunu oldukça görünür kılan bir üniversitedir. Mühendislik katalogu klasik alanlarla sınırlı kalmaz; textiles, art and design ve business-information gibi disiplinlerarası bölümlerle çeşitlenir.",
                "Uluslararası öğrenci açısından bu kurumun en önemli gücü, bachelor seviyesinde çok sayıda İngilizce teknik rota sunmasıdır. Özellikle computer science, biomedical engineering, biotechnology ve mechanical engineering gibi popüler alanların yanında textile studies gibi daha özgün niş seçeneklerin bulunması, pazarlama açısından fark yaratır.",
                "Lodz University of Technology, teknik eğitimi uluslararası fakülte yapısı ve İngilizce program çeşitliliğiyle destekleyen güçlü bir mühendislik üniversitesidir. Bilgisayar bilimi, biyoteknoloji, biyomedikal mühendislik, mekanik, tekstil teknolojileri ve nanoteknoloji gibi alanlarda öğrenciler hem teorik hem de uygulamalı bir eğitim ortamına dahil olur.",
            ],
            "notes": "Birçok İngilizce program International Faculty of Engineering çatısı altında listelenmektedir. Site mimarisinde bu yapıyı ayrıca tanıtmak, kullanıcıların İngilizce öğrenim mantığını daha hızlı anlamasına yardımcı olur.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/lodz-university-technology",
                "https://www.ife.p.lodz.pl/",
                "https://www.topuniversities.com/universities/lodz-university-technology"
            ]
        },

        {
            "id": "university-of-silesia-in-katowice",
            "name": "University of Silesia in Katowice",
            "name_local": "Uniwersytet Śląski w Katowicach",
            "city": "Katowice",
            "region": "Śląskie",
            "website": "https://us.edu.pl/en/",
            "established": 1968,
            "student_count": 25000,
            "qs_ranking": "1201-1400",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "admission@us.edu.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Humanities",
                "Faculty of Law and Administration",
                "Faculty of Natural Sciences",
                "Faculty of Science and Technology",
                "Faculty of Social Sciences",
                "Krzysztof Kieślowski Film School"
            ],
            "popular_programs": [
                "International Relations",
                "Law",
                "Computer Science",
                "Biotechnology",
                "Physics",
                "Public Relations, Marketing and New Media"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "International Relations",
                    "Materials Engineering"
                ],
                "master": [
                    "American Studies",
                    "Biotechnology",
                    "Computer Science",
                    "Geography",
                    "International Relations",
                    "Law",
                    "Physics",
                    "Public Relations, Marketing and New Media"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "University of Silesia in Katowice, çok kampüslü yapısı ve geniş disiplin yelpazesiyle Güney Polonya’da önemli bir kamu üniversitesidir. İngilizce program portföyü sayıca daha seçici olsa da sosyal bilimler, hukuk, fen ve teknoloji alanlarında dengeli bir uluslararası vitrin sunar.",
                "Bu üniversite özellikle Katowice bölgesine yönelmek isteyen öğrenciler için şehir maliyeti ve bölgesel erişim açısından avantaj yaratır. International Relations, Law, Computer Science ve PR/Media odaklı programlar, farklı akademik hedefleri olan öğrencileri aynı kurum altında toplayabildiği için danışmanlık açısından işlevseldir.",
                "University of Silesia in Katowice, sosyal bilimler, hukuk, medya, uluslararası ilişkiler, biyoteknoloji ve teknoloji alanlarını bir araya getiren çok yönlü bir devlet üniversitesidir. Katowice’nin dönüşen endüstriyel yapısı ve bölgesel ekonomik ağı, öğrencilerin akademik bilgiyi gerçek şehir ve iş dünyası dinamikleriyle ilişkilendirmesine olanak tanır.",
            ],
            "notes": "Bazı programlar fakülte bazlı özel uzmanlık adıyla gösterilebilir; sitede ana bölüm adıyla birlikte specialization etiketi kullanılması önerilir.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/university-silesia-katowice",
                "https://admission.us.edu.pl/",
                "https://www.topuniversities.com/universities/university-silesia-katowice"
            ]
        },
        {
            "id": "silesian-university-of-technology",
            "name": "Silesian University of Technology",
            "name_local": "Politechnika Śląska",
            "city": "Gliwice",
            "region": "Śląskie",
            "website": "https://www.polsl.pl/en/",
            "established": 1945,
            "student_count": 21800,
            "qs_ranking": "1001-1200",
            "type": "public",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "study@polsl.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Faculty of Architecture",
                "Faculty of Automatic Control, Electronics and Computer Science",
                "Faculty of Biomedical Engineering",
                "Faculty of Chemistry",
                "Faculty of Civil Engineering",
                "Faculty of Electrical Engineering",
                "Faculty of Mechanical Engineering",
                "Faculty of Organization and Management",
                "Faculty of Transport and Aviation Engineering"
            ],
            "popular_programs": [
                "Control, Electronics and Information Engineering",
                "Informatics",
                "Civil Engineering",
                "Management and Production Engineering",
                "Mechatronics",
                "Transport"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Biomedical Engineering",
                    "Biotechnology",
                    "Circular Economy",
                    "Civil Engineering",
                    "Control, Electronics, and Information Engineering",
                    "Electrical Engineering",
                    "Environmental Engineering",
                    "Industrial and Engineering Chemistry",
                    "Informatics",
                    "Management and Production Engineering",
                    "Mechanics and Machine Design",
                    "Mining and Geology",
                    "Power Engineering",
                    "Transport"
                ],
                "master": [
                    "Aerospace Engineering and Astronautics",
                    "Architecture",
                    "Automation and Robotics",
                    "Biotechnology",
                    "Civil Engineering",
                    "Control, Electronics, and Information Engineering",
                    "Electrical Engineering",
                    "Industrial and Engineering Chemistry",
                    "Informatics",
                    "Logistics",
                    "Management",
                    "Management and Production Engineering",
                    "Materials Engineering",
                    "Mechanics and Machine Design",
                    "Mechatronics",
                    "Mining and Geology",
                    "Power Engineering",
                    "Transport"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": []
            },
            longDescriptions: [
                "Silesian University of Technology, Yukarı Silezya’nın sanayi ağıyla iç içe geçmiş büyük teknik üniversitesidir ve İngilizce mühendislik kataloğu oldukça geniştir. Özellikle endüstriyel uygulamaya yakın alanlarda, öğrencinin mezuniyet sonrası iş bağlantısı kurmasını kolaylaştıracak bir profil sunar.",
                "Civil, CEIE, Informatics, Management and Production Engineering, Mechatronics ve Transport gibi başlıklar, bu kurumu ajans kataloglarında çok güçlü bir engineering-business hibriti olarak öne çıkarır. Teknik üniversite arayan ama yalnızca tek bir uzmanlığın içinde kalmak istemeyen öğrenciler için esnek bir seçenektir.",
                "Silesian University of Technology, sanayi bağlantısı güçlü bir bölgede yer alması sayesinde mühendislik öğrencileri için uygulama ve kariyer odaklı bir eğitim ortamı sunar. Bilişim, elektronik, inşaat, biyomedikal, lojistik, mekatronik ve üretim mühendisliği gibi alanlarda öğrenciler, bölgenin teknik ve endüstriyel altyapısından doğrudan beslenen bir akademik deneyim kazanır.",
            ],
            "notes": "SUT program listesi geniş olduğu için sitede bachelor/master filtreleri mutlaka görünür olmalıdır. Logistics ve bazı management programlarında mode of study ayrımı ayrıca kontrol edilmelidir.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/silesian-university-technology",
                "https://apply.polsl.pl/en/",
                "https://www.topuniversities.com/universities/silesian-university-technology"
            ]
        },
        {
            "id": "kozminski-university",
            "name": "Kozminski University",
            "name_local": "Akademia Leona Koźmińskiego",
            "city": "Warsaw",
            "region": "Mazowieckie",
            "website": "https://www.kozminski.edu.pl/en",
            "established": 1993,
            "student_count": 8400,
            "qs_ranking": null,
            "type": "private",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "admission@kozminski.edu.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "Management",
                "Finance and Accounting",
                "Law",
                "Business School",
                "Doctoral School"
            ],
            "popular_programs": [
                "Management",
                "Finance and Accounting",
                "Doctoral Studies in Management"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Finance and Accounting",
                    "Management"
                ],
                "master": [
                    "Finance and Accounting",
                    "Management"
                ],
                "long_cycle_master": [],
                "doctoral": [
                    "Management"
                ],
                "non_degree_or_foundation": [
                    "Dual / Non-degree Management Programmes"
                ]
            },
            longDescriptions: [
                "Kozminski University, Polonya’daki özel üniversiteler arasında business ve management markası en güçlü kurumlardan biridir. Özellikle akreditasyonları, uluslararası görünürlüğü ve İngilizce business portföyünün netliği sayesinde premium segment öğrenci için çok güçlü bir konum taşır.",
                "Daha üst bütçeli ve marka hassasiyeti yüksek aday profilleri için Kozminski çoğu zaman çok ikna edici bir seçenektir. Management ve Finance odaklı sade ama prestijli program yapısı, site içinde karmaşık olmayan ve dönüşümü yüksek landing page kurgularına uygundur.",
                "Kozminski University, yönetim, finans ve işletme alanlarında premium özel üniversite deneyimi arayan öğrenciler için güçlü bir seçenektir. Varşova’daki konumu, uluslararası akreditasyonları, business school yapısı ve profesyonel network odaklı eğitim modeli sayesinde öğrenciler mezuniyet sonrası kurumsal kariyer, girişimcilik ve uluslararası iş dünyası için daha görünür bir profil oluşturabilir.",
            ],
            "notes": "Kozminski için QS görünürlüğü daha çok konu bazlıdır; bu nedenle genel `qs_ranking` null bırakıldı. Business-school akreditasyonları ve triple crown vurgusu tanıtım metninde ayrıca öne çıkarılabilir.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/kozminski-university",
                "https://www.kozminski.edu.pl/en",
                "https://www.topuniversities.com/universities/kozminski-university"
            ]
        },
        {
            "id": "swps-university",
            "name": "SWPS University",
            "name_local": "Uniwersytet SWPS",
            "city": "Warsaw",
            "region": "Mazowieckie",
            "website": "https://english.swps.pl",
            "established": 1996,
            "student_count": 16450,
            "qs_ranking": null,
            "type": "private",
            "language_of_instruction": "İngilizce ve Lehçe",
            "tuition_undergrad_eur": "programa göre değişir",
            "tuition_postgrad_eur": "programa göre değişir",
            "acceptance_rate": null,
            "contact_email": "admissions@swps.edu.pl",
            "contact_phone": null,
            "address": null,
            "coordinates": null,
            "faculties": [
                "School of Form",
                "Computer Science",
                "English Studies",
                "Management and Leadership",
                "Psychology",
                "Preparatory School"
            ],
            "popular_programs": [
                "Psychology",
                "Management and Leadership",
                "English Studies",
                "Computer Science",
                "Art and Design"
            ],
            "english_taught_programs": {
                "bachelor": [
                    "Art and Design",
                    "Computer Science",
                    "English Studies with Additional Language",
                    "English Studies",
                    "Management and Leadership",
                    "Psychology"
                ],
                "master": [
                    "English Studies",
                    "Management and Leadership",
                    "Psychology in Organization and Technology",
                    "Clinical Psychology",
                    "Global-MINDS: Psychology of Global Mobility"
                ],
                "long_cycle_master": [],
                "doctoral": [],
                "non_degree_or_foundation": [
                    "English Preparatory School",
                    "Polish Preparatory School",
                    "English Language Summer School",
                    "Polish Language Summer School"
                ]
            },
            longDescriptions: [
                "SWPS University, sosyal bilimler ve beşeri bilimlerde özel üniversite segmentinde çok güçlü bir kimliğe sahiptir. Özellikle psikoloji, yönetim, English studies ve tasarım ekseninde oluşturduğu İngilizce portföy, klasik business-school veya mühendislik rotası dışında alternatif arayan öğrenciler için çok uygundur.",
                "Bu kurumun güçlü tarafı, programlarını kolay anlatılabilir ve modern başlıklarla sunmasıdır. Psychology, Management and Leadership, Art and Design ve Computer Science kombinasyonu sayesinde hem yaratıcı hem de profesyonel yönü güçlü bir site vitrini oluşturmak mümkündür.",
                "SWPS University, psikoloji, yönetim, tasarım, bilgisayar bilimi ve İngilizce çalışmaları gibi alanlarda modern ve öğrenci odaklı bir özel üniversite deneyimi sunar. Özellikle insan davranışı, iletişim, organizasyon, yaratıcılık ve teknoloji kesişiminde eğitim almak isteyen öğrenciler için akademik teori ile çağdaş mesleki becerileri birleştiren güçlü bir alternatif oluşturur.",
            ],
            "notes": "SWPS için genel QS WUR yerine konu bazlı sonuçlar daha görünürdür; `qs_ranking` bu nedenle null bırakıldı. Preparatory school ve summer school seçenekleri ayrıca ayrı ürün olarak gösterilebilir.",
            "gallery": [],
            "sources": [
                "https://study.gov.pl/university/swps-university",
                "https://english.swps.pl",
                "https://www.topuniversities.com/universities/swps-university"
            ]
        }
        /* Additional university objects (Pozna\u0144 University of Economics, University of Silesia, University of \u0141\u00f3d\u017a, Medical University of Warsaw, Krak\u00f3w University of Economics, etc.) would follow in the same format to reach 15-20 entries, including their Turkish descriptions. Each would include at least: id, name, name_local, city, region, website, established, student_count, qs_ranking, type, language_of_instruction, tuition_undergrad_eur, tuition_postgrad_eur, acceptance_rate, contact_email, contact_phone, address, coordinates, faculties, popular_programs, longDescription, longDescription2, notes, gallery (images URLs), sources. If data is missing, fields are null. Example fields already include citations where available. */
    ]
}];

export const getUniversityBySlug = (slug) => {
    const universities = collectUniversities(universitiesData);

    const university = universities.find(uni => uni.slug === slug || uni.id === slug);

    return university ? normalizeUniversityForDetail(university) : null;
};

export const getUniversitiesForCards = () => {
    return collectUniversities(universitiesData).map(normalizeUniversityForCard);
};