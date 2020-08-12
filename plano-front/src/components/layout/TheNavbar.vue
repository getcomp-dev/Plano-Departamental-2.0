<template>
  <nav class="navbar-container shadow">
    <div @click="closeSidebar" class="navbar-brand">
      <router-link :to="{ name: 'dashboardHome' }" class="brand-title"
        >Plano Departamental
      </router-link>
    </div>

    <button @click.stop="toggleSidebar" type="button" class="btn-navbar">
      <font-awesome-icon
        :icon="['fas', sidebarVisibility ? 'times' : 'bars']"
      />
    </button>

    <ul class="navbar-nav">
      <li class="nav-item pr-0">
        <label class="m-0 pr-2" for="planoAtual">
          Plano atual
        </label>
        <select
          id="planoAtual"
          class="input-plano"
          v-model.number="planoIdForm"
          @change="changeCurrentPlano(planoIdForm)"
        >
          <option v-for="plano in allPlanos" :value="plano.id" :key="plano.id">
            {{ plano.ano }} - {{ plano.nome }}
          </option>
        </select>
      </li>
      <li class="nav-item" @click="$emit('show-modal', 'user')">
        <font-awesome-icon :icon="['fas', 'user']" />
        <span>Usuário</span>
      </li>
      <li class="nav-item" @click="$emit('show-modal', 'download')">
        <font-awesome-icon :icon="['fas', 'save']" />
        <span>Download</span>
      </li>
      <li class="nav-item" @click="$router.push({ name: 'logout' })">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        <span>Logout</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TheNavbar",
  data() {
    return {
      planoIdForm: null,
    };
  },
  created() {
    this.planoIdForm = this.currentPlanoId;
  },
  methods: {
    ...mapActions(["closeSidebar", "toggleSidebar", "changeCurrentPlano"]),
  },
  computed: {
    ...mapGetters(["sidebarVisibility", "allPlanos", "currentPlanoId"]),
  },
  watch: {
    currentPlanoId(newValue) {
      this.planoIdForm = newValue;
    },
  },
};
</script>

<style scoped>
.navbar-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: fixed;
  z-index: 945;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--navbar-height);
  background-color: #343a40;
  transition: all 0.2s ease;
}
/* brand */
.navbar-container > .navbar-brand {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  min-width: 160px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  color: #cdced0;
  background-color: #272b30;
  transition: all 0.2s ease;
}
.navbar-container > .navbar-brand > .brand-title {
  text-decoration: none;
  padding: 0;
  font-weight: 500;
  text-align: center;
  font-size: 15px;
  color: currentColor;
}
.navbar-container > .btn-navbar {
  width: 40px;
  min-width: 40px;
  height: 30px;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  border-left: #1f1f1f 2px solid;
  border-right: #1f1f1f 2px solid;
  color: #cdced0;
  background-color: #272b30;
  font-size: 20px;
  transition: all 0.2s ease;
}
.navbar-container > .navbar-brand:hover,
.navbar-container > .btn-navbar:hover {
  color: #ffffff !important;
}
.btn-navbar:focus,
.navbar-brand .brand-title:focus {
  box-shadow: none !important;
  border-color: #202020 !important;
}
/* nav */
ul.navbar-nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  height: 30px;
  padding: 0;
  margin: 0;
  padding: 0 5px;
  transition: all 0.2s ease;
}
ul.navbar-nav > li.nav-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 6px;
  margin: 0 3px;
  font-size: 12px;
  color: #9a9da0;
  cursor: pointer;
  transition: all 0.2s ease;
}
ul.navbar-nav > li.nav-item:hover {
  color: #fff;
}
ul.navbar-nav > li.nav-item span,
ul.navbar-nav > li.nav-item > label {
  min-width: max-content;
  line-height: 12px;
  position: relative;
  top: 1px;
}
ul.navbar-nav > li.nav-item svg {
  font-size: 12px;
  margin: 0 3px;
}
/* input plano */
ul.navbar-nav > li.nav-item .input-plano {
  text-align: start;
  width: 120px;
  height: 20px;
  font-size: 12px;
  border-radius: 3px;
  padding: 0 2px;
  color: currentColor;
  border: solid 1px #8d8d8d;
  background-color: #343a40;
}
ul.navbar-nav > li.nav-item .input-plano:hover {
  color: #ffffffbf;
  border-color: #ffffffbf;
}

@media screen and (max-width: 660px) {
  ul.navbar-nav > li.nav-item > span {
    display: none;
  }
  ul.navbar-nav li.nav-item {
    padding: 0 10px;
  }
}
@media screen and (max-width: 544px) {
  .navbar-container > .navbar-brand {
    width: 100% !important;
  }
  .navbar-container > .btn-navbar {
    position: fixed;
    top: 0;
    left: 0;
  }
  ul.navbar-nav {
    width: 100% !important;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
  }
  ul.navbar-nav > .nav-item:nth-of-type(2) {
    margin-left: auto;
  }
}
</style>
