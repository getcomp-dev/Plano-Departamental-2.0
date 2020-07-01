<template>
  <div id="loginForm" class="text-center">
    <div class="card ml-auto mr-auto">
      <div class="card-header">
        <h1 class="card-title">Login</h1>
      </div>
      <div class="card-body">
        <form class="form-signin" @submit.prevent="doLogin">
          <b-alert :show="Boolean(error)" variant="danger" dismissible>{{
            error
          }}</b-alert>
          <label for="login" class="sr-only">Usuário</label>
          <input
            v-focus
            type="text"
            id="login"
            class="form-control"
            placeholder="Usuário"
            v-model.trim="form.login"
          />
          <label for="senha" class="sr-only">Senha</label>
          <input
            type="password"
            id="senha"
            class="form-control"
            placeholder="Senha"
            v-model.trim="form.senha"
          />
          <button class="btn btn-sm btn-block mt-3" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheLogin",
  data() {
    return {
      form: {
        login: "",
        senha: "",
      },
      error: undefined,
    };
  },

  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      },
    },
  },

  methods: {
    doLogin() {
      this.$store
        .dispatch("authenticate", this.form)
        .then(() => {
          if (this.$store.state.route.query.redirect) {
            this.$router.replace(this.$store.state.route.query.redirect);
          } else {
            this.$router.replace("/dashboard");
          }
        })
        .catch((error) => {
          if (error.response) {
            this.error = error.response.data.message;
          } else {
            this.error = "Erro na requisição! Tente novamente.";
          }
        });
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
};
</script>

<style scoped>
#loginForm {
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  height: 100%;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-control {
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 14px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: 10px;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
}
input {
  height: 28px !important;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
}
.card {
  border: none;
  box-shadow: 0 10px 20px rgba(49, 68, 177, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
}
.card-header {
  min-height: 50px;
  max-height: 50px;
  background-color: #dcdcdc;
  border-color: rgb(209, 209, 209);
}
.card-title {
  font-size: 22px;
  font-weight: 300;
  text-transform: uppercase;
}
.card-body {
  background-color: #faf8f8;
}
.btn {
  background-color: #c0c0c0;
  border-radius: 15px;
  color: #262626;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}
.btn:hover {
  background-color: #808080;
  border-color: #808080;
  box-shadow: 0px 15px 20px rgba(68, 83, 102, 0.4);
  transform: translateY(-3px);
}
</style>
