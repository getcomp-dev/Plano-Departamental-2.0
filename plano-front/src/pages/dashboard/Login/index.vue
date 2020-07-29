<template>
  <div class="login-container">
    <div class="card ml-auto mr-auto">
      <div class="card-header">
        <h1 class="card-title">Login</h1>
      </div>
      <div class="card-body" :class="{ 'padding-error': error != null }">
        <form class="form-signin" @submit.prevent="handleLogin">
          <label for="userLogin" class="sr-only">Usuário</label>
          <input
            v-focus
            type="text"
            id="userLogin"
            class="form-control"
            placeholder="Usuário"
            v-model="form.login"
          />

          <label for="userSenha" class="sr-only">Senha</label>
          <InputPassword
            :id="'userSenha'"
            :placeholder="'Senha'"
            :classes="'form-control'"
            :iconSize="12"
            v-model="form.senha"
          />
          <button type="submit" class="btn btn-sm btn-block mt-4 mb-3">
            Entrar
          </button>

          <b-alert
            :show="Boolean(error) ? 3 : false"
            @dismissed="error = null"
            variant="danger"
            dismissible
            fade
            >{{ error }}</b-alert
          >
        </form>
      </div>
    </div>
    <TheLoadingView :visibility="loadingState !== 'completed'" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { TheLoadingView } from "@/components/layout";
import { InputPassword } from "@/components/ui";

export default {
  name: "TheLogin",
  components: { TheLoadingView, InputPassword },
  data() {
    return {
      form: {
        login: "",
        senha: "",
      },
      error: null,
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      },
    },
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
    ...mapActions(["setLoadingState"]),

    async handleLogin() {
      try {
        this.setLoadingState("entire");
        await this.$store.dispatch("authenticate", this.form);
        if (this.$store.state.route.query.redirect)
          this.$router.replace(this.$store.state.route.query.redirect);
        else this.$router.replace("/dashboard");
      } catch (error) {
        if (error.response) this.error = error.response.data.message;
        else this.error = "Erro na requisição! Tente novamente.";
      } finally {
        this.setLoadingState("completed");
      }
    },
  },
  computed: {
    ...mapGetters(["loadingState"]),
  },
};
</script>

<style scoped>
.login-container {
  position: relative;
  background-color: #f5f5f5;
  width: 100vw;
  height: 100vh;
  text-align: center;
}
.card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -125px);
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19);
}
.card-header {
  height: 50px;
  background-color: #dcdcdc;
}
.card-title {
  font-size: 22px;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.card-body {
  background-color: #faf8f8;
  transition: all 0.3s;
}
.padding-error {
  padding-bottom: 4rem;
}

.form-signin {
  width: 100%;
  width: 250px !important;
  padding: 10px 20px;
  margin: auto;
  position: relative;
}
::v-deep .card-body > .form-signin .form-control {
  width: 100%;
  padding: 2px 10px;
  font-size: 14px;
  margin-bottom: 10px;
  height: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
}

.btn {
  background-color: #adadad;
  border-radius: 15px;
  color: #262626;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  font-weight: bold;
}
.btn:hover {
  filter: brightness(80%);
}
.alert {
  width: 200px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  text-align: center;
  margin: 0 !important;
}
</style>
