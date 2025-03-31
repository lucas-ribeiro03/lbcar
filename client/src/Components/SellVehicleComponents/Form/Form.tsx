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

  const onSubmit = async (data: FormData) => {
    console.log("dados enviados", data);
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
    console.log("formtando");
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
                {...register("cpf", {
                  required: true,
                  validate: (value) => {
                    const cpfLimpo = value.replace(/[^\d]/g, "");
                    if (cpfLimpo.length < 11) return "Cpf inválido";
                    const firstDigit = () => {
                      const cpfArray = Array.from(cpfLimpo).slice(0, 9);

                      const cpfIndex = cpfArray
                        .reverse()
                        .map((numeros, index) => {
                          const constantes = index + 2;
                          const valores = Number(numeros) * constantes;
                          return valores;
                        });

                      const soma = cpfIndex.reduce((num, acumulador) => {
                        return (acumulador += num);
                      }, 0);
                      const primeiroDigito = 11 - (soma % 11);
                      return String(primeiroDigito);
                    };

                    const secondDigit = () => {
                      const cpfArray = Array.from(cpfLimpo).slice(0, 9);

                      const primeiroDigito = firstDigit();

                      cpfArray.push(primeiroDigito);

                      const cpfIndex = cpfArray
                        .reverse()
                        .map((numeros, index) => {
                          const constantes = index + 2;
                          const valores = Number(numeros) * constantes;
                          return valores;
                        });

                      const soma = cpfIndex.reduce((num, acumulador) => {
                        return (acumulador += num);
                      });

                      const segundoDigito = 11 - (soma % 11);
                      return segundoDigito;
                    };

                    const primeiroDigito = firstDigit();
                    const segundoDigito = secondDigit();

                    if (primeiroDigito + segundoDigito === cpfLimpo.slice(9)) {
                      return true;
                    } else {
                      return "Cpf inválido";
                    }
                  },
                })}
                onBlur={(e) => {
                  const formattedCpf = formatCPF(e.target.value);
                  setValue("cpf", formattedCpf, {
                    shouldValidate: true,
                  });
                }}
              />

              {errors?.cpf?.type === "required" && (
                <div className={styles.errorMessage}>Campo obrigatório</div>
              )}

              {errors?.cpf?.type === "manual" && (
                <div className={styles.errorMessage}>Cpf inválido</div>
              )}
            </div>

            <div className={styles.inputBox} style={{ gridArea: "box-3" }}>
              <label htmlFor="whatsapp">Whatsapp *</label>
              <input
                type="text"
                id="whatsapp"
                maxLength={14}
                {...register("whatsapp", { required: true })}
                onBlur={(e) => {
                  setValue("whatsapp", formatPhone(e.target.value));
                }}
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
