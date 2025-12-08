import React from 'react';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import TripsGrid from '../components/sections/TripsGrid';
import Training from '../components/sections/Training';
import Gear from '../components/sections/Gear';
import Seasons from '../components/sections/Seasons';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <TripsGrid />
      <Training />
      <Gear />
      <Seasons />
      <About />
      <Contact />
      <FAQ />
    </>
  );
};

export default Home;