import React, { useMemo, useState } from "react";
import "./faqSection.scss";

const INITIAL_VISIBLE_COUNT = 6;
const EXPANDED_VISIBLE_COUNT = 10;
const faqItems = [
  {
    id: 1,
    question: "Polonya'da üniversite başvurusu için hangi belgeler gerekir?",
    answer:
      "Başvuru dosyasında genellikle pasaport, diploma veya öğrenci belgesi, transkript ve üniversitenin talep ettiği başvuru formu yer alır. Bazı bölümlerde niyet mektubu, portfolyo ya da ek akademik belgeler de istenebilir. Süreci sorunsuz ilerletmek için her üniversiteye göre net bir evrak planı çıkarıyor ve öğrencinin dosyasını eksiksiz biçimde hazırlıyoruz.",
  },
  {
    id: 2,
    question: "Polonya'da İngilizce programlara başvurmak için dil belgesi zorunlu mu?",
    answer:
      "Birçok üniversite IELTS veya TOEFL gibi bir belge talep etse de tüm kurumlarda şartlar aynı değildir. Bazı okullar online mülakat, iç sınav veya hazırlık programı seçeneği sunabilir. Öğrencinin hedeflediği üniversiteye göre bu şartları en başta netleştirerek gereksiz zaman ve belge maliyetinin önüne geçiyoruz.",
  },
  {
    id: 3,
    question: "Polonya'da hangi şehirde üniversite okumak daha mantıklı?",
    answer:
      "Bu sorunun cevabı bölüm hedefi, bütçe, yaşam beklentisi ve öğrencinin nasıl bir şehir temposu istediğine göre değişir. Varşova, Gdansk, Wroclaw ya da Krakow gibi şehirlerin her biri farklı avantajlar sunar. Biz şehir seçimini sadece üniversite adına göre değil; yaşam maliyeti, ulaşım, sosyal ortam ve öğrencinin hedefleriyle birlikte değerlendirerek daha doğru bir yönlendirme sağlıyoruz.",
  },
  {
    id: 4,
    question: "Polonya üniversite başvuru süreci ne kadar sürer?",
    answer:
      "Süre; seçilen üniversiteye, bölüm yoğunluğuna ve öğrencinin evraklarını ne kadar hızlı tamamladığına göre değişir. Belgeler hazır olduğunda başvuru tarafı daha kontrollü ilerler, ancak kabul, ödeme ve vize aşamaları için iyi bir takvim gerekir. Bu nedenle süreci baştan sona planlı bir takvimle yönetiyor, öğrencinin hangi adımı ne zaman atacağını netleştiriyoruz.",
  },
  {
    id: 5,
    question: "Polonya öğrenci vizesi için hazırlığa ne zaman başlanmalı?",
    answer:
      "En doğru yaklaşım, kabul süreci netleşmeye başladığı anda vize dosyasının hazırlık planını oluşturmaktır. Son haftalara bırakılan işlemler hem randevu hem belge kontrolü açısından stres yaratabilir. Biz kabul sonrası aşamayı yalnızca bekleyen bir süreç gibi değil, önceden planlanan bir adım olarak ele alıyor ve öğrencinin vize hazırlığını zamanında başlatıyoruz.",
  },
  {
    id: 6,
    question: "Konaklama süreci üniversite kabulünden önce mi sonra mı planlanmalı?",
    answer:
      "Konaklama seçeneklerini erken araştırmak her zaman avantaj sağlar, ancak kesin karar çoğu zaman kabul süreci netleştikten sonra verilir. Yurt, özel yurt veya paylaşımlı ev gibi seçenekler şehirden şehire değişir. Öğrencinin bütçesine, okul konumuna ve yaşam beklentisine göre daha dengeli alternatifler sunarak bu süreci karmaşık olmaktan çıkarıyoruz.",
  },
  {
    id: 7,
    question: "Polonya'da üniversite kabulü aldıktan sonra hangi adımlar gelir?",
    answer:
      "Kabul sonrasında kayıt teyidi, gerekli ödemeler, vize hazırlığı, konaklama planlaması ve yolculuk öncesi düzenlemeler devreye girer. Bu aşama çoğu öğrenci için en kritik dönemlerden biridir çünkü süreç bir anda çok parçalı hale gelir. Biz kabul sonrası dönemi adım adım planlayarak öğrencinin sadece kabul almakla kalmayıp süreci güvenli şekilde tamamlamasını hedefliyoruz.",
  },
  {
    id: 8,
    question: "Polonya'ya gittikten sonra oturum izni süreci nasıl işler?",
    answer:
      "Polonya'ya giriş sonrasında yasal süre içinde oturum izni başvurusu yapılır ve bu süreç şehirden şehire bazı farklılıklar gösterebilir. Randevu, dosya hazırlığı ve resmi takip adımları dikkatli yönetilmelidir. Öğrencinin yalnızca üniversiteye yerleşmesini değil, ülkedeki resmi süreçlere de hazırlıklı olmasını önemsiyor ve bu aşamaları önceden anlaşılır şekilde planlıyoruz.",
  },
  {
    id: 9,
    question: "Danışmanlık sürecinde hangi aşamalarda destek alıyorum?",
    answer:
      "Danışmanlık süreci; bölüm ve üniversite eşleştirmesi, şehir seçimi, evrak hazırlığı, başvuru takibi, kabul sonrası yönlendirme, vize planlaması ve konaklama sürecini kapsayabilir. Biz süreci tek tek dağınık adımlar halinde değil, birbirine bağlı bir yol haritası gibi ele alıyoruz. Böylece öğrenci her aşamada ne yapacağını bilir ve süreci daha güvenle takip eder.",
  },
  {
    id: 10,
    question: "Bölüm ve şehir seçiminde nasıl yönlendirme yapıyorsunuz?",
    answer:
      "Yönlendirmeyi yalnızca üniversite adı üzerinden değil; öğrencinin akademik hedefi, bütçesi, yaşam beklentisi, dil seviyesi ve uzun vadeli planları üzerinden yapıyoruz. Böylece sadece 'bir okula yerleşmek' değil, öğrenci için daha sürdürülebilir bir eğitim ve yaşam düzeni kurmak hedefleniyor. Karşılaştırmalı değerlendirme ile daha net ve güvenli karar verilmesini sağlıyoruz.",
  },
];

const faqSection = () => {
  const [expandedItemId, setExpandedItemId] = useState(faqItems[0].id);
  const [showAllItems, setShowAllItems] = useState(false);
  const visibleCount = showAllItems ? EXPANDED_VISIBLE_COUNT : INITIAL_VISIBLE_COUNT;

  const visibleFaqItems = useMemo(() => faqItems.slice(0, visibleCount), [visibleCount]);

  const faqColumns = useMemo(
    () => [
      visibleFaqItems.filter((_, index) => index % 2 === 0),
      visibleFaqItems.filter((_, index) => index % 2 === 1),
    ],
    [visibleFaqItems]
  );

  const handleItemToggle = (id) => {
    setExpandedItemId((currentId) => (currentId === id ? null : id));
  };

  const handleViewAllToggle = () => {
    setShowAllItems((current) => {
      const next = !current;

      if (!next) {
        setExpandedItemId(faqItems[0].id);
      }

      return next;
    });
  };

  return (
    <section className="faq-section" aria-label="Sik sorulan sorular alani">
      <div className="faq-section-shell">
        <div className="faq-section-surface">
          <div className="faq-section-intro-row">
            <header className="faq-section-header">
              <p className="faq-section-eyebrow">Sıkça Sorulan Sorular</p>
              <h2 className="faq-section-title">Merak Edilenleri Netlestirelim</h2>
              <p className="faq-section-description">
                Polonya'da egitim, basvuru, sehir secimi ve surec planlamasiyla ilgili en cok sorulan basliklari bu
                alanda sade ve net bir dille bulabilirsin.
              </p>
            </header>

            <button
              type="button"
              className={`faq-view-all-btn${showAllItems ? " is-expanded" : ""}`}
              onClick={handleViewAllToggle}
            >
              <span>{showAllItems ? "Daha Az Goster" : "Tum Sorulari Gor"}</span>
              <span className="faq-view-all-btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          <div className="faq-grid" role="list">
            {faqColumns.map((column, columnIndex) => (
              <ul key={`faq-column-${columnIndex}`} className="faq-column" role="list">
                {column.map((item) => {
                  const isOpen = expandedItemId === item.id;

                  return (
                    <li key={item.id} className={`faq-card${isOpen ? " is-open" : ""}`}>
                      <button
                        type="button"
                        className="faq-card-trigger"
                        onClick={() => handleItemToggle(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${item.id}`}
                      >
                        <span className="faq-card-question">{item.question}</span>
                        <span className="faq-card-icon" aria-hidden="true">
                          <span className="faq-card-icon-horizontal" />
                          <span className="faq-card-icon-vertical" />
                        </span>
                      </button>

                      <div
                        id={`faq-answer-${item.id}`}
                        className={`faq-card-answer-wrap${isOpen ? " is-open" : ""}`}
                        role="region"
                        aria-label={`${item.question} cevabi`}
                      >
                        <div className="faq-card-answer-inner">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default faqSection;
