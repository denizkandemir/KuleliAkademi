import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LanguageSchoolsBanner from '../components/LanguageSchoolsBanner/LanguageSchoolsBanner';

const LanguageSchoolsPage = () => {
    return (
        <div className="container">  
            <LanguageSchoolsBanner />

        </div>

    )
}

export default LanguageSchoolsPage;