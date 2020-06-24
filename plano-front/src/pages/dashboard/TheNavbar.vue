<template>
  <nav class="navbar navbar-dark bg-dark shadow">
    <div class="brand">
      <div @click="emitCloseSidebar()" class="navbar-brand">
        <router-link :to="{ name: 'dashboard' }" class="brand-title"
          >Plano Departamental
        </router-link>
      </div>
      <button
        @click.stop="$emit('toggle-sidebar')"
        type="button"
        class="btn-navbar"
      >
        <i :class="sidebarVisibility ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>
    </div>

    <ul class="navbar-nav">
      <li
        v-if="Admin"
        class="nav-link"
        v-on:click="$emit('show-modal', 'user')"
      >
        <i class="fas fa-user"></i>
        <span>Usuário</span>
      </li>

      <li
        class="nav-link"
        v-on:click="$emit('show-modal', 'load')"
        v-if="Admin"
      >
        <i class="fas fa-folder-open"></i>
        <span>Carregar</span>
      </li>
      <li
        class="nav-link"
        v-on:click="$emit('show-modal', 'save')"
        v-if="Admin"
      >
        <i class="fas fa-file"></i>
        <span>Salvar</span>
      </li>
      <li class="nav-link" v-on:click="$emit('show-modal', 'download')">
        <i class="fas fa-save"></i>
        <span>Download</span>
      </li>
      <li class="nav-link" v-on:click="routerLogout()">
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { EventBus } from "@/event-bus.js";

export default {
  name: "TheNavbar",
  props: {
    sidebarVisibility: { type: Boolean, required: true },
  },
  methods: {
    routerLogout() {
      this.$router.push({ name: "logout" });
    },
    emitCloseSidebar() {
      EventBus.$emit("close-sidebar");
    },
  },
  computed: {
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: var(--navbar-height);
  margin: 0;
  padding: 0;
  border-width: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  transition: all 300ms ease;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 800;
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
  -webkit-box-shadow: inset -1px 0 0 #00000040;
  -moz-box-shadow: inset -1px 0 0 #00000040;
  box-shadow: inset -1px 0 0 #00000040;
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
  -webkit-box-shadow: inset -1px 0 0 #00000040;
  box-shadow: inset -1px 0 0 #00000040;
  outline: none;
  color: #cdced0 !important;
  background-color: #00000040 !important;
  font-size: 20px !important;
}
.brand .btn-navbar i.fas {
  font-size: 20px !important;
}
.brand .navbar-brand .brand-title:hover,
.brand .btn-navbar:hover {
  color: #ffffff !important;
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
