import { useState } from "react";
import { SignIn } from "../../Components/LoginComponents/SignIn/SignIn";
import { SignUp } from "../../Components/LoginComponents/SignUp/SignUp";
import styles from "./style.module.scss";

export const Login: React.FC = () => {
  const [signingIn, setSigninIn] = useState(true);
  return (
    <div className={styles.container}>
      {signingIn ? (
        <SignIn signUp={() => setSigninIn(false)} />
      ) : (
        <SignUp signIn={() => setSigninIn(true)} />
      )}
    </div>
  );
};
