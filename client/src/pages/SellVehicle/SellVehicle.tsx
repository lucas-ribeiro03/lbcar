import { Form } from "../../Components/SellVehicleComponents/Form/Form";
import { Header } from "../../Components/SellVehicleComponents/Header/Header";
import styles from "./style.module.scss";

export const SellVehicle: React.FC = () => {
  return (
    <div className={styles.body}>
      <Header />
      <Form />
    </div>
  );
};
