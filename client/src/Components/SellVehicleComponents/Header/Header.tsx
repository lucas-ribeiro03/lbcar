import styles from "./style.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.headerTitle}>
        <img
          src="https://garagem360.com.br/wp-content/uploads/2025/02/chave-do-carro.jpg"
          alt=""
        />
        <h1>Venda seu veículo</h1>
      </div>

      <div className={styles.subtitle}>
        <h1>Venha vender seu veículo</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
          obcaecati impedit accusantium fuga quasi omnis consectetur consequatur
          sapiente nostrum. Optio numquam deserunt nemo doloribus nobis sit
          voluptate harum? Molestias, iste!
        </p>
      </div>
    </div>
  );
};
