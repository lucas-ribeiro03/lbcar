import adImage from "../../../assets/banner.jpg";
import styles from "./style.module.scss";

export const Ad: React.FC = () => {
  return <img src={adImage} alt="" className={styles.image} />;
};
