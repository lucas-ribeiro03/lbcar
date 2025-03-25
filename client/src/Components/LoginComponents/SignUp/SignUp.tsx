import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styles from "./style.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SignUpProps {
  signIn: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ signIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [savedEmails, setSavedEmails] = useState([""]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const getEmails = async () => {
      const response = await axios.get("http://localhost:3000/users/getUsers");
      const email = response.data.map(
        (user: { user_email: string }) => user.user_email
      );
      setSavedEmails(email);
      console.log(savedEmails);
    };
    getEmails();
  }, []);

  const navigate = useNavigate();

  const postUsers = async () => {
    try {
      if (!email) {
        toast("Insira um email válido");
      } else if (!name) {
        toast("Insira um nome válido");
      } else if (!password) {
        toast("Senha inválida");
      } else if (password !== confirmPassword) {
        toast("As senhas nao coincidem");
      } else if (savedEmails.find((savedEmail) => savedEmail === email)) {
        toast("Email já cadastrado");
      } else {
        await axios.post("http://localhost:3000/users/cadastro", {
          name,
          email,
          password,
        });

        navigate("/");
        toast("Cadastro realizado com sucesso");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={styles.body}>
        <ToastContainer autoClose={2000} position="top-right" />
        <div className={styles.container}>
          <div className={styles.containerHeaderWrapper}>
            <h1>Sign In</h1>
            <span>
              Já tem uma conta?
              <button onClick={signIn} className={styles.signUpBtn}>
                {" "}
                Login
              </button>
            </span>
          </div>
          <div className={styles.mainContainer}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                postUsers();
              }}
            >
              <label htmlFor="name">Nome</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                name="name"
                id="name"
              />

              <label htmlFor="email-input">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                name=""
                id="email-input"
              />

              <label htmlFor="password-input">Senha</label>
              <div className={styles.inputBox}>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password-input"
                />

                {passwordVisible ? (
                  <FaEye
                    className={styles.eyeButton}
                    onClick={() => setPasswordVisible(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className={styles.eyeButton}
                    onClick={() => setPasswordVisible(true)}
                  />
                )}
              </div>

              <label htmlFor="confirm-password-input">Confirmar Senha</label>
              <div className={styles.inputBox}>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirm-password-input"
                  id="confirm-password-input"
                />
                {confirmPasswordVisible ? (
                  <FaEye
                    className={styles.eyeButton}
                    onClick={() => setConfirmPasswordVisible(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className={styles.eyeButton}
                    onClick={() => setConfirmPasswordVisible(true)}
                  />
                )}
              </div>

              <button className={styles.loginBtn}>Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
