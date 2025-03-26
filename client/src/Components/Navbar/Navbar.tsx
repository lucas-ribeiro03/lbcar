import styles from "./style.module.scss";
import lbLogo from "../../assets/lb-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { RootReducer } from "../../redux/root-reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLogin } from "../../redux/IsLoggedReducer/isLoggedSlice";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Navbar: React.FC = () => {
  const { login } = useSelector(
    (rootReducer: RootReducer) => rootReducer.IsLoggedReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(login);

  useEffect(() => {
    if (token) {
      dispatch(
        setLogin({
          login: true,
        })
      );
    }
  }, [dispatch, token]);

  return (
    <div className={styles.navbarContainer}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <nav>
        <div className={styles.leftContainer}>
          <Link to="/">
            <img src={lbLogo} alt="logo" />
          </Link>
        </div>

        <div className={styles.rightContainer}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/veiculos">Carros</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  if (login) {
                    navigate("/venda-seu-veiculo");
                  } else {
                    toast.warn("Você precisa estar logado");
                  }
                }}
              >
                Venda
              </button>
            </li>
            <li>
              {login.login === true ? (
                <Link to="/perfil">Perfil</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              {login.login === true ? null : (
                <Link to="/login">Cadastrar-se</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
