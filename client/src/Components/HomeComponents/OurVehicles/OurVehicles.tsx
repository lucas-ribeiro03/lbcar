import { useEffect, useRef, useState } from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import styles from "./style.module.scss";
import { Cars } from "../../../data/Database";
import { Link } from "react-router-dom";

export const OurVehicles: React.FC = () => {
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const visibleCards = 4;
  const [cars, setCars] = useState<Cars[]>([]);

  useEffect(() => {
    async function getCars() {
      const response = await axios.get(
        "http://localhost:3000/veiculos/destaques"
      );
      setCars(response.data);
    }

    getCars();
  }, [setCars]);

  useEffect(() => {
    const updateCardWidth = () => {
      const card = document.querySelector(`.${styles.card}`) as HTMLElement;
      if (card) {
        setCardWidth(card.offsetWidth);
      }
    };

    updateCardWidth();

    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  useEffect(() => {
    if (sliderTrackRef.current) {
      sliderTrackRef.current.style.transform = `translateX(-${
        currentIndex * cardWidth
      }px)`;
    }
  }, [currentIndex, cardWidth]);

  const handleNextSlide = () => {
    const totalCards = cars.length;
    if (currentIndex < totalCards - visibleCards) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevSlide = () => {
    const totalCards = cars.length;
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(totalCards - visibleCards);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Destaques</h1>
      <div className={styles.sliderContainer}>
        <button
          onClick={handlePrevSlide}
          className={styles.navButton}
          id={styles.prevBtn}
        >
          &lt;
        </button>
        <div ref={sliderTrackRef} className={styles.sliderTrack}>
          {cars &&
            cars.map((car, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardContent}>
                  <div className={styles.cardImage}>
                    <img src={car.car_image} alt="" />
                  </div>
                  <div className={styles.cardCarInfo}>
                    <div
                      className={styles.carName}
                      style={{ gridArea: "box1" }}
                    >
                      {car.car_name}
                    </div>
                    <div
                      className={styles.carCambio}
                      style={{ gridArea: "box2" }}
                    >
                      <img
                        src="https://static.thenounproject.com/png/3779405-200.png"
                        alt=""
                      />
                      {car.gearshift}
                    </div>
                    <div
                      className={styles.anoFabricacao}
                      style={{ gridArea: "box3" }}
                    >
                      <FaCalendarAlt />
                      {car.release_year}
                    </div>
                    <div
                      className={styles.distTotal}
                      style={{ gridArea: "box4" }}
                    >
                      <IoSpeedometerOutline />
                      {car.distance}Km
                    </div>
                    <div
                      className={styles.carPrice}
                      style={{ gridArea: "box5" }}
                    >
                      R${" "}
                      {Number(car.car_price)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={handleNextSlide}
          className={styles.navButton}
          id={styles.nextBtn}
        >
          &gt;
        </button>
      </div>
      <div className={styles.btnWrapper}>
        <Link to="/veiculos" className={styles.seeAll}>
          Ver todos os veiculos
        </Link>
      </div>
    </div>
  );
};
