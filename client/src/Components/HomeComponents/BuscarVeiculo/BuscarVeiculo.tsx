import { useEffect, useState } from "react";
import { Brands } from "../../../data/Database";
import styles from "./style.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../../redux/FilterReducer/filterSlice";
import { Link } from "react-router-dom";

export const BuscarVeiculo: React.FC = () => {
  const [brands, setBrands] = useState<Brands[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSituation, setSelectedSituation] = useState("");

  useEffect(() => {
    async function getBrands() {
      const response = await axios.get("http://localhost:3000/veiculos/marcas");
      setBrands(response.data);
    }

    getBrands();
  }, [setBrands]);

  const years = () => {
    const yearList = [];
    for (let i = 1997; i <= 2025; i++) {
      yearList.push(i);
    }
    return yearList;
  };

  const dispatch = useDispatch();

  function handleChangeBrand(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedBrand(e.target.value);
    dispatch(
      updateFilter({
        selectedBrand: e.target.value,
      })
    );
  }

  function handleChangeYear(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(e.target.value);
    dispatch(
      updateFilter({
        selectedYear: e.target.value,
      })
    );
  }

  function handleChangeSituation(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSituation(e.target.value);
    dispatch(
      updateFilter({
        selectedSituation: e.target.value,
      })
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form>
          <select onChange={handleChangeBrand} value={selectedBrand}>
            <option value="" disabled>
              Marca
            </option>
            {brands.map((brand, index) => (
              <option key={index} value={brand.brand_name}>
                {brand.brand_name}
              </option>
            ))}
          </select>
          <select onChange={handleChangeYear} value={selectedYear}>
            <option value="" disabled>
              Ano de fabricação
            </option>
            {years().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select onChange={handleChangeSituation} value={selectedSituation}>
            <option value="" disabled>
              Situação
            </option>

            <option value="novo">Novo</option>
            <option value="usado">Usado</option>
          </select>

          <Link className={styles.searchVehicleBtn} to="/veiculos">
            Buscar veiculo
          </Link>
        </form>
      </div>
    </div>
  );
};
