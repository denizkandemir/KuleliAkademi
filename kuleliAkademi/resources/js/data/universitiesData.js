import uniWarsaw from '../assets/images/uniWarsaw3.jpg';
import uniPolitechnic from '../assets/images/uniPolitechnic1.jpg';
import uniWroclaw from '../assets/images/uniWroclaw1.webp';
import uniGdansk from '../assets/images/uniGdansk1.jpg';
import uniKrakow from '../assets/images/uniKrakow1.png';
import uniPoznan from '../assets/images/uniPoznan1.png';

export const universitiesData = [
  {
    id: 1,
    slug: 'university-of-warsaw',
    name: 'University of Warsaw',
    localName: 'Uniwersytet Warszawski',
    city: 'Warsaw',
    country: 'Poland',
    founded: '1816',
    students: '40.000+',
    ranking: '400+',
    language: 'İngilizce',
    type: 'Devlet Üniversitesi',
    website: 'www.uw.edu.pl',
    image: uniWarsaw,
    badge: 'Devlet Üniversitesi',
    description: 'Geniş akademik programları, güçlü araştırma altyapısı ve uluslararası öğrenci topluluğuyla Polonya\'nın en önde gelen üniversitelerinden biridir.',
    longDescription: 'University of Warsaw is one of the leading higher education institutions in Poland with a strong academic tradition spanning centuries. The university offers a wide range of undergraduate and graduate programs across multiple faculties. It is known for its research excellence, modern facilities, and vibrant international student community.',
    tags: ['İngilizce Program', 'Güçlü Akademik Ağ', 'Merkezi Konum'],
    facts: [
      { label: 'Erasmus', value: 'Var' },
      { label: 'Akreditasyon', value: 'Avrupa Standartları' },
      { label: 'Yaşam Maliyeti', value: 'Orta' },
      { label: 'İş İmkanları', value: 'Staj ve part-time' }
    ],
    benefits: [
      'Uluslararası Tanınırlık',
      'Erasmus ve Değişim',
      'Modern Kampüs',
      'Geniş Kariyer Olanakları',
      'Uygun Yaşam Maliyeti'
    ],
    programs: [
      { title: 'Computer Science', level: 'BSc / MSc', desc: 'Yazılım, algoritma ve veri bilimi odaklı program.' },
      { title: 'Economics', level: 'BSc / MSc', desc: 'Ekonomi, finans ve uluslararası çalışmalar.' },
      { title: 'Law', level: 'LLB / LLM', desc: 'Uluslararası ve yerel hukuk programları.' },
      { title: 'Medicine', level: 'MD', desc: 'Tıp fakültesi ve klinik eğitim imkanları.' }
    ]
  },
  {
    id: 2,
    slug: 'warsaw-university-of-technology',
    name: 'Warsaw University of Technology',
    localName: 'Politechnika Warszawska',
    city: 'Warsaw',
    country: 'Poland',
    founded: '1826',
    students: '35.000+',
    ranking: '450+',
    language: 'İngilizce',
    type: 'Devlet Üniversitesi',
    website: 'www.pw.edu.pl',
    image: uniPolitechnic,
    badge: 'Mühendislik Güçlü',
    description: 'Mühendislik ve teknoloji alanlarında uygulama odaklı eğitim modeliyle öne çıkar; sektörel bağlantıları güçlü bir üniversite seçeneğidir.',
    longDescription: 'Warsaw University of Technology is one of Poland\'s premier technical universities with a strong focus on engineering, technology, and applied sciences. The university maintains strong connections with industry leaders and offers practical, hands-on education combined with cutting-edge research opportunities.',
    tags: ['Teknoloji Odağı', 'Yüksek İstihdam', 'Staj İmkanları'],
    facts: [
      { label: 'Erasmus', value: 'Var' },
      { label: 'Akreditasyon', value: 'Avrupa Standartları' },
      { label: 'Yaşam Maliyeti', value: 'Uygun' },
      { label: 'İş İmkanları', value: 'Yüksek İstihdam' }
    ],
    benefits: [
      'Sektörel Bağlantılar',
      'Pratik Eğitim',
      'Yüksek İstihdam Oranı',
      'Modern Teknoloji',
      'Staj İmkanları'
    ],
    programs: [
      { title: 'Software Engineering', level: 'BSc / MSc', desc: 'Yazılım geliştirme ve sistem mimarisi.' },
      { title: 'Mechanical Engineering', level: 'BSc / MSc', desc: 'Makine mühendisliği ve otomotiv.' },
      { title: 'Civil Engineering', level: 'BSc / MSc', desc: 'İnşaat ve altyapı projeleri.' },
      { title: 'Electrical Engineering', level: 'BSc / MSc', desc: 'Elektrik ve enerji sistemleri.' }
    ]
  },
  {
    id: 3,
    slug: 'university-of-wroclaw',
    name: 'University of Wrocław',
    localName: 'Uniwersytet Wrocławski',
    city: 'Wrocław',
    country: 'Poland',
    founded: '1702',
    students: '30.000+',
    ranking: '500+',
    language: 'İngilizce',
    type: 'Devlet Üniversitesi',
    website: 'www.uni.wroc.pl',
    image: uniWroclaw,
    badge: 'Köklü Üniversite',
    description: 'Köklü tarihi, sosyal bilimlerden fen bilimlerine uzanan güçlü fakülte yapısı ve canlı öğrenci yaşamıyla dikkat çeker.',
    longDescription: 'University of Wrocław is one of Poland\'s oldest and most prestigious universities with a rich academic heritage. The university excels across diverse disciplines including humanities, social sciences, natural sciences, and engineering, creating a truly comprehensive educational experience.',
    tags: ['Köklü Üniversite', 'Kültürel Şehir', 'Uluslararası Ortam'],
    facts: [
      { label: 'Erasmus', value: 'Var' },
      { label: 'Akreditasyon', value: 'Avrupa Standartları' },
      { label: 'Yaşam Maliyeti', value: 'Düşük' },
      { label: 'İş İmkanları', value: 'Çeşitli' }
    ],
    benefits: [
      'Tarihi Prestij',
      'Çeşitli Program Yelpazesi',
      'Canlı Öğrenci Yaşamı',
      'Düşük Yaşam Maliyeti',
      'Kültürel Zenginlik'
    ],
    programs: [
      { title: 'Philosophy', level: 'BA / MA', desc: 'Klasik ve çağdaş felsefe.' },
      { title: 'Physics', level: 'BSc / MSc', desc: 'Teorik ve deneysel fizik.' },
      { title: 'History', level: 'BA / MA', desc: 'Avrupa ve dünya tarihi.' },
      { title: 'Chemistry', level: 'BSc / MSc', desc: 'Organik ve anorganik kimya.' }
    ]
  },
  {
    id: 4,
    slug: 'gdansk-university-of-technology',
    name: 'Gdańsk University of Technology',
    localName: 'Politechnika Gdańska',
    city: 'Gdańsk',
    country: 'Poland',
    founded: '1904',
    students: '28.000+',
    ranking: '500+',
    language: 'İngilizce',
    type: 'Devlet Üniversitesi',
    website: 'www.pg.edu.pl',
    image: uniGdansk,
    badge: 'Öğrenci Dostu Şehir',
    description: 'Deniz kenti atmosferi, modern kampüs olanakları ve disiplinler arası eğitim yaklaşımıyla dengeli bir üniversite deneyimi sunar.',
    longDescription: 'Gdańsk University of Technology offers a unique educational experience in the vibrant Baltic coastal city. The university combines modern infrastructure with a strong focus on innovation and interdisciplinary research, attracting a diverse international student community.',
    tags: ['Modern Kampüs', 'Uygun Yaşam Maliyeti', 'Sosyal Yaşam'],
    facts: [
      { label: 'Erasmus', value: 'Var' },
      { label: 'Akreditasyon', value: 'Avrupa Standartları' },
      { label: 'Yaşam Maliyeti', value: 'Uygun' },
      { label: 'İş İmkanları', value: 'İyi' }
    ],
    benefits: [
      'Deniz Şehri Yaşamı',
      'Modern Tesisler',
      'Genç Ve Dinamik Ortam',
      'Uygun Fiyatlar',
      'Sosyal Etkinlikler'
    ],
    programs: [
      { title: 'Marine Technology', level: 'BSc / MSc', desc: 'Denizcilik ve gemi mühendisliği.' },
      { title: 'Computer Science', level: 'BSc / MSc', desc: 'Yazılım ve bilgisayar mimarisi.' },
      { title: 'Environmental Engineering', level: 'BSc / MSc', desc: 'Çevre ve sürdürülebilirlik.' },
      { title: 'Electronics', level: 'BSc / MSc', desc: 'Elektronik ve telekomunikasyon.' }
    ]
  },
  {
    id: 5,
    slug: 'jagiellonian-university',
    name: 'Jagiellonian University',
    localName: 'Uniwersytet Jagielloński',
    city: 'Kraków',
    country: 'Poland',
    founded: '1364',
    students: '38.000+',
    ranking: '350+',
    language: 'İngilizce',
    type: 'Devlet Üniversitesi',
    website: 'www.uj.edu.pl',
    image: uniKrakow,
    badge: 'Akademik Prestij',
    description: 'Avrupa\'nın en eski üniversiteleri arasında yer alan kurum, akademik prestij ve zengin şehir kültürünü bir araya getirir.',
    longDescription: 'Jagiellonian University is one of the oldest universities in Europe with a legacy spanning over 650 years. Located in the culturally rich city of Kraków, the university combines traditional academic excellence with modern research facilities, attracting scholars and students from around the world.',
    tags: ['Yüksek Prestij', 'Tarihi Merkez', 'Akademik Derinlik'],
    facts: [
      { label: 'Erasmus', value: 'Var' },
      { label: 'Akreditasyon', value: 'Avrupa Standartları' },
      { label: 'Yaşam Maliyeti', value: 'Orta' },
      { label: 'İş İmkanları', value: 'Mükemmel' }
    ],
    benefits: [
      'Yüksek Akademik Prestij',
      'Tarihi Şehir Yaşamı',
      'Güçlü Akademik Ağ',
      'Araştırma Olanakları',
      'Uluslararası Tanınırlık'
    ],
    programs: [
      { title: 'Medicine', level: 'MD', desc: 'Tıp ve sağlık bilimleri.' },
      { title: 'Biology', level: 'BSc / MSc', desc: 'Biyoloji ve genetik.' },
      { title: 'Literature', level: 'BA / MA', desc: 'Edebiyat ve dilbilim.' },
      { title: 'Astronomy', level: 'BSc / MSc', desc: 'Astronomi ve kozmoloji.' }
    ]
  },
  {
    id: 6,
    slug: 'adam-mickiewicz-university',
    name: 'Adam Mickiewicz University',
    localName: 'Uniwersytet im. Adama Mickiewicza',
    city: 'Poznań',
    country: 'Poland',
    founded: '1919',
    students: '35.000+',
    ranking: '450+',
    language: 'İngilizce',
    type: 'Devlet Üniversitesi',
    website: 'www.amu.edu.pl',
    image: uniPoznan,
    badge: 'Araştırma Odaklı',
    description: 'Araştırma odaklı yaklaşımı, uluslararası iş birlikleri ve öğrenci dostu şehir yapısıyla güven veren bir tercih sunar.',
    longDescription: 'Adam Mickiewicz University in Poznań is one of Poland\'s largest and most respected universities. With a strong emphasis on research and international collaboration, the university offers comprehensive programs across all major academic disciplines in a welcoming student-friendly city.',
    tags: ['Araştırma Odağı', 'Öğrenci Dostu', 'Çok Disiplinli'],
    facts: [
      { label: 'Erasmus', value: 'Var' },
      { label: 'Akreditasyon', value: 'Avrupa Standartları' },
      { label: 'Yaşam Maliyeti', value: 'Düşük' },
      { label: 'İş İmkanları', value: 'İyi' }
    ],
    benefits: [
      'Araştırma Odaklı Eğitim',
      'Uluslararası İş Birlikleri',
      'Öğrenci Dostluğu',
      'Düşük Maliyetler',
      'Zengin Program Yelpazesi'
    ],
    programs: [
      { title: 'International Relations', level: 'BA / MA', desc: 'Uluslararası ilişkiler ve diplomasi.' },
      { title: 'Linguistics', level: 'BA / MA', desc: 'Dilbilim ve çok dil eğitimi.' },
      { title: 'Psychology', level: 'BSc / MSc', desc: 'Psikoloji ve sosyal bilimler.' },
      { title: 'Economics', level: 'BSc / MSc', desc: 'Ekonomi ve işletme yönetimi.' }
    ]
  }
];

export const getUniversityBySlug = (slug) => {
  return universitiesData.find(uni => uni.slug === slug);
};

export const getUniversitiesForCards = () => {
  return universitiesData.map(uni => ({
    id: uni.id,
    image: uni.image,
    name: uni.name,
    city: uni.city,
    badge: uni.badge,
    description: uni.description,
    tags: uni.tags,
    cta: 'Detayları İncele',
    slug: uni.slug
  }));
};
