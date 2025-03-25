import styles from "./style.module.scss";

import { FaCalendarAlt } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";

interface VehicleCardProps {
  nome: string;
  cambio: string;
  ano: string;
  distancia: string;
  preco: string;
  imagem: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  nome,
  cambio,
  ano,
  distancia,
  preco,
  imagem,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardImage}>
              <img src={imagem} alt="" />
            </div>
            <div className={styles.cardCarInfo}>
              <div className={styles.carName} style={{ gridArea: "box1" }}>
                {nome}
              </div>
              <div className={styles.carCambio} style={{ gridArea: "box2" }}>
                <img
                  src="https://static.thenounproject.com/png/3779405-200.png"
                  alt=""
                />
                {cambio}
              </div>
              <div
                className={styles.anoFabricacao}
                style={{ gridArea: "box3" }}
              >
                <FaCalendarAlt />
                {ano}
              </div>
              <div className={styles.distTotal} style={{ gridArea: "box4" }}>
                <IoSpeedometerOutline />
                {distancia}Km
              </div>
              <div className={styles.carPrice} style={{ gridArea: "box5" }}>
                R$
                {Number(preco)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
