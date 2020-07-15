<template>
  <nav class="navbar navbar-dark bg-dark shadow">
    <div class="brand">
      <div @click="$store.commit('CLOSE_SIDEBAR')" class="navbar-brand">
        <router-link :to="{ name: 'dashboard' }" class="brand-title"
          >Plano Departamental
        </router-link>
      </div>

      <button
        @click.stop="$store.commit('TOGGLE_SIDEBAR')"
        type="button"
        class="btn-navbar"
      >
        <i :class="sidebarVisibility ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>
    </div>

    <ul class="navbar-nav">
      <li class="nav-link mr-1 pr-0">
        <label class="m-0 pr-2" for="planoAtual">
          Plano atual
        </label>
        <select
          id="planoAtual"
          class="input-plano"
          type="text"
          v-model.number="currentPlano"
          @change="changePlano()"
        >
          <option v-for="plano in Planos" :value="plano.id" :key="plano.id">
            {{ plano.nome }} - {{ plano.ano }}
          </option>
        </select>
      </li>
      <li class="nav-link" @click="$emit('show-modal', 'user')">
        <i class="fas fa-user"></i>
        <span>Usuário</span>
      </li>
      <li class="nav-link" @click="$emit('show-modal', 'download')">
        <i class="fas fa-save"></i>
        <span>Download</span>
      </li>
      <li class="nav-link" @click="$router.push({ name: 'logout' })">
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  name: "TheNavbar",
  data() {
    return {
      currentPlano: null,
    };
  },
  created() {
    this.currentPlano = parseInt(localStorage.getItem("Plano"), 10);
  },
  methods: {
    async changePlano() {
      try {
        this.$store.commit("COMPONENT_LOADING");

        setTimeout(async () => {
          await localStorage.setItem("Plano", this.currentPlano);
          await this.$store.dispatch("fetchAll");
          this.$socket.open();
          this.$store.commit("COMPONENT_LOADED");
        }, 300);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["sidebarVisibility"]),
    Planos() {
      const planosResultantes = _.orderBy(this.$store.state.plano.Plano, "ano");

      if (this.onDevelopmentMode) return planosResultantes;
      else return _.filter(planosResultantes, (plano) => plano.ano != 2099);
    },
    onDevelopmentMode() {
      return window.location.href.includes("localhost");
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  z-index: 945;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--navbar-height);
  margin: 0;
  padding: 0;
  border-width: 0;
  border-radius: 0;
  transition: all 300ms ease;
}
.brand {
  width: max-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
}
.brand .navbar-brand {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px !important;
  max-width: 160px !important;
  min-width: max-content !important;
  margin: 0;
  padding: 0;
  cursor: pointer;
  background-color: #00000040;
}
.brand .navbar-brand .brand-title {
  text-decoration: none;
  padding: 0;
  font-weight: 500;
  text-align: center;
  font-size: 15px;
  color: #cdced0 !important;
}
.brand .btn-navbar {
  width: 40px !important;
  height: 30px;
  padding: 0 !important;
  margin: 0px !important;
  height: 30px !important;
  border: none;
  outline: none;
  border-left: #202020 2px solid;
  border-right: #202020 2px solid;
  color: #cdced0 !important;
  background-color: #00000040 !important;
  font-size: 20px !important;
}
.brand .btn-navbar:focus,
.brand .navbar-brand .brand-title:focus {
  box-shadow: none !important;
  border-color: #202020 !important;
}
.brand .btn-navbar i {
  font-size: 20px !important;
}
.brand .navbar-brand .brand-title:hover,
.brand .btn-navbar:hover {
  color: #ffffff !important;
}

.input-plano {
  text-align: start;
  width: 120px;
  height: 18px;
  font-size: 12px;
  border-radius: 2px;
  padding: 0 1px;
  color: #ffffff80;
  border: solid 1px #b9b9b993;
  background-color: #343a40;
}
.input-plano:hover {
  color: #ffffffbf;
  border-color: #ffffffbf;
}

.navbar-nav {
  margin-left: auto;
  padding: 0;
  padding-right: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 30px;
}
.navbar-nav li.nav-link {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-size: 12px;
  cursor: pointer;
  padding: 0 6px;
  margin: 0 3px;
}
.navbar-nav li.nav-link i {
  margin: 0 3px;
}

@media screen and (max-width: 654px) {
  .navbar-nav li.nav-link span {
    opacity: 0;
    display: none;
  }
  .navbar-nav li.nav-link {
    font-size: 13px !important;
    padding: 0 10px;
  }
}
@media screen and (max-width: 470px) {
  .brand {
    flex-direction: row-reverse !important;
    width: 100% !important;
  }
  .brand .navbar-brand {
    width: 100% !important;
    max-width: 100% !important;
  }

  .navbar-nav {
    width: 100% !important;
    margin-left: 0 !important;
    justify-content: space-between !important;
    padding-left: 40px !important; /* button space */
    padding-right: 0;
  }
  .navbar-nav li.nav-link {
    flex: 1;
  }
}
</style>
