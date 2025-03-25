import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../redux/root-reducer";
import { logOut, setUser } from "../../../redux/UserReducer/userSlice";
import { useEffect, useState } from "react";
import { EditProfileMd } from "../EditProfileMd/EditProfileMd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLogin } from "../../../redux/IsLoggedReducer/isLoggedSlice";

export const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      console.log("imagem" + image);

      const formData = new FormData();

      console.log("form data: " + formData);

      formData.append("image", file);

      console.log(`novo form data: ${formData}`);

      try {
        console.log("entrei no try");
        const response = await axios.put(
          `http://localhost:3000/users/uploads`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);
        const { filename } = response.data;
        console.log("Imagem: " + filename);

        await axios.put("http://localhost:3000/users/editUser", {
          id_user: user.id_user,
          user_image: filename,
          user_name: user.user_name,
          user_email: user.user_email,
        });

        dispatch(
          setUser({
            ...user,
            user_image: filename,
          })
        );
      } catch (e) {
        console.log(`Erro no try ${e}`);
      }
    }
  };

  const handleDeleteImage = async () => {
    dispatch(
      setUser({
        ...user,
        user_image: null,
      })
    );

    await axios.put("http://localhost:3000/users/editUser", {
      id_user: user.id_user,
      user_image: null,
      user_name: user.user_name,
      user_email: user.user_email,
    });
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.userImage}>
            {user.user_image ? (
              <div className={styles.userImage}>
                <img
                  src={
                    user.user_name
                      ? `http://localhost:3000/uploads/${user.user_image}`
                      : ""
                  }
                  alt=""
                />
                <button onClick={handleDeleteImage}>Apagar imagem</button>
              </div>
            ) : (
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />
            )}
          </div>
          <h1>{user.user_name}</h1>

          <p>
            Email: <span>{user.user_email}</span>
          </p>

          <div className={styles.buttonWrapper}>
            <button onClick={() => setModalState(true)}>Editar</button>
            <button onClick={() => setConfirmationModal(true)}>Sair</button>
          </div>
        </div>
      </div>
      {modalState && <EditProfileMd closeModal={() => setModalState(false)} />}
      {confirmationModal && (
        <div className={styles.confirmationContainer}>
          <div className={styles.confirmationModal}>
            <p>Deseja mesmo sair?</p>
            <div className={styles.btnWrapper}>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  dispatch(logOut());
                  dispatch(setLogin(false));
                  navigate("/");
                }}
              >
                Sim
              </button>
              <button onClick={() => setConfirmationModal(false)}>Não</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
