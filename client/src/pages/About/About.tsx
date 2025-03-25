import styles from "./style.module.scss";
import { BsTelephoneFill } from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";
import { AiFillSafetyCertificate } from "react-icons/ai";

export const About: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <h1>Sobre nós</h1>
        </div>

        <div className={styles.aboutSection}>
          <div className={styles.aboutSectionContainer}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At
              expedita, ea quo quae maiores soluta, praesentium ullam neque
              voluptatem distinctio voluptate commodi voluptatibus ipsam modi
              ducimus eum, nulla tempore dicta. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. At expedita, ea quo quae maiores
              soluta, praesentium ullam neque voluptatem distinctio voluptate
              commodi voluptatibus ipsam modi ducimus eum, nulla tempore dicta.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At
              expedita, ea quo quae maiores soluta, praesentium ullam neque
              voluptatem distinctio voluptate commodi voluptatibus ipsam modi
              ducimus eum, nulla tempore dicta.
            </p>
            <img
              src="https://img.freepik.com/fotos-gratis/vista-lateral-jovem-apertando-as-maos-com-o-negociante-de-carro_23-2148384947.jpg"
              alt=""
            />
          </div>
        </div>
        <h1>Nossos Diferenciais</h1>
        <div className={styles.diferenciaisSection}>
          <div
            className={styles.diferenciaisSectionContainer}
            style={{ background: "#d72638" }}
          >
            <BsTelephoneFill />
            <h3>Atendimento personalizado</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. In
              suscipit maxime numquam accusamus, dolores assumenda veritatis
              blanditiis deleniti inventore ratione repellendus itaque
              voluptate, praesentium hic amet ducimus voluptatibus voluptatum
              reiciendis.
            </p>
          </div>
          <div
            className={styles.diferenciaisSectionContainer}
            style={{ background: "#1c1c1c" }}
          >
            <ImPriceTag />
            <h3>Preço Justo</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
              laboriosam placeat sunt necessitatibus reiciendis temporibus
              officiis nemo ea nam a quo expedita, iusto beatae dignissimos
              voluptas quis quasi labore consequuntur.
            </p>
          </div>
          <div
            style={{ background: "#d72638" }}
            className={styles.diferenciaisSectionContainer}
          >
            <AiFillSafetyCertificate />
            <h3>Garantia</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
              illo incidunt, fugit aspernatur deleniti beatae tempora itaque
              saepe maxime sequi molestiae eum debitis aliquid a hic quis sit
              sed atque!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
