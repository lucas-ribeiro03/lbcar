import styles from "./style.module.scss";
import lbLogo from "../../assets/lb-logo.png";
import { Link } from "react-router-dom";
import { CiMail, CiInstagram } from "react-icons/ci";
import { FaWhatsapp, FaTiktok, FaYoutube } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
export const Footer: React.FC = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.leftFooterContainer}>
        <img src={lbLogo} alt="" />
      </div>

      <div className={styles.rightFooterContainer}>
        <div className={styles.institucional}>
          <h1>Institucional</h1>
          <Link to="/">Home</Link>
          <Link to="/about-us">Sobre nós</Link>
          <Link to="/contato">Fale conosco</Link>
          <Link to="/">Politica de privacidade</Link>
        </div>
        <div className={styles.veiculos}>
          <h1>Veículos</h1>
          <Link to="/todos-os-veiculos">Destaques</Link>
          <Link to="/todos-os-veiculos">0 Km</Link>
          <Link to="/todos-os-veiculos">Seminovos</Link>
          <Link to="/todos-os-veiculos">Venda seu veículo</Link>
          <Link to="/financiamento">Financiamento</Link>
        </div>
        <div className={styles.atendimento}>
          <h1>Atendimento</h1>
          <span>
            <CiMail />
            contato@lbcar.com.br
          </span>
          <span>
            <FaWhatsapp />
            (21) 9 3333-3333
          </span>
          <span>
            <IoLocationOutline />
            Realengo, Rio de janeiro
          </span>

          <div className={styles.social}>
            <FaWhatsapp />
            <FaTiktok />
            <FaYoutube />
            <CiInstagram />
          </div>
        </div>
      </div>
    </div>
  );
};
