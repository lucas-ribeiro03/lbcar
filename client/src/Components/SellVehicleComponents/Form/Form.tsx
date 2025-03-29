import styles from "./style.module.scss";
import { useForm } from "react-hook-form";

interface FormData {
  nome_completo: string;
  cpf: string;
  whatsapp: string;
  marca: string;
  modelo: string;
  ano: string;
  cor: string;
  valor: string;
}

export const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  console.log(errors);

  const onSubmit = (data: FormData) => {
    console.log("Dados enviados:", data);
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length >= 11) {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "$1 $2-$3");
    } else if (cleaned.length >= 10) {
      return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, "$1 $2-$3");
    }

    return cleaned;
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não for número
      .replace(/(\d{3})(\d)/, "$1.$2") // Coloca o primeiro ponto
      .replace(/(\d{3})(\d)/, "$1.$2") // Coloca o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca o traço
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1>Fale Conosco</h1>
        <p>Insira abaixo informações sobre o veículo</p>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputBox} style={{ gridArea: "box-1" }}>
              <label htmlFor="nome">Nome completo *</label>
              <input
                type="text"
                id="nome"
                maxLength={40}
                {...register("nome_completo", { required: true })}
              />
              {errors?.nome_completo?.type === "required" && (
                <div className={styles.errorMessage}>Campo obrigatório</div>
              )}
            </div>

            <div className={styles.inputBox} style={{ gridArea: "box-2" }}>
              <label htmlFor="email">CPF *</label>
              <input
                type="text"
                id="cpf"
                maxLength={14}
                {...register("cpf", { required: true })}
                onChange={(e) =>
                  setValue("cpf", formatCPF(e.target.value), {
                    shouldValidate: true,
                  })
                }
              />
              {errors?.cpf?.type === "required" && (
                <div className={styles.errorMessage}>Campo obrigatório</div>
              )}
            </div>

            <div className={styles.inputBox} style={{ gridArea: "box-3" }}>
              <label htmlFor="whatsapp">Whatsapp *</label>
              <input
                type="text"
                id="whatsapp"
                maxLength={14}
                {...register("whatsapp", { required: true })}
                onChange={(e) =>
                  setValue("whatsapp", formatPhone(e.target.value), {
                    shouldValidate: true,
                  })
                }
              />
              {errors?.whatsapp?.type === "required" && (
                <div className={styles.errorMessage}>Campo obrigatório</div>
              )}
            </div>

            <div className={styles.inputBox} style={{ gridArea: "box-4" }}>
              <label htmlFor="marca">Marca do veículo *</label>
              <input
                type="text"
                id="marca"
                {...register("marca", { required: true })}
              />
              {errors?.marca?.type === "required" && (
                <div className={styles.errorMessage}>Campo obrigatório</div>
              )}
            </div>

            <div className={styles.inputBox} style={{ gridArea: "box-5" }}>
              <label htmlFor="modelo">Modelo do veículo *</label>
              <input
                type="text"
                id="modelo"
                {...register("modelo", { required: true })}
              />
              {errors?.modelo?.type === "required" && (
                <div className={styles.errorMessage}>Campo obrigatório</div>
              )}
            </div>

            <div className={styles.inputBox} style={{ gridArea: "box-6" }}>
              <label htmlFor="ano">Ano do veículo *</label>
              <input
                type="text"
                id="ano"
                {...register("ano", { required: true })}
              />
              {errors?.ano?.type === "required" && (
                <div className={styles.errorMessage}>Campo obrigatório</div>
              )}
            </div>

            <div className={styles.inputBox} style={{ gridArea: "box-7" }}>
              <label htmlFor="cor">Cor do veículo *</label>
              <input
                type="text"
                id="cor"
                {...register("cor", { required: true })}
              />
              {errors?.cor?.type === "required" && (
                <div className={styles.errorMessage}>Campo obrigatório</div>
              )}
            </div>

            <div className={styles.inputBox} style={{ gridArea: "box-8" }}>
              <label htmlFor="valor">Valor pedido *</label>
              <input
                type="text"
                id="valor"
                {...register("valor", { required: true })}
              />
              {errors?.valor?.type === "required" && (
                <div className={styles.errorMessage}>Campo obrigatório</div>
              )}
            </div>

            <button
              className={styles.enviar}
              style={{ gridArea: "box-9" }}
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
