<template>
  <BaseModal
    ref="baseModalUser"
    :customStyles="'width:400px;'"
    @on-close="clearEditUserForm()"
    :modalOptions="{
      type: 'fromNavbar',
      title: 'Usuário',
    }"
  >
    <template #modal-body>
      <div class="user-container w-100">
        <div class="user-header border px-3 py-2  w-100">
          <div class="d-flex w-100 align-items-center">
            <img class="user-img" src="@/assets/user.png" alt="Usuário" />
            <div class="d-flex flex-column w-100">
              <p class="mx-2">
                <b>Nome:</b> {{ $store.state.auth.Usuario.nome }}
              </p>
              <p class="mx-2">
                <b>Login:</b> {{ $store.state.auth.Usuario.login }}
              </p>
              <p class="mx-2"><b>Tipo:</b> {{ adminText() }}</p>
            </div>
          </div>
          <BaseButton :type="'text'" :color="'red'" @click="routerLogout">
            Logout
          </BaseButton>
        </div>

        <div v-if="Admin" class="w-100 border  rounded-bottom py-2 px-3">
          <div class="form-row">
            <label required for="nome">Nome</label>
            <input
              class="form-control"
              type="text"
              id="nome"
              v-model="userForm.nome"
            />
          </div>
          <div class="form-row">
            <label required for="login">Login</label>
            <input
              class="form-control"
              type="text"
              id="login"
              v-model="userForm.login"
            />
          </div>
          <div class="form-row">
            <label required for="senhaAtual">Senha atual</label>
            <PasswordInput
              :isInvalid="false"
              :inputId="'senhaAtual'"
              v-model="senhaAtual"
            ></PasswordInput>
          </div>
          <!-- toggle edit senha -->
          <div class="container-edit-senha">
            <b>Editar senha</b>

            <button
              type="button"
              @click.prevent="toggleEditSenha()"
              class="btn-edit-senha"
            >
              <i
                class="fas fa-chevron-left"
                style="font-size:16px!important"
                :style="`transform: rotate(${isEditingSenha ? -90 : 0}deg)`"
              ></i>
            </button>
          </div>

          <transition-group name="slideY" mode="out-in">
            <template v-if="isEditingSenha">
              <div :key="'newPass'" class="form-row">
                <label required for="novaSenha">Nova senha</label>
                <PasswordInput
                  :inputId="'novaSenha'"
                  v-model="userForm.senha"
                ></PasswordInput>
              </div>

              <div :key="'repeatPass'" class="form-row">
                <label required for="confirmaSenha"
                  >Confirmar nova senha
                </label>
                <PasswordInput
                  :isInvalid="confirmaSenha != userForm.senha"
                  :inputId="'confirmaSenha'"
                  v-model="confirmaSenha"
                ></PasswordInput>
              </div>
            </template>

            <div :key="'btns'" class="mt-3 mb-1 d-flex justify-content-end">
              <BaseButton
                class="paddingX-20"
                :type="'text'"
                :color="'gray'"
                @click="close"
              >
                Cancelar
              </BaseButton>
              <BaseButton
                class="paddingX-20"
                :type="'text'"
                :color="'blue'"
                @click="editUser"
              >
                Salvar
              </BaseButton>
            </div>
          </transition-group>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import _ from "lodash";
import userService from "@/common/services/usuario";
import { notification } from "@/common/mixins";
import { BaseModal, PasswordInput, BaseButton } from "@/components/ui";

const emptyUser = {
  nome: "",
  login: "",
  senha: "",
  admin: 0,
};
export default {
  name: "ModalUser",
  mixins: [notification],
  components: { BaseModal, PasswordInput, BaseButton },
  data() {
    return {
      userForm: _.clone(emptyUser),
      currentTab: "edit",
      confirmaSenha: "",
      senhaAtual: "",
      isEditingSenha: false,
    };
  },
  mounted() {
    this.clearEditUserForm();
  },
  methods: {
    adminText() {
      switch (this.$store.state.auth.Usuario.admin){
        case 0: return "Consulta";
        case 1: return "Comissão";
        case 2: return "Administrador";
      }
    },
    toggleEditSenha() {
      this.isEditingSenha = !this.isEditingSenha;
      this.userForm.senha = "";
      this.confirmaSenha = "";
    },
    open() {
      this.$refs.baseModalUser.open();
    },
    close() {
      this.$refs.baseModalUser.close();
    },
    clearEditUserForm() {
      this.userForm = _.clone(emptyUser);
      this.isEditingSenha = false;
      this.userForm.nome = this.$store.state.auth.Usuario.nome;
      this.userForm.login = this.$store.state.auth.Usuario.login;
      this.userForm.admin = this.$store.state.auth.Usuario.admin;
      this.confirmaSenha = "";
      this.senhaAtual = "";
    },
    validateEditUser(user) {
      return (
        (!this.isEditingSenha || this.confirmaSenha === user.senha) &&
        this.validateUser(user)
      );
    },
    validateUser(user) {
      for (const value of Object.values(user)) {
        if (value === "" || value === null) return false;
      }
      return true;
    },
    async editUser() {
      const user = _.clone(this.userForm);
      user.senhaAtual = this.senhaAtual;
      user.admin = this.$store.state.auth.Usuario.admin;

      if (!this.isEditingSenha) user.senha = this.senhaAtual;

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
          message: "Senha atual incorreta.",
        });
      }
    },
    routerLogout() {
      this.$router.push({ name: "logout" });
    },
  },
  computed: {
    Admin() {
      return this.$store.state.auth.Usuario.admin >= 1;
    },
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

.container-edit-senha {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  margin-top: 15px;
  font-size: 14px;
  padding: 8px 0;
}
.container-edit-senha::before {
  content: "";
  position: absolute;
  top: 0;
  width: 100%;
  border-top: 1px solid #dee2e6;
}
.container-edit-senha::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  border-bottom: 1px solid #dee2e6;
}
.btn-edit-senha {
  padding: 0 5px !important;
  background-color: transparent !important;
  line-height: 50%;
  border: none;
  margin: 0;
  background: none;
}
.btn-edit-senha i {
  transition: all 0.25s ease !important;
}
.btn-edit-senha:focus {
  box-shadow: 0 0 0 0.15rem #007bff40 !important;
}
.user-container p {
  margin: 0;
  word-break: break-all;
}

.slideY-enter-active {
  animation: slideDown 0.2s ease;
}
.slideY-leave-active {
  animation: slideUp 0.2s ease;
}
.slideY-move {
  transition: transform 0.3s ease;
}
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-30%);
  }
}
</style>
