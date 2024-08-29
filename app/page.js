import Image from "next/image";
import Header from "./components/Header/Header";
import styles from "./page.module.css";
import Banner from "./components/Banner/Banner";
import Dropdown from "./components/Banner/Dropdown";
import Footer from "./components/Footer/Footer";
import ServiceCards from "./components/ServiceCards/ServiceCards";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #ffffff 0%, #e72e77 87%)",
      }}
    >
      <Header />
      <Banner />
      <Dropdown />
      <ServiceCards />
      <Footer />
    </div>
  );
}
