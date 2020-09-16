<template>
  <BaseModal ref="baseModalUser" :title="'Usuário'" :type="'fromNavbar'">
    <template #modal-body>
      <div class="user-container w-100">
        <div class="user-header border px-3 py-2 w-100">
          <div class="d-flex w-100 align-items-center">
            <img class="user-img" src="@/assets/user.png" alt="Usuário" />
            <div class="d-flex flex-column w-100">
              <p class="mx-2">
                <b>Nome:</b>
                {{ $store.state.auth.Usuario.nome }}
              </p>
              <p class="mx-2">
                <b>Login:</b>
                {{ $store.state.auth.Usuario.login }}
              </p>
              <p class="mx-2">
                <b>Tipo:</b>
                {{ adminText() }}
              </p>
            </div>
          </div>
          <BaseButton :type="'text'" :color="'red'" @click="routerLogout"
            >Logout</BaseButton
          >
        </div>

        <div v-if="Admin" class="w-100 border rounded-bottom py-2 px-3">
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
            <InputPassword
              :isInvalid="false"
              :inputId="'senhaAtual'"
              v-model="senhaAtual"
            />
          </div>
          <!-- toggle edit senha -->
          <ButtonSlideSection
            :isOpen="isEditingSenha"
            @handel-click="toggleEditSenha"
          />

          <transition-group name="slideY" mode="out-in">
            <template v-if="isEditingSenha">
              <div :key="'newPass'" class="form-row">
                <label required for="novaSenha">Nova senha</label>
                <InputPassword
                  :inputId="'novaSenha'"
                  v-model="userForm.senha"
                />
              </div>

              <div :key="'repeatPass'" class="form-row">
                <label required for="confirmaSenha">Confirmar nova senha</label>
                <InputPassword
                  :isInvalid="confirmaSenha != userForm.senha"
                  :inputId="'confirmaSenha'"
                  v-model="confirmaSenha"
                />
              </div>
            </template>
          </transition-group>
          <div :key="'btns'" class="mt-3 mb-1 d-flex justify-content-end">
            <BaseButton
              class="paddingX-20"
              :type="'text'"
              :color="'gray'"
              @click="close"
              >Cancelar</BaseButton
            >
            <BaseButton
              class="paddingX-20"
              :type="'text'"
              :color="'blue'"
              @click="editUser"
              >Salvar</BaseButton
            >
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapGetters } from "vuex";
import userService from "@/common/services/usuario";
import { InputPassword, ButtonSlideSection } from "@/components/ui";

const emptyUser = {
  nome: "",
  login: "",
  senha: "",
  admin: 0,
};

export default {
  name: "ModalUser",
  components: { InputPassword, ButtonSlideSection },
  data() {
    return {
      userForm: this.$_.clone(emptyUser),
      currentTab: "edit",
      confirmaSenha: "",
      senhaAtual: "",
      isEditingSenha: false,
    };
  },

  beforeMount() {
    this.clearEditUserForm();
  },

  methods: {
    open() {
      this.$refs.baseModalUser.open();
    },
    close() {
      this.$refs.baseModalUser.close();
    },
    adminText() {
      switch (this.$store.state.auth.Usuario.admin) {
        case 0:
          return "Consulta";
        case 1:
          return "Comissão";
        case 2:
          return "Administrador";
      }
    },
    toggleEditSenha() {
      this.isEditingSenha = !this.isEditingSenha;
      this.userForm.senha = "";
      this.confirmaSenha = "";
    },
    clearEditUserForm() {
      this.userForm = this.$_.clone(emptyUser);
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
    routerLogout() {
      this.$router.push({ name: "logout" });
    },

    async editUser() {
      const user = this.$_.clone(this.userForm);
      user.senhaAtual = this.senhaAtual;
      user.admin = this.$store.state.auth.Usuario.admin;

      if (!this.isEditingSenha) user.senha = this.senhaAtual;

      if (!this.validateEditUser(user)) {
        this.pushNotification({
          type: "error",
          text: `Campos obrigátorios incompletos ou inválidos.`,
        });
        return;
      }

      try {
        await userService.update(this.$store.state.auth.Usuario.id, user);
        this.pushNotification({
          type: "success",
          text: `Usuário ${this.$store.state.auth.Usuario.nome} atualizado.`,
        });
        this.clearEditUserForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao editar usuário",
          text: "Senha atual incorreta.",
        });
      }
    },
  },

  computed: {
    ...mapGetters(["Admin"]),
  },
};
</script>

<style scoped>
@import url(../../assets/css/slideY-animation.css);

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
</style>
