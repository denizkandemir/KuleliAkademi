import React from "react";
import "./Header.scss";
import Slide from "../Slide/Slide";

const Header = () => {

    const slideImgs = [
        {
            _id: 1,
            url:"",
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
            
            />
        </header>
    )
}

export default Header;