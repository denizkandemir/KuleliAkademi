import React from "react";
import "./WhyPoland.scss";
// import polandImg from "../../assets/images/uniWarsaw4.webp";
// import polandImg from "../../assets/images/uniPolitechnic1.webp";
import polandImg from "../../assets/images/uniGdansk1.webp";
import diplomaIcon from "../../assets/icons/global-education.png";
import languageIcon from "../../assets/icons/thesis.png";
import walletIcon from "../../assets/icons/crypto-wallet.png";
import testIcon from "../../assets/icons/test2.png";
import studentIcon from "../../assets/icons/reading.png";

const benefits = [
  {
    id: 1,
    icon: diplomaIcon,
    title: "3 Yıl İçinde Avrupa'da Geçerli Diploma Fırsatı",
    text: "Dünya sıralamalarında öne çıkan üniversitelerde, uluslararası geçerliliğe sahip diploma ile kariyerine güçlü bir başlangıç yap.",
  },
  {
    id: 2,
    icon: walletIcon,
    title: "Uygun Eğitim ve Yaşam Maliyeti",
    text: "Avrupa standartlarında eğitimi daha dengeli bütçeyle sürdürebilme avantajı.",
  },
  {
    id: 3,
    icon: languageIcon,
    title: "İngilizce Program Seçenekleri",
    text: "İngilizce program alternatifleri ve IELTS şartı olmadan hazırlık sınıfına başlama imkanıyla esnek bir akademik rota sunar.",
  },
  {
    id: 4,
    icon: testIcon,
    title: "YKS Şartı Olmadan ve Sınavsız Kayıt Seçenekleri",
    text: "YKS zorunluluğu olmadan, başvuru odaklı ve daha erişilebilir kayıt süreçleriyle üniversite eğitimine geçiş imkanı sağlar.",
  },
  {
    id: 5,
    icon: studentIcon,
    title: "Güvenli ve Öğrenci Dostu Yaşam",
    text: "Polonya, güvenli şehir yapısı ve öğrenci dostu yaşam düzeniyle huzurlu bir eğitim ortamı sunar.",
  },
];

const WhyPoland = () => {
  return (
    <section className="why-poland-section" aria-labelledby="why-poland-title">
      <div className="why-poland-shell">
        <div className="why-poland-grid">
         

          <article className="why-poland-content">
            <p className="why-poland-eyebrow">Yurt Dışı Eğitim Avantajları</p>
            <h2 id="why-poland-title" className="why-poland-title">
              Neden Polonya'da Üniversite Eğitimi?
            </h2>
            <p className="why-poland-description">
              Polonya; akademik kalite, dengeli yaşam maliyetleri ve Avrupa merkezli konumuyla
              öğrenciler için güçlü bir üniversite rotası sunar. Doğru planlamayla hem eğitim hem de
              kariyer hedeflerin için sürdürülebilir bir başlangıç yapabilirsin.
            </p>

            <div className="why-poland-benefit-list" aria-label="Polonya egitim avantajlari">
              {benefits.map((benefit) => (
                <article key={benefit.id} className="why-poland-benefit-card">
                  <span className="why-poland-benefit-icon-container" aria-hidden="true">
                    <img src={benefit.icon} className="why-poland-benefit-icon" alt={benefit.title} />
                  </span> 

                  <div className="why-poland-benefit-content">
                    <h3 className="why-poland-benefit-title">{benefit.title}</h3>
                    <p className="why-poland-benefit-text">{benefit.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>

           <figure className="why-poland-visual">
            <img src={polandImg} alt="Polonya'da üniversite kampüs yaşamı" className="why-poland-image" />
            <span className="why-poland-image-overlay" aria-hidden="true" />
            <span className="why-poland-image-badge" aria-label="Location badge">
              <span className="why-poland-image-badge-dot" aria-hidden="true" />
              Gdansk University of Technology
            </span>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default WhyPoland;