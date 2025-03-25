import { Profile } from "../../Components/UserComponents/Profile/Profile";
import styles from "./style.module.scss";

export const User: React.FC = () => {
  return (
    <>
      <div className={styles.body}>
        <Profile />
      </div>
    </>
  );
};
