<template>
  <BaseModal
    ref="baseModalUser"
    :customStyles="'width:370px;'"
    @on-close="clearAllForm()"
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
              <PasswordInput
                :isInvalid="false"
                :inputId="'senhaAtual'"
                v-model="senhaAtual"
              ></PasswordInput>
            </div>

            <div class="form-row">
              <label for="novaSenha"
                >Nova senha <i title="Campo obrigatório">*</i></label
              >
              <PasswordInput
                :inputId="'novaSenha'"
                v-model="userForm.senha"
              ></PasswordInput>
            </div>

            <div class="form-row">
              <label for="confirmaSenha"
                >Confirmar nova senha <i title="Campo obrigatório">*</i></label
              >
              <PasswordInput
                :isInvalid="confirmaSenha != userForm.senha"
                :inputId="'confirmaSenha'"
                v-model="confirmaSenha"
              ></PasswordInput>
            </div>

            <div class="mt-3 mb-1 d-flex justify-content-end">
              <button
                class="px-3 btn btn-secondary btn-custom btn-modal"
                @click="clearEditUserForm()"
              >
                Cancelar
              </button>
              <button
                class="px-3 btn btn-primary btn-custom btn-modal"
                @click="editUser()"
              >
                Salvar
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
              <PasswordInput
                :isInvalid="false"
                :inputId="'senha'"
                v-model="userForm.senha"
              ></PasswordInput>
            </div>
            <div class="form-row d-flex align-items-center">
              <label for="admin" class="m-0 mr-2">Admin</label>
              <input type="checkbox" id="admin" v-model="userForm.admin" />
            </div>

            <div class="mt-3 mb-1 d-flex justify-content-end">
              <button
                class="btn px-3 btn-secondary btn-custom btn-modal "
                @click="clearCreateUserForm()"
              >
                Cancelar
              </button>
              <button
                class="btn px-3 btn-success btn-custom btn-modal btn-verde"
                @click="createUser()"
              >
                Criar
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
import { BaseModal, PasswordInput } from "@/components/index.js";

const emptyUser = {
  nome: "",
  login: "",
  senha: "",
  admin: false,
};
export default {
  name: "ModalUser",
  mixins: [notification],
  components: { BaseModal, PasswordInput },
  data() {
    return {
      userForm: _.clone(emptyUser),
      currentTab: "edit",
      confirmaSenha: "",
      senhaAtual: "",
    };
  },
  mounted() {
    this.clearAllForm();
  },
  methods: {
    openModal() {
      this.$refs.baseModalUser.open();
    },
    changeTab(newTab) {
      if (this.currentTab === newTab) return;

      this.currentTab = newTab;
      if (newTab === "edit") this.clearEditUserForm();
      else if (newTab === "create") this.clearCreateUserForm();
    },
    clearCreateUserForm() {
      this.userForm = _.clone(emptyUser);
    },
    clearEditUserForm() {
      this.userForm = _.clone(emptyUser);
      this.userForm.nome = this.$store.state.auth.Usuario.nome;
      this.userForm.login = this.$store.state.auth.Usuario.login;
      this.userForm.admin = this.$store.state.auth.Usuario.admin;
      this.confirmaSenha = "";
      this.senhaAtual = "";
    },
    clearAllForm() {
      this.clearEditUserForm();
      this.changeTab("edit");
    },
    validateEditUser(user) {
      return this.confirmaSenha === user.senha && this.validateUser(user);
    },
    validateUser(user) {
      for (const value of Object.values(user)) {
        if (value === "" || value === null) return false;
      }
      return true;
    },
    routerLogout() {
      this.$router.push({ name: "logout" });
    },

    async createUser() {
      const user = _.clone(this.userForm);

      if (!this.validateUser(user)) {
        this.showNotification({
          type: "error",
          message: `Campos obrigátorios incompletos ou inválidos.`,
        });
        return;
      }

      try {
        await userService.create(user);

        this.showNotification({
          type: "success",
          message: `Usuário criado.`,
        });
        this.clearCreateUserForm();
      } catch (error) {
        this.showNotification({
          type: "error",
          title: "Erro ao criar usuário",
          message: error,
        });
      }
    },
    async editUser() {
      const user = _.clone(this.userForm);
      user.senhaAtual = this.senhaAtual;
      user.admin = this.$store.state.auth.Usuario.admin;

      if (!this.validateEditUser(user)) {
        this.showNotification({
          type: "error",
          message: `Campos obrigátorios incompletos ou inválidos.`,
        });
        return;
      }

      try {
        await userService.update(this.$store.state.auth.Usuario.id, user);
        this.showNotification({
          type: "success",
          message: `Usuário ${this.$store.state.auth.Usuario.nome} atualizado.`,
        });
        this.clearEditUserForm();
      } catch (error) {
        this.showNotification({
          type: "error",
          title: "Erro ao editar usuário",
          message: error,
        });
      }
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
  position: relative;
  margin: 0 !important;
  margin-bottom: 10px !important;
}
.form-row label {
  font-weight: bold;
}
.form-row label > i {
  color: #f30000;
}
::v-deep .form-row input.form-control {
  height: 30px !important;
  font-size: 14px !important;
  padding: 2px 8px !important;
  text-align: start !important;
}
.form-row input[type="checkbox"] {
  height: 14px !important;
  font-size: 10px !important;
  padding: 2px 8px !important;
  text-align: start !important;
}
.user-container p {
  margin: 0;
}
</style>
