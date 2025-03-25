import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Brands, Cars } from "../../../data/Database";
import axios from "axios";
import { updateFilter } from "../../../redux/FilterReducer/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../redux/root-reducer";

export const Menu: React.FC = () => {
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState<Brands[]>([]);
  const [cars, setCars] = useState<Cars[]>([]);
  const [situation, setSituation] = useState("");
  const [year, setYear] = useState("");
  const [minPrice, setMinPrice] = useState(5000);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedGearShift, setSelectedGearShift] = useState("");
  const dispatch = useDispatch();

  const { filter } = useSelector(
    (rootReducer: RootReducer) => rootReducer.FilterReducer
  );

  useEffect(() => {
    async function getBrands() {
      const response = await axios.get("http://localhost:3000/veiculos/marcas");
      setBrands(response.data);
    }

    async function getCars() {
      const response = await axios.get("http://localhost:3000/veiculos");
      setCars(response.data);
    }

    getCars();
    getBrands();
  }, []);

  const years = () => {
    const yearList = [];
    for (let i = 1997; i <= 2025; i++) {
      yearList.push(i);
    }
    return yearList;
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
    dispatch(
      updateFilter({
        selectedYear: e.target.value,
      })
    );
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(e.target.value);
    dispatch(
      updateFilter({
        selectedBrand: e.target.value,
      })
    );
  };

  const handleSituationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSituation(e.target.value);
    dispatch(
      updateFilter({
        selectedSituation: e.target.value,
      })
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColor((prevSelected) => {
      let updatedColors;

      if (prevSelected.includes(color)) {
        updatedColors = prevSelected.filter((c) => c !== color);
      } else {
        updatedColors = [...prevSelected, color];
      }

      // Faz o dispatch aqui dentro, com o estado atualizado!
      dispatch(
        updateFilter({
          selectedColors: updatedColors,
        })
      );

      return updatedColors; // Atualiza o state com o valor correto
    });
  };

  const uniqueColors = Array.from(new Set(cars.map((car) => car.car_color)));

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1000);
    setMinPrice(value);
    dispatch(
      updateFilter({
        priceRange: {
          minPrice: `${value}
            `,

          maxPrice: `${filter.priceRange.maxPrice}`,
        },
      })
    );
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1000);
    setMaxPrice(value);
    dispatch(
      updateFilter({
        priceRange: {
          maxPrice: `${value}`,
          minPrice: `${filter.priceRange.minPrice}`,
        },
      })
    );
  };

  const handleGearshiftChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGearShift(e.target.value);
    dispatch(
      updateFilter({
        selectedGearshift: e.target.value,
      })
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.menuForm}>
            <div className={styles.selectContainer}>
              <label>Marca</label>
              <select onChange={handleBrandChange} value={brand}>
                <option value="" disabled>
                  Selecione
                </option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand.brand_name}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectContainer}>
              <label>Ano</label>
              <select onChange={handleYearChange} value={year}>
                <option value="" disabled>
                  Selecione
                </option>
                {years().map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectContainer}>
              <label>Situação</label>
              <select onChange={handleSituationChange} value={situation}>
                <option value="" disabled>
                  Selecione
                </option>
                <option value="Novo">Novo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>

            <div className={styles.priceFilterContainer}>
              <label>Filtrar por preço</label>

              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min={5000}
                  max={200000}
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className={`${styles.thumb} ${styles.thumbLeft}`}
                />

                <input
                  type="range"
                  min={5000}
                  max={200000}
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className={`${styles.thumb} ${styles.thumbRight}`}
                />

                <div className={styles.slider}>
                  <div className={styles.sliderTrack}></div>
                  <div
                    className={styles.sliderRange}
                    style={{
                      left: `${((minPrice - 5000) / (200000 - 5000)) * 100}%`,
                      right: `${
                        100 - ((maxPrice - 5000) / (200000 - 5000)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className={styles.priceValues}>
                <span>{`R$ ${minPrice.toLocaleString("pt-BR")}`}</span>
                <span>{`R$ ${maxPrice.toLocaleString("pt-BR")}`}</span>
              </div>
            </div>

            <div className={styles.colorFilterContainer}>
              <h3>Cor</h3>
              {uniqueColors.map((color) => (
                <div key={color} className={styles.checkContainer}>
                  <input
                    type="checkbox"
                    value={selectedColor}
                    name={color}
                    id={color}
                    onChange={() => handleColorChange(color)}
                  />
                  <label htmlFor={color}>{color}</label>
                </div>
              ))}
            </div>

            <div
              className={`${styles.gearShiftContainer}, ${styles.selectContainer}`}
            >
              <h3>Câmbio</h3>
              <select
                name=""
                id=""
                value={selectedGearShift}
                onChange={handleGearshiftChange}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
