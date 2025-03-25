import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../redux/root-reducer";
import { setUser } from "../../../redux/UserReducer/userSlice";
import styles from "./style.module.scss";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

interface EditProfileMdProps {
  closeModal: () => void;
}

export const EditProfileMd: React.FC<EditProfileMdProps> = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const userOnLocalStorage = JSON.parse(localStorage.getItem("user") || "[]");
    dispatch(
      setUser({
        id_user: userOnLocalStorage.id_user,
        user_email: userOnLocalStorage.user_email,
        user_name: userOnLocalStorage.user_name,
        user_image: userOnLocalStorage.user_image,
      })
    );
  }, []);

  const { user } = useSelector(
    (rootReducer: RootReducer) => rootReducer.UserReducer
  );

  useEffect(() => {
    setEmail(user.user_email);
    setName(user.user_name);
  }, [user]);

  const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/users/editUser`, {
      id_user: user.id_user,
      user_email: user.user_email,
      user_name: user.user_name,
      user_image: user.user_image,
    });

    dispatch(
      setUser({
        id_user: user.id_user,
        user_email: email,
        user_name: name,
        user_image: user.user_image,
      })
    );
    closeModal();
  };
  return (
    <div className={styles.body}>
      <div className={styles.mdContainer}>
        <form onSubmit={handleEditUser}>
          <label htmlFor="name">Nome </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
          />
          <label htmlFor="email">Email </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
          />

          <button>Salvar</button>
        </form>
        <button onClick={closeModal} className={styles.closeBtn}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};
