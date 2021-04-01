<template>
  <div v-if="pageVisibility" class="login-container">
    <div class="card ml-auto mr-auto">
      <div class="card-header">
        <Logo />
      </div>

      <div class="card-body">
        <h2 class="sub-title">Login</h2>

        <form class="form-login" @submit.prevent="doLogin">
          <VInput
            v-model="form.login"
            placeholder="Usuário"
            :upperCase="false"
            :validation="$v.form.login"
            class="mb-2"
            v-focus
          />
          <VInputPassword placeholder="Senha" v-model="form.senha" :validation="$v.form.senha" />

          <button type="submit" class="btn btn-sm btn-block mt-4 mb-3">Entrar</button>
        </form>

        <span v-if="error" class="alert-error">
          {{ error }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { Logo, VInput, VInputPassword } from "@/components/ui";

export default {
  name: "Login",
  components: { Logo, VInput, VInputPassword },
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
      pageVisibility: false,
      error: null,
    };
  },
  validations: {
    form: {
      login: { required },
      senha: { required },
    },
  },

  created() {
    this.checkIfIsAlreadyLogged();
  },

  methods: {
    async checkIfIsAlreadyLogged() {
      try {
        await this.$store.dispatch("fetchUsuario");
        this.$router.replace("/home");
      } catch (error) {
        this.pageVisibility = true;
      }
    },

    async doLogin() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.$store.dispatch("authenticate", this.form);
        if (this.$store.state.route.query.redirect) {
          this.$router.replace(this.$store.state.route.query.redirect);
        } else {
          this.$router.replace("/dashboard");
        }
      } catch (error) {
        this.error = error.response
          ? error.response.data.message
          : "Erro na requisição! Tente novamente.";
        //Tempo que a mensagem de erro será exibida
        setTimeout(() => {
          this.error = null;
        }, 3000);
      } finally {
        this.setLoading({ type: "partial", value: false });
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
  box-shadow: 0 0 25px rgba(39, 39, 39, 0.2);
  color: $clr-text;
  transition: all 0.3s ease;

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
    height: auto;
    width: 300px;
    padding: 1.25rem 2rem;
    transition: all 0.3s ease;

    > .sub-title {
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0;
    }

    > form.form-login {
      width: 100%;
      margin: 0.5rem auto;
      padding: 0;

      > button.btn {
        box-shadow: 0px 2px 10px rgba(59, 59, 59, 0.2);
        background-color: $clr-gray;
        font-weight: bold;
        transition: all 0.3s ease;
        &:hover {
          filter: brightness(110%);
        }
      }
    }

    > .alert-error {
      display: block;
      position: relative;
      width: 100%;
      margin: 0 auto;
      padding: 1rem 0.5rem;
      font-size: 11px;
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
      animation: fadeIn 1s ease;
    }
  }
}
</style>
