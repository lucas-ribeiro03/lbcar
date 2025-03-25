import styles from "./style.module.scss";

import { Menu } from "../../Components/VeiculosComponents/Menu/Menu";
import { OrderBy } from "../../Components/VeiculosComponents/OrderBy/OrderBy";
import { VehicleCard } from "../../Components/VeiculosComponents/AllVehicles/VehicleCard";
import { useEffect, useState } from "react";
import { Cars } from "../../data/Database";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootReducer } from "../../redux/root-reducer";

export const Vehicles: React.FC = () => {
  const [cars, setCars] = useState<Cars[]>([]);

  const { order } = useSelector(
    (rootReducer: RootReducer) => rootReducer.OrderByReducer
  );

  const { filter } = useSelector(
    (rootReducer: RootReducer) => rootReducer.FilterReducer
  );

  useEffect(() => {
    async function getCars() {
      const params = {
        sort: order.sort,
        brand: filter.selectedBrand,
        year: filter.selectedYear,
        situation: filter.selectedSituation,
        gearshift: filter.selectedGearshift,
        minPrice: filter.priceRange.minPrice,
        maxPrice: filter.priceRange.maxPrice,
        colors: filter.selectedColors,
      };
      console.log("parametros enviados: ", params);
      const response = await axios.get("http://localhost:3000/veiculos", {
        params,
      });
      setCars(response.data);
    }
    getCars();
  }, [
    order.sort,
    filter.selectedBrand,
    filter.selectedYear,
    filter.selectedSituation,
    filter.selectedGearshift,
    filter.priceRange.minPrice,
    filter.priceRange.maxPrice,
    filter.selectedColors,
  ]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box} style={{ gridArea: "box1" }}>
          <Menu />
        </div>

        <div className={styles.box} style={{ gridArea: "box2" }}>
          <OrderBy />
        </div>

        <div className={styles.boxVehicleCard} style={{ gridArea: "box3" }}>
          {cars &&
            cars.map((car) => (
              <VehicleCard
                key={car.id}
                nome={car.car_name}
                imagem={car.car_image}
                distancia={car.distance}
                ano={car.release_year}
                cambio={car.gearshift}
                preco={car.car_price}
              />
            ))}
        </div>
      </div>
    </>
  );
};
