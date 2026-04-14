import React from "react";
import "./Header.scss";
import Slide from "../Slide/Slide";
import slideImg1 from "../../assets/images/headerImg1.png";
import slideImg2 from "../../assets/images/headerImg2.png";
import slideImg3 from "../../assets/images/headerImg3.png";
import slideImg4 from "../../assets/images/headerImg4.png";

const Header = () => {

    const slideImgs = [
        {
            id: 1,
            url: slideImg1,
            littleTitle:"",
            mainTitle:"",
            description:"",
        },

        {
            id: 2,
            url: slideImg2,
            littleTitle:"",
            mainTitle:"",
            description:"",
        },

        {
            id: 3,
            url: slideImg3,
            littleTitle:"",
            mainTitle:"",
            description:"",
        },

        {
            id: 4,
            url: slideImg4,
            littleTitle:"",
            mainTitle:"",
            description:"",
        }

    ]

    const iconArray = [
        {
            id:1,
            icon:"",
            title:"",
        },
    ];

    const floatingIcons = [
        {
            id:1,
            icon:"",
            title:"",
        },
    ];

    return (
        <header className="header-container">  
            <Slide
             SlideImgs={slideImgs}
             container={"header-slide-container"}
             iconArray={iconArray}
             id={1}
             floatingIcons={floatingIcons}  
             imgClass={"header-slide-img"}
             openSlide={() => {}}
            />
        </header>
    )
}

export default Header;