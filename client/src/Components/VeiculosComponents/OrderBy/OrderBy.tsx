import { useState } from "react";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../redux/root-reducer";
import { updateSort } from "../../../redux/orderByReducer/orderBySlicer";

export const OrderBy: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState("");

  const { filter } = useSelector(
    (rootReducer: RootReducer) => rootReducer.FilterReducer
  );

  const dispatch = useDispatch();

  const selectedFilters = [
    { label: "Marca", value: filter.selectedBrand },
    { label: "Ano", value: filter.selectedYear },
    { label: "Situação", value: filter.selectedSituation },
    { label: "Câmbio", value: filter.selectedGearshift },
    {
      label: "Preço",
      value: `R$ ${Number(filter.priceRange.minPrice)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} - R$ ${Number(
        filter.priceRange.maxPrice
      )
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
    },
    { label: "Cores", value: filter.selectedColors.join(", ") },
  ];

  return (
    <>
      <div className={styles.container}>
        <select
          onChange={(e) => {
            setSelectedOrder(e.target.value);
            dispatch(updateSort(e.target.value));
          }}
          value={selectedOrder}
        >
          <option value="" disabled>
            Ordenar por
          </option>
          <option value="higher-price">Maior preço</option>
          <option value="lower-price">Menor preço</option>
          <option value="latest">Mais recente</option>
          <option value="lower-distance">Menor KM</option>
        </select>

        <div className={styles.filters}>
          {selectedFilters.map((filter, index) =>
            filter.value ? (
              <div key={index} className={styles.filterContainer}>
                {filter.value}
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
};
