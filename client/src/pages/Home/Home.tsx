import { Navbar } from "../../Components/Navbar/Navbar";
import { Ad } from "../../Components/HomeComponents/Ad/Ad";
import { BuscarVeiculo } from "../../Components/HomeComponents/BuscarVeiculo/BuscarVeiculo";
import { OurVehicles } from "../../Components/HomeComponents/OurVehicles/OurVehicles";
import { SpecialConditionsCard } from "../../Components/HomeComponents/SpecialCards/SpecialConditionsCard";

import styles from "./style.module.scss";
import { About } from "../About/About";

export const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className={styles.adContainer}>
        <Ad />
      </div>
      <BuscarVeiculo />
      <OurVehicles />
      <SpecialConditionsCard />
      <About />
    </>
  );
};
