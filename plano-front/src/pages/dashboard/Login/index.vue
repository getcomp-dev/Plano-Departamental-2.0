<template>
  <div class="login-container">
    <div class="card ml-auto mr-auto">
      <div class="card-header">
        <Logo />
      </div>

      <div class="card-body" :class="{ 'padding-error': error != null }">
        <h2 class="sub-title">Login</h2>

        <form class="form-login" @submit.prevent="handleLogin">
          <label for="userLogin" class="sr-only">Usuário</label>
          <input
            type="text"
            id="userLogin"
            class="form-control"
            placeholder="Usuário"
            v-model="form.login"
            v-focus
          />

          <label for="userSenha" class="sr-only">Senha</label>
          <InputPassword
            id="userSenha"
            placeholder="Senha"
            classes="form-control"
            iconSize="10"
            v-model="form.senha"
          />
          <button type="submit" class="btn btn-sm btn-block mt-4 mb-3">Entrar</button>

          <span v-show="error != null" class="alert alert-danger">
            {{ error }}
          </span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Logo, InputPassword } from "@/components/ui";

export default {
  name: "Login",
  components: { Logo, InputPassword },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      form: {
        login: "",
        senha: "",
      },
      error: null,
    };
  },

  beforeCreate() {
    this.$store
      .dispatch("fetchUsuario")
      .then(() => {
        this.$router.replace("/dashboard");
      })
      .catch(() => {});
  },

  methods: {
    async handleLogin() {
      try {
        this.setLoading({ type: "partial", value: true });

        await this.$store.dispatch("authenticate", this.form);
        if (this.$store.state.route.query.redirect) {
          this.$router.replace(this.$store.state.route.query.redirect);
        } else {
          this.$router.replace("/dashboard");
        }
      } catch (error) {
        this.setLoading({ type: "partial", value: false });
        this.error = error.response
          ? error.response.data.message
          : "Erro na requisição! Tente novamente.";
        //Tempo que a mensagem de erro será exibida
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$clr-light-gray: #f6f6f6;
$clr-gray: #c3c3c3;
$clr-text: #262626;

.login-container {
  position: relative;
  background-color: #e7e7e7;
  width: 100vw;
  height: 100vh;
}

.card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  text-align: center;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  color: $clr-text;

  > .card-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 5px;
    background-color: $clr-gray;
    font-size: 18px;
  }

  .card-body {
    background-color: $clr-light-gray;
    transition: all 0.3s;
    &.padding-error {
      padding-bottom: 4rem;
    }

    > .sub-title {
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0;
    }

    > form {
      width: 100%;
      width: 250px !important;
      padding: 10px 20px;
      margin: auto;
      position: relative;

      ::v-deep .form-control {
        color: $clr-text;
        width: 100%;
        padding: 2px 10px;
        font-size: 14px;
        margin-bottom: 10px;
        height: 30px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
      }

      > button.btn {
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease 0s;
        background-color: $clr-gray;
        font-weight: bold;
        &:hover {
          filter: brightness(110%);
        }
      }

      > .alert {
        width: 200px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 11px;
        margin: 0 !important;
      }
    }
  }
}
</style>
