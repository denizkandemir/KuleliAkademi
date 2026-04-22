import React from 'react';
import Header from '../components/Header/Header';
import Selection from '../components/Selection/Selection';
import VideoSectionHomepage from '../components/videoSectionHomepage/videoSectionHomepage';
import UniversityCards from '../components/universityCards/UniversityCards';
import WhyPoland from '../components/whyPoland/WhyPoland';
import ServicesHomepage from '../components/ServicesHomepage/ServicesHomepage';
import HomepageContact from '../components/homepageContact/HomepageContact';

export default function Home({ message }) {
  return (
    <>
      <Header />
      <Selection />
      <VideoSectionHomepage />
      <UniversityCards />
      <WhyPoland />
      <ServicesHomepage />
      <HomepageContact />
    </>
  );
}