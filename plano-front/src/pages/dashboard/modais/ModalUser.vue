<template>
  <BaseModal
    ref="baseModalUser"
    :customStyles="'width:370px;'"
    @on-close="resetForm()"
    :modalOptions="{
      type: 'fromNavbar',
      title: 'Usuário',
    }"
  >
    <template #modal-body>
      <div class="user-container w-100">
        <div class="user-header border px-3 py-1  w-100">
          <div class="d-flex align-items-center">
            <img class="user-img" src="@/assets/user.png" alt="user" />
            <div class="d-flex flex-column w-100">
              <p class="mx-2"><b>Nome:</b> {{ getUsuarioFirstName }}</p>
              <p class="mx-2"><b>Admin:</b> {{ Admin ? "Sim" : "Não" }}</p>
            </div>
          </div>
          <button
            class="btn btn-custom btn-modal btn-danger"
            @click="routerLogout()"
          >
            Logout
          </button>
        </div>

        <div class="tab-group border">
          <span
            class="tab-link"
            @click="changeTab('edit')"
            :class="{ 'tab-active': currentTab === 'edit' }"
            >Editar usuário</span
          >
          <span
            v-if="Admin"
            class="tab-link"
            @click="changeTab('create')"
            :class="{ 'tab-active': currentTab === 'create' }"
            >Criar usuário</span
          >
        </div>

        <div class="w-100 border  rounded-bottom py-2 px-3">
          <template v-if="currentTab === 'edit'">
            <div class="form-row">
              <label for="nome">Nome <i title="Campo obrigatório">*</i></label>
              <input
                class="form-control"
                type="text"
                id="nome"
                v-model="userForm.nome"
              />
            </div>
            <div class="form-row">
              <label for="login"
                >Login <i title="Campo obrigatório">*</i></label
              >
              <input
                class="form-control"
                type="text"
                id="login"
                v-model="userForm.login"
              />
            </div>
            <div class="form-row">
              <label for="senhaAtual"
                >Senha atual <i title="Campo obrigatório">*</i></label
              >
              <input
                class="form-control"
                type="password"
                id="senhaAtual"
                v-model="userForm.senhaAtual"
              />
            </div>
            <div class="form-row">
              <label for="senha"
                >Nova senha <i title="Campo obrigatório">*</i></label
              >
              <input
                class="form-control"
                type="password"
                id="senha"
                v-model="userForm.senha"
              />
            </div>

            <div class="mt-3 mb-1 d-flex justify-content-end">
              <button
                class="px-3 btn btn-primary btn-custom btn-modal"
                @click="editUser()"
              >
                Salvar
              </button>
              <button
                class="px-3 btn btn-secondary btn-custom btn-modal"
                @click="resetUserForm()"
              >
                Cancelar
              </button>
            </div>
          </template>
          <template v-else-if="currentTab === 'create' && Admin">
            <div class="form-row">
              <label for="nome">Nome <i title="Campo obrigatório">*</i></label>
              <input
                class="form-control"
                type="text"
                id="nome"
                v-model="userForm.nome"
              />
            </div>
            <div class="form-row">
              <label for="login"
                >Login <i title="Campo obrigatório">*</i></label
              >
              <input
                class="form-control"
                type="text"
                id="login"
                v-model="userForm.login"
              />
            </div>
            <div class="form-row">
              <label for="senha"
                >Senha <i title="Campo obrigatório">*</i></label
              >
              <input
                class="form-control"
                type="password"
                id="senha"
                v-model="userForm.senha"
              />
            </div>

            <div class="mt-3 mb-1 d-flex justify-content-end">
              <button
                class="btn px-3 btn-success btn-custom btn-modal btn-verde"
                @click="createUser()"
              >
                Criar
              </button>
              <button
                class="btn px-3 btn-secondary btn-custom btn-modal "
                @click="clearUserForm()"
              >
                Cancelar
              </button>
            </div>
          </template>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import _ from "lodash";
import userService from "@/common/services/usuario";
import { mapGetters } from "vuex";
import { notification } from "@/mixins/index.js";
import { BaseModal } from "@/components/index.js";

const emptyUser = {
  nome: "",
  login: "",
  senha: "",
  senhaAtual: "",
};
export default {
  name: "ModalUser",
  mixins: [notification],
  components: { BaseModal },
  data() {
    return {
      currentTab: "edit",
      userForm: _.clone(emptyUser),
    };
  },
  mounted() {
    this.resetUserForm();
  },
  methods: {
    openModal() {
      this.$refs.baseModalUser.open();
    },
    changeTab(newTab) {
      if (newTab === "edit") this.resetUserForm();
      else if (newTab === "create") this.clearUserForm();

      this.currentTab = newTab;
    },
    clearUserForm() {
      this.userForm = _.clone(emptyUser);
    },
    resetUserForm() {
      this.userForm = _.clone(emptyUser);
      this.userForm.nome = this.$store.state.auth.Usuario.nome;
      this.userForm.login = this.$store.state.auth.Usuario.login;
    },
    resetForm() {
      this.currentTab = "edit";
      this.resetUserForm();
    },
    validateUser(user) {
      for (const value of Object.values(user)) {
        if (value === "" || value === null) return false;
      }
      return true;
    },
    createUser() {
      const user = _.clone(this.userForm);

      //Para passar na validação pois novo usuario não tem senha atual
      user.senhaAtual = "senha-atual";

      if (!this.validateUser(user)) {
        this.showNotication({
          type: "error",
          message: `Preencha os campos obrigátorios.`,
        });
        return;
      }

      userService.create(user).then(() => {
        this.showNotication({
          type: "success",
          message: `Usuário criado.`,
        });
      });
    },
    editUser() {
      const user = _.clone(this.userForm);

      if (!this.validateUser(user)) {
        this.showNotication({
          type: "error",
          message: `Preencha os campos obrigátorios.`,
        });
        return;
      }
      this.showNotication({
        type: "success",
        message: `Usuário atualizado.`,
      });
      userService.update(this.$store.state.auth.Usuario.id, user).then(() => {
        this.showNotication({
          type: "success",
          message: `Usuário atualizado.`,
        });
      });
    },
    routerLogout() {
      this.$router.push({ name: "logout" });
    },
  },
  computed: {
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
    },
    ...mapGetters(["getUsuarioFirstName"]),
  },
};
</script>

<style scoped>
.user-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
}
.user-container .user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-header .user-img {
  width: 50px;
}
.user-container .tab-group {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tab-group .tab-link {
  flex: 1;
  text-align: center;
  font-weight: bold;
  transition: all 200ms ease;
  position: relative;
  padding: 5px 0;
  height: 100%;
  cursor: default;
}
.tab-group .tab-link:hover {
  cursor: pointer;
  color: var(--light-blue);
  background-color: rgba(235, 235, 235, 0.733);
}

.tab-group .tab-link.tab-active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: var(--light-blue);
}
.user-container .form-row {
  margin: 0 !important;
  margin-bottom: 10px !important;
}
.form-row label {
  font-weight: bold;
}
.form-row label i {
  color: #f30000;
}
.user-container .form-row input {
  height: 30px;
  font-size: 14px;
  padding: 2px 8px !important;
  text-align: start;
}
.user-container p {
  margin: 0;
}
</style>
