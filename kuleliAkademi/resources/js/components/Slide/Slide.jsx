import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Autoplay,
    EffectFade
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Slide.scss";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";


const Slide = ({ SlideImgs, imgClass, container, id, isSlideOpen , containerRef, openSlide, iconArray, floatingIcons }) => {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.autoplay.start();
        }
    }, []);

    return (
        <>
            <div className={"slide-page-container"}>
                <div className={container}>
                    <div  ref={containerRef} className="slide-content-container">
                        {SlideImgs && SlideImgs.length > 0 && (
                            <Swiper 
                                ref={swiperRef}
                                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                                centeredSlides={true}
                                key={id + isSlideOpen}
                                loop={true}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                // effect="fade"
                                speed={1200}
                                pagination={{
                                    clickable: true,
                                    el: `.swiper-pagination-${id}`,
                                }}
                                navigation={{
                                    nextEl: `.swiper-button-next-${id}`,
                                    prevEl: `.swiper-button-prev-${id}`,
                                }}
                                
                            >
                                {SlideImgs.map((img) => (
                                    <SwiperSlide key={img._id}>
                                        <div  className="slide-container">
                                            <img onClick={() => openSlide()} className={imgClass} src={img.url} alt="" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                                <div className={`swiper-button-next-${id} slide-button1`}>
                                    <MdKeyboardArrowRight />
                                </div>
                                <div  className={`swiper-button-prev-${id} slide-button2`}>
                                    <MdKeyboardArrowLeft />
                                </div>
                                <div className={`swiper-pagination-${id}`}></div>
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Slide;
