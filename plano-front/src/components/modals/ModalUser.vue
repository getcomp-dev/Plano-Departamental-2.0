<template>
  <BaseModal ref="baseModalUser" title="Usuário" type="fromNavbar">
    <template #modal-body>
      <div class="w-100 d-flex justify-content-between align-items-center border py-1 px-3">
        <div class="d-flex w-100 align-items-center">
          <img class="user-img" src="@/assets/images/user.png" width="50px" alt="Usuário cover" />
          <div class="d-flex flex-column w-100">
            <p class="mx-2 m-0">
              <b>Nome:</b>
              {{ currentUser.nome }}
            </p>
            <p class="mx-2 m-0">
              <b>Login:</b>
              {{ currentUser.login }}
            </p>
            <p class="mx-2 m-0">
              <b>Tipo:</b>
              {{ currentUser.type }}
            </p>
          </div>
        </div>
        <BaseButton text="Logout" color="red" @click="doLogout" />
      </div>

      <div v-if="currentUser.isAdmin" class="w-100 border rounded-bottom py-2 px-3">
        <VInput
          label="Nome"
          v-model="userForm.nome"
          :validation="$v.userForm.nome"
          :upperCase="false"
        />
        <VInput
          label="Login"
          v-model="userForm.login"
          :validation="$v.userForm.login"
          :upperCase="false"
        />
        <VInputPassword label="Senha" v-model="senhaAtual" :validation="$v.senhaAtual" />

        <SectionSlider :isOpen="isEditingSenha" @handel-click="toggleEditSenha" />
        <transition-group name="slideY" mode="out-in">
          <template v-if="isEditingSenha">
            <VInputPassword
              key="newPass'"
              label="Nova senha"
              v-model="userForm.senha"
              :validation="$v.userForm.senha"
            />
            <VInputPassword
              key="repeatPass"
              label="Confirmar nova senha"
              v-model="confirmaSenha"
              :validation="$v.confirmaSenha"
            />
          </template>
        </transition-group>

        <div class="mt-3 mb-1 d-flex justify-content-end">
          <BaseButton class="paddingX-20" text="Cancelar" color="gray" @click="clearEditUserForm" />
          <BaseButton class="paddingX-20" text="Salvar" color="blue" @click="handleUpdateUser" />
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { requiredIf, required, integer } from "vuelidate/lib/validators";
import userService from "@/services/usuario";
import { makeEmptyUser } from "@utils/factories";
import { VInput, VInputPassword, SectionSlider } from "@/components/ui";

export default {
  name: "ModalUser",
  components: { VInput, VInputPassword, SectionSlider },
  data() {
    return {
      userForm: makeEmptyUser(),
      currentTab: "edit",
      confirmaSenha: "",
      senhaAtual: "",
      isEditingSenha: false,
    };
  },
  validations: {
    userForm: {
      nome: { required },
      login: { required },
      senha: {
        requiredIf: requiredIf(function() {
          return this.isEditingSenha;
        }),
      },
      admin: { required, integer },
    },
    confirmaSenha: {
      requiredIf: requiredIf(function() {
        return this.isEditingSenha;
      }),
      sameAsPassword: function(value) {
        return this.userForm.senha === value;
      },
    },
    senhaAtual: { required },
  },

  beforeMount() {
    this.clearEditUserForm();
  },

  methods: {
    ...mapActions(["doLogout"]),

    open() {
      this.$refs.baseModalUser.open();
    },

    toggleEditSenha() {
      this.isEditingSenha = !this.isEditingSenha;
      this.userForm.senha = "";
      this.confirmaSenha = "";
      this.$nextTick(() => {
        this.$v.confirmaSenha.$reset();
        this.$v.userForm.senha.$reset();
      });
    },
    clearEditUserForm() {
      this.userForm = makeEmptyUser();
      this.userForm.nome = this.currentUser.nome;
      this.userForm.login = this.currentUser.login;
      this.userForm.admin = this.currentUser.admin;
      this.confirmaSenha = "";
      this.senhaAtual = "";
      this.isEditingSenha = false;
      this.$nextTick(() => this.$v.$reset());
    },
    async handleUpdateUser() {
      const user = { ...this.userForm };
      user.senhaAtual = this.senhaAtual;
      user.admin = this.currentUser.admin;
      if (!this.isEditingSenha) user.senha = this.senhaAtual;

      this.$v.userForm.$touch();
      this.$v.confirmaSenha.$touch();
      this.$v.senhaAtual.$touch();
      if (
        this.$v.userForm.$anyError ||
        this.$v.confirmaSenha.$anyError ||
        this.$v.senhaAtual.$anyError
      ) {
        return;
      }

      try {
        await userService.update(this.currentUser.id, user);
        this.pushNotification({
          type: "success",
          text: `Usuário ${this.currentUser.nome} atualizado.`,
        });
        this.clearEditUserForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao editar usuário",
          text: "Verifique se a senha atual esta correta",
        });
      }
    },
  },

  computed: {
    ...mapGetters(["currentUser"]),
  },
};
</script>
