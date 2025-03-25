import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import bcrypt from "bcryptjs";

import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { setLogin } from "../../../redux/IsLoggedReducer/isLoggedSlice";
import { Users } from "../../../data/Database";
import { setUser } from "../../../redux/UserReducer/userSlice";

import styles from "./style.module.scss";

interface SignInProps {
  signUp: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ signUp }) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const postGoogleUsers = async () => {
        const { email, name } = userInfo.data;
        const password = email + name + tokenResponse.access_token;

        const response = await axios.get(
          "http://localhost:3000/users/getUsers",
          {
            params: {
              user_email: email,
              user_password: password,
            },
          }
        );

        const user = response.data.find(
          (user: Users) => user.user_email === email
        );

        if (user) {
          dispatch(
            setLogin({
              login: true,
            })
          );

          dispatch(
            setUser({
              id_user: user.id_user,
              user_name: user.user_name,
              user_email: user.user_email,
              user_image: user.user_image ? user.user_image : undefined,
            })
          );
          const responsePost = await axios.post(
            "http://localhost:3000/tokens",
            {
              name,
              email,
            }
          );
          const { token } = responsePost.data;
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          axios.post("http://localhost:3000/users/cadastro", {
            name,
            email,
            password,
          });
          navigate("/");
        }
      };
      postGoogleUsers();
    },
  });

  const Handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:3000/users/getUsers", {
      params: {
        user_password: inputPassword,
        user_email: inputEmail,
      },
    });

    const user = response.data.find(
      (user: Users) => user.user_email === inputEmail
    );

    if (!user) {
      toast("Email não cadastrado");
    } else if (!bcrypt.compareSync(inputPassword, user.user_password)) {
      toast("Senha incorreta");
    } else {
      dispatch(
        setLogin({
          login: true,
        })
      );
      dispatch(
        setUser({
          id_user: user.id_user,
          user_name: user.user_name,
          user_email: user.user_email,
          user_image: user.user_image ? user.user_image : undefined,
        })
      );

      const responsePost = await axios.post("http://localhost:3000/tokens", {
        id: user.id_user,
        inputEmail,
      });

      const { token } = responsePost.data;
      localStorage.setItem("token", token);

      navigate("/");
    }
  };

  return (
    <div className={styles.body}>
      <ToastContainer autoClose={2000} />
      <div className={styles.container}>
        <div className={styles.containerHeaderWrapper}>
          <h1>Sign In</h1>
          <span>
            Não tem uma conta?
            <button onClick={signUp} className={styles.signUpBtn}>
              {" "}
              Registre-se
            </button>
          </span>
        </div>
        <div className={styles.mainContainer}>
          <form onSubmit={Handlelogin}>
            <label htmlFor="email-input">Email</label>
            <input
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              type="email"
              name="email-input"
              id="email-input"
            />

            <label htmlFor="password-input">Senha</label>
            <div className={styles.inputBox}>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={inputPassword}
                type={passwordVisible ? "text" : "password"}
                name="password-input"
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

            <button className={styles.loginBtn}>Login</button>
          </form>
          <span>Or</span>
          <button className={styles.googleBtn} onClick={() => googleLogin()}>
            <FcGoogle className={styles.googleIcon} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};
