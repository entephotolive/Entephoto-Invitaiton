import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import About from "@/components/shared/About";
import EventCategories from "@/components/shared/EventCategories";
import Contact from "@/components/shared/Contact";
import Footer from "@/components/shared/Footer";




export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <EventCategories />
      <Contact />
      <Footer />
    </>
  );
}