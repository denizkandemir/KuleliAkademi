import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import "./StudyAbroadTimeline.scss";

const collageImageOne = "/storage/images/timelineImg1.webp";
const collageImageTwo = "/storage/images/uniKrakow1.webp";
const collageImageThree = "/storage/images/timelineImg3.webp";
const collageImageSix = "/storage/images/timelineImg52.webp";
const collageImageFour = "/storage/images/timelineImg4.webp";
const collageImageFive = "/storage/images/timelineImg5.webp";
const collageImageSeven = "/storage/images/timelineImg7.webp";


const steps = [
  {
    id: 1,
    side: "left",
    title: "İlk Görüşme ve Hedef Analizi",
    description:
      "Öğrencinin bölüm hedefi, bütçesi, şehir beklentisi ve eğitim planı birlikte netleştirilir.",
  },
  {
    id: 2,
    side: "right",
    title: "Üniversite ve Bölüm Eşleşmesi",
    description:
      "Polonya'daki uygun üniversite ve program seçenekleri öğrencinin profiline göre değerlendirilir.",
  },
  {
    id: 3,
    side: "left",
    title: "Başvuru Evraklarının Hazırlanması",
    description:
      "Gerekli belgeler eksiksiz biçimde hazırlanır, başvuru dosyası düzenli bir yapıya kavuşturulur.",
  },
  {
    id: 4,
    side: "right",
    title: "Üniversite Başvurularının Yapılması",
    description:
      "Başvurular planlı şekilde iletilir ve okul süreçleri adım adım takip edilir.",
  },
  {
    id: 5,
    side: "left",
    title: "Kabul ve Kayıt Süreci",
    description:
      "Gelen dönüşler değerlendirilir, kabul sonrası kayıt ve resmi adımlar organize edilir.",
  },
  {
    id: 6,
    side: "right",
    title: "Vize, Konaklama ve Yerleşim Planı",
    description:
      "Vize başvurusu ile birlikte ulaşım, konaklama ve ilk yerleşim süreci hazırlanır.",
  },
  {
    id: 7,
    side: "left",
    title: "Oturum İzni Başvurusu ve Süreç Takibi",
    description:
      "Polonya'ya geçiş sonrası gerekli oturum izni adımları planlanır ve süreç kontrollü şekilde takip edilir.",
  },
];

const milestoneFractions = [0.03, 0.18, 0.33, 0.49, 0.64, 0.79, 0.94];

const desktopViewBox = { width: 1200, height: 2280 };
const mobileViewBox = { width: 760, height: 1880 };

const desktopPath =
  "M600 80 C 760 200, 800 360, 620 500 C 420 650, 430 820, 625 965 C 805 1100, 785 1270, 595 1415 C 405 1565, 430 1745, 620 1888 C 770 2000, 760 2140, 625 2230";

const mobilePath =
  "M388 70 C 482 190, 508 345, 400 490 C 305 630, 312 800, 402 950 C 500 1095, 494 1260, 394 1405 C 306 1540, 315 1700, 398 1825";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getQuadraticPoint = (t, p0, p1, p2) => {
  const x =
    (1 - t) * (1 - t) * p0.x +
    2 * (1 - t) * t * p1.x +
    t * t * p2.x;

  const y =
    (1 - t) * (1 - t) * p0.y +
    2 * (1 - t) * t * p1.y +
    t * t * p2.y;

  return { x, y };
};

const imagePool = [
  collageImageOne,
  collageImageTwo,
  collageImageThree,
  collageImageFour,
  collageImageFive,
  collageImageSix,
  collageImageSeven,
];

const StudyAbroadTimeline = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  const [isCompact, setIsCompact] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [plane, setPlane] = useState({ x: 0, y: 0, angle: 0, fraction: 0 });
  const [milestones, setMilestones] = useState([]);

  const viewBox = isCompact ? mobileViewBox : desktopViewBox;
  const routePath = isCompact ? mobilePath : desktopPath;

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 0.24", "end 0.84"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.28,
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const update = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      setStageSize({ width, height });
      setIsCompact(width < 980);
    };

    update();

    const observer = new ResizeObserver(() => update());
    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  const toPixels = useCallback(
    (point) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };

      return {
        x: (point.x / viewBox.width) * svg.clientWidth,
        y: (point.y / viewBox.height) * svg.clientHeight,
      };
    },
    [viewBox.width, viewBox.height]
  );

  const updateScene = useCallback(
    (progressValue) => {
      const pathEl = pathRef.current;
      if (!pathEl) return;

      const totalLength = pathEl.getTotalLength();
      if (!totalLength) return;

      const fraction = clamp(progressValue, 0, 1);
      const currentLength = totalLength * fraction;

      const currentPoint = pathEl.getPointAtLength(currentLength);
      const prevPoint = pathEl.getPointAtLength(Math.max(currentLength - 5, 0));
      const nextPoint = pathEl.getPointAtLength(
        Math.min(currentLength + 5, totalLength)
      );

      const angle =
        (Math.atan2(nextPoint.y - prevPoint.y, nextPoint.x - prevPoint.x) * 180) /
        Math.PI;

      const pixelPoint = toPixels(currentPoint);

      setPlane({
        x: pixelPoint.x,
        y: pixelPoint.y,
        angle,
        fraction,
      });

      const nextMilestones = milestoneFractions.map((f) => {
        const point = pathEl.getPointAtLength(totalLength * f);
        const px = toPixels(point);

        return {
          fraction: f,
          x: px.x,
          y: px.y,
        };
      });

      setMilestones(nextMilestones);
    },
    [toPixels]
  );

  useEffect(() => {
    const raf = requestAnimationFrame(() => updateScene(0));
    return () => cancelAnimationFrame(raf);
  }, [routePath, updateScene]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    updateScene(latest);
  });

  useEffect(() => {
    const onResize = () => updateScene(smoothProgress.get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [smoothProgress, updateScene]);

  const activeIndex = useMemo(() => {
    if (!milestones.length) return 0;

    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    milestoneFractions.forEach((fraction, index) => {
      const distance = Math.abs(plane.fraction - fraction);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    return bestIndex;
  }, [milestones.length, plane.fraction]);
  const rowLayouts = useMemo(() => {
    if (!milestones.length) return [];

    const width = stageSize.width || 1200;
    const height = stageSize.height || 2280;

    if (isCompact) {
      return steps.map((step, index) => {
        const milestone = milestones[index];
        if (!milestone) return null;

        return {
          card: {
            left: 24,
            top: clamp(milestone.y - 92, 18, height - 220),
            width: width - 48,
            height: 182,
          },
          photo: {
            left: 24,
            top: clamp(milestone.y - 300, 18, height - 420),
            width: width - 48,
            height: 190,
          },
        };
      });
    }

    const cardWidth = clamp(width * 0.295, 330, 390);
    const photoWidth = clamp(width * 0.29, 340, 420);
    const photoHeight = photoWidth * 0.58;
    const cardHeight = 220;

    const defaultLeftCardX = clamp(width * 0.07, 52, 96);
    const defaultRightCardX = width - defaultLeftCardX - cardWidth;

    const fixedCardLeftMap = {
      0: 190, // 01
      1: 826,  // 02
      2: 62,   // 03
      3: 856,  // 04
      4: null, // 05
      5: 760, // 06
      6: 166,  // 07
    };

    const fixedCardTopMap = {
      0: 60,   // 01
      1: null, // 02
      2: null, // 03
      3: null, // 04
      4: null, // 05
      5: null, // 06
      6: null, // 07
    };

    const fixedPhotoLeftMap = {
      0: 870,  // 01
      1: null, // 02
      2: 730,  // 03
      3: null, // 04
      4: 800,  // 05
      5: 62,   // 06
      6: 890,  // 07
    };

    const fixedPhotoTopMap = {
      0: 60,   // 01
      1: null, // 02
      2: null, // 03
      3: null, // 04
      4: null, // 05
      5: null, // 06
      6: null, // 07
    };

    const getFixedValue = (map, index, fallback) => {
      return map[index] !== null && map[index] !== undefined ? map[index] : fallback;
    };

    return steps.map((step, index) => {
      const milestone = milestones[index];
      if (!milestone) return null;

      const rowCenterY = milestone.y;

      const defaultCardLeft =
        step.side === "left" ? defaultLeftCardX : defaultRightCardX;

      const cardLeft = getFixedValue(
        fixedCardLeftMap,
        index,
        defaultCardLeft
      );

      const defaultPhotoLeft =
        step.side === "left"
          ? clamp(
            cardLeft + cardWidth + 54,
            width * 0.48,
            width - photoWidth - 36
          )
          : clamp(120, 44, width * 0.28);

      const photoLeft = getFixedValue(
        fixedPhotoLeftMap,
        index,
        defaultPhotoLeft
      );

      const cardTop = getFixedValue(
        fixedCardTopMap,
        index,
        clamp(rowCenterY - cardHeight / 2, 24, height - cardHeight - 24)
      );

      const photoTop = getFixedValue(
        fixedPhotoTopMap,
        index,
        clamp(rowCenterY - photoHeight / 2, 24, height - photoHeight - 24)
      );

      return {
        card: {
          left: clamp(cardLeft, 24, width - cardWidth - 24),
          top: cardTop,
          width: cardWidth,
          height: cardHeight,
        },
        photo: {
          left: clamp(photoLeft, 24, width - photoWidth - 24),
          top: photoTop,
          width: photoWidth,
          height: photoHeight,
        },
      };
    });
  }, [isCompact, milestones, stageSize.width, stageSize.height]);

  const connectors = useMemo(() => {
    if (isCompact) return [];

    return steps
      .map((step, index) => {
        const row = rowLayouts[index];
        const milestone = milestones[index];
        if (!row || !milestone || !row.photo) return null;

        const photo = row.photo;

        const start = {
          x:
            step.side === "left"
              ? photo.left + 18
              : photo.left + photo.width - 18,
          y: photo.top + photo.height * 0.5,
        };

        const end = {
          x: milestone.x + (step.side === "left" ? 12 : -12),
          y: milestone.y,
        };

        const curveStrength = step.side === "left" ? -72 : 72;

        const control = {
          x: (start.x + end.x) / 2 + curveStrength,
          y: (start.y + end.y) / 2 - 10,
        };

        const pulsePoint = getQuadraticPoint(0.7, start, control, end);

        return {
          id: `connector-${step.id}`,
          stepIndex: index,
          d: `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`,
          pulseX: pulsePoint.x,
          pulseY: pulsePoint.y,
        };
      })
      .filter(Boolean);
  }, [isCompact, rowLayouts, milestones]);

  const getVisualState = useCallback(
    (index) => {
      const distance = Math.abs(activeIndex - index);

      if (distance === 0) {
        return { scale: 1.06, opacity: 1, blur: 0, zIndex: 14 };
      }

      if (distance === 1) {
        return { scale: 0.94, opacity: 0.42, blur: 2.8, zIndex: 9 };
      }

      return { scale: 0.86, opacity: 0.16, blur: 5, zIndex: 4 };
    },
    [activeIndex]
  );

  return (
    <section
      className="study-abroad-timeline-section"
      ref={sectionRef}
      aria-labelledby="study-abroad-timeline-title"
    >
      <div className="study-abroad-timeline-shell">
        <header className="study-abroad-timeline-intro">
          <div className="timeline-titles-container">
            <p className="study-abroad-timeline-eyebrow">Süreç Rehberi</p>
            <h2
              id="study-abroad-timeline-title"
              className="study-abroad-timeline-title"
            >
              Polonya’da Eğitim Yolculuğunu Adım Adım Birlikte Yönetiyoruz
            </h2>
          </div>
          <p className="study-abroad-timeline-description">
            İlk görüşmeden oturum izni başvurusuna kadar tüm adımları planlı bir
            sistemle takip ediyor, süreci öğrenci odaklı ve güvenli bir yapıyla
            ilerletiyoruz.
          </p>
        </header>

        <div className="study-abroad-timeline-stage" ref={stageRef}>
          <span
            className="study-abroad-focus-glow"
            style={{ left: plane.x, top: plane.y }}
            aria-hidden="true"
          />

          <svg
            ref={svgRef}
            className="study-abroad-route-svg"
            viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="routeLineGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#adc0d4" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#879db7" stopOpacity="0.88" />
              </linearGradient>
              <linearGradient
                id="routeGlowGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#d8c08a" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#8ea7bf" stopOpacity="0.12" />
              </linearGradient>
            </defs>

            <path className="study-abroad-route-glow" d={routePath} />
            <path ref={pathRef} className="study-abroad-route-main" d={routePath} />
          </svg>

          {/* {!isCompact && (
            <svg className="study-abroad-connector-svg" aria-hidden="true">
              {connectors.map((connector) => {
                const isActive = activeIndex === connector.stepIndex;
                return (
                  <g key={connector.id} className={isActive ? "is-active" : ""}>
                    <path d={connector.d} className="connector-glow" />
                    <path d={connector.d} className="connector-line" />
                    <circle
                      cx={connector.pulseX}
                      cy={connector.pulseY}
                      r={isActive ? "4" : "2.5"}
                      className="connector-pulse"
                    />
                  </g>
                );
              })}
            </svg>
          )} */}

          <div className="study-abroad-milestones" aria-hidden="true">
            {milestones.map((milestone, index) => {
              const isActive = activeIndex === index;

              return (
                <span
                  key={milestone.fraction}
                  className="study-abroad-milestone-anchor"
                  style={{ left: milestone.x, top: milestone.y }}
                >
                  <motion.span
                    className={`study-abroad-milestone ${isActive ? "is-active" : ""}`}
                    animate={{
                      scale: isActive ? 1.2 : 0.96,
                      opacity: isActive ? 1 : 0.56,
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  />
                </span>
              );
            })}
          </div>

          <span
            className="study-abroad-airplane-anchor"
            style={{ left: plane.x, top: plane.y }}
            aria-hidden="true"
          >
            <motion.span
              className="study-abroad-airplane"
              animate={{ rotate: plane.angle }}
              transition={{ duration: 0.12, ease: "linear" }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M22.2 1.8a1.15 1.15 0 0 0-1.22-.26L2.9 8.16a1.12 1.12 0 0 0-.04 2.08l7.2 2.84 2.84 7.2a1.13 1.13 0 0 0 2.08-.04L22.5 3.02a1.15 1.15 0 0 0-.3-1.22ZM12 12l-6.44-2.54L19.4 4.5 14.54 18.44 12 12Z" />
              </svg>
            </motion.span>
          </span>

          {!isCompact &&
            steps.map((step, index) => {
              const row = rowLayouts[index];
              if (!row) return null;

              const visual = getVisualState(index);

              return (
                <React.Fragment key={step.id}>
                  <motion.article
                    className={`study-abroad-step-card ${step.side} ${activeIndex === index ? "is-focus" : ""
                      }`}
                    style={{
                      left: row.card.left,
                      top: row.card.top,
                      width: row.card.width,
                      zIndex: visual.zIndex,
                    }}
                    animate={{
                      scale: visual.scale,
                      opacity: visual.opacity,
                      filter: `blur(${visual.blur}px)`,
                    }}
                    transition={{ duration: 0.36, ease: "easeOut" }}
                  >
                    <span className="step-index">
                      {String(step.id).padStart(2, "0")}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </motion.article>

                  <motion.figure
                    className={`study-abroad-collage ${activeIndex === index ? "is-focus" : ""
                      }`}
                    style={{
                      left: row.photo?.left,
                      top: row.photo?.top,
                      width: row.photo?.width,
                      height: row.photo?.height,
                      zIndex: Math.max(visual.zIndex - 1, 2),
                    }}
                    animate={{
                      scale: visual.scale,
                      opacity: visual.opacity,
                      filter: `blur(${visual.blur}px)`,
                    }}
                    transition={{ duration: 0.36, ease: "easeOut" }}
                  >
                    <img
                      src={imagePool[index]}
                      alt={`Polonya eğitim süreci görseli ${step.id}`}
                    />
                  </motion.figure>
                </React.Fragment>
              );
            })}

          {isCompact && (
            <div className="study-abroad-step-list">
              {steps.map((step) => (
                <article key={step.id} className="study-abroad-step-card compact">
                  <span className="step-index">
                    {String(step.id).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudyAbroadTimeline;