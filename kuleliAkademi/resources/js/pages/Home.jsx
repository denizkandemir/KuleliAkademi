import React from 'react';
import Header from '../components/Header/Header';
import Selection from '../components/Selection/Selection';
import VideoSectionHomepage from '../components/videoSectionHomepage/videoSectionHomepage';
import UniversityCards from '../components/universityCards/UniversityCards';

export default function Home({ message }) {
  return (
    <>
      <Header />
      <Selection />
      <VideoSectionHomepage />
      <UniversityCards />
    </>
  );
}