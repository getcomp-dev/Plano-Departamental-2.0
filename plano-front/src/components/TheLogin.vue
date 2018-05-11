<template>
  <div id="loginForm" class="text-center">
    <form class="form-signin" v-on:submit.prevent="doLogin">
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <b-alert :show="Boolean(error)" variant="danger" dismissible>
        {{error}}
      </b-alert>
      <label for="login" class="sr-only">Usuário</label>
      <input type="text" id="login" class="form-control" placeholder="Usuário" v-model.trim="form.login">
      <label for="senha" class="sr-only">Senha</label>
      <input type="password" id="senha" class="form-control" placeholder="Senha" v-model.trim="form.senha">
      <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TheLogin',

  data () {
    return {
      form: {
        login: undefined,
        senha: undefined
      },
      error: undefined
    }
  },

  methods: {
    doLogin () {
      this.$store.dispatch('authenticate', this.form).then(() => {
        if (this.$store.state.route.query.redirect) {
          this.$router.replace(this.$store.state.route.query.redirect)
        } else {
          this.$router.replace('/dashboard')
        }
      }).catch((error) => {
        if (error.response) {
          this.error = error.response.data.message
        } else {
          this.error = 'Erro na requisição! Tente novamente.'
        }
      })
    }
  },

  beforeCreate () {
    this.$store.dispatch('fetchUsuario').then(() => {
      this.$router.replace('/dashboard')
    }).catch(() => {})
  }
}
</script>

<style scoped>
#loginForm {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
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
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
