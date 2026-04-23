import React from "react";
import planImg2 from "../../assets/images/studentsPicture3.png";
import "./StudyAbroadPlan.scss";

const advantagePanels = [
	{
		id: "diploma",
		className: "is-primary",
		title: "İngilizce Program Esnekliği",
		text: "Hazırlık ve bölüm seçenekleriyle farklı akademik hedeflere uygun başlangıç alternatifleri.",
	},
	{
		id: "cost",
		className: "is-accent",
		title: "Dengeli Maliyet Yapısı",
		text: "Eğitim ve yaşam giderlerinde planlanabilir bütçe ile daha sürdürülebilir bir öğrenci deneyimi.",
	},
	// {
	// 	id: "english",
	// 	className: "is-neutral",
	// 	title: "İngilizce Program Esnekliği",
	// 	text: "Hazırlık ve bölüm seçenekleriyle farklı akademik hedeflere uygun başlangıç alternatifleri.",
	// },
];

const StudyAbroadPlan = () => {
	return (
		<section className="abroad-plan-section" aria-labelledby="abroad-plan-title">
			<div className="abroad-plan-shell">
				<div className="abroad-plan-content">
					<p className="abroad-plan-eyebrow">Polonya'da Eğitim</p>

					<h2 id="abroad-plan-title" className="abroad-plan-title">
						Polonya da Üniversite Okuma Avantajları
					</h2>

					<span className="abroad-plan-accent" aria-hidden="true" />

					<p className="abroad-plan-description">
						Polonya; Avrupa'da geçerli diploma yapısı, dengeli maliyetler, İngilizce program
						seçenekleri ve öğrenci dostu şehir yaşamıyla üniversite eğitimi için güçlü bir
						alternatiftir. Başvuru süreci doğru planlandığında hem akademik hem sosyal açıdan
						güvenli ve sürdürülebilir bir başlangıç sunar.
					</p>
				</div>

				<div className="abroad-plan-visual" aria-label="Polonya'da eğitim avantajları görsel alanı">
					<span className="abroad-plan-curve" aria-hidden="true" />
					<span className="abroad-plan-particles" aria-hidden="true" />

					<img
						src={planImg2}
						alt="Polonya'da eğitim planlaması yapan öğrenciler"
						className="abroad-plan-image"
					/>

					{advantagePanels.map((panel) => (
						<article key={panel.id} className={`abroad-plan-panel ${panel.className}`}>
							<div className="abroad-plan-panel-icon" aria-hidden="true">
								<span />
							</div>
							<h3>{panel.title}</h3>
							<p>{panel.text}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default StudyAbroadPlan;
