<template>
  <div v-if="Admin" class="main-component">
    <PageTitle :title="'Usuários'">
      <template #aside>
        <BaseButton
          title="Ajuda"
          :type="'icon'"
          :color="'lightblue'"
          @click="$refs.modalAjuda.toggle()"
        >
          <i class="fas fa-question"></i>
        </BaseButton>
      </template>
    </PageTitle>

    <div class="page-content">
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <th
              style="width: 150px"
              class="t-start clickable"
              @click="toggleOrder(ordenacaoMainUsers, 'nome')"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoMainUsers, 'nome')"></i>
            </th>
            <th
              style="width: 120px"
              class="t-start clickable"
              @click="toggleOrder(ordenacaoMainUsers, 'login')"
            >
              Login
              <i :class="setIconByOrder(ordenacaoMainUsers, 'login')"></i>
            </th>
            <th
              style="width: 65px"
              class="clickable less-padding"
              @click="toggleOrder(ordenacaoMainUsers, 'admin', 'desc')"
            >
              Admin
              <i :class="setIconByOrder(ordenacaoMainUsers, 'admin')"></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="user in UsersOrdered"
              :key="user.login + user.nome"
              @click="handleClickInUser(user)"
              :class="{ 'bg-selected': user.id === userSelected }"
            >
              <td style="width: 150px" class="t-start">{{ user.nome }}</td>
              <td style="width: 120px" class="t-start">{{ user.login }}</td>
              <td style="width: 65px">{{ user.admin ? "Sim" : "-" }}</td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Usuário'"
        :toggleFooter="isEdit"
        @btn-salvar="editUser()"
        @btn-delete="openModalDelete()"
        @btn-add="createUser()"
        @btn-clean="cleanUser()"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label for="nome">Nome <i title="Campo obrigatório">*</i></label>
              <input
                class="form-control"
                type="text"
                id="nome"
                v-model="userForm.nome"
              />
            </div>
          </div>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
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
          </div>
          <!-- Create -->
          <template v-if="!isEdit">
            <!-- senha -->
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="novaSenha"
                  >Senha<i title="Campo obrigatório">*</i></label
                >
                <PasswordInput
                  :iconSize="11"
                  :inputId="'novaSenha'"
                  v-model="userForm.senha"
                ></PasswordInput>
              </div>
            </div>
            <!-- confirmar senha -->
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="confirmaSenha">
                  Confirmar senha <i title="Campo obrigatório">*</i></label
                >
                <PasswordInput
                  :iconSize="11"
                  :isInvalid="confirmaSenha != userForm.senha"
                  :inputId="'confirmaSenha'"
                  v-model="confirmaSenha"
                ></PasswordInput>
              </div>
            </div>
          </template>
          <!-- Edit -->
          <template v-else-if="isEdit">
            <!-- senha atual -->
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="senhaAtual"
                  >Senha atual <i title="Campo obrigatório">*</i></label
                >
                <PasswordInput
                  :iconSize="11"
                  :isInvalid="false"
                  :inputId="'senhaAtual'"
                  v-model="senhaAtual"
                ></PasswordInput>
              </div>
            </div>
            <!-- toggle edit senha -->
            <div class="container-edit-senha">
              <span>Editar senha</span>

              <button
                type="button"
                @click.prevent="toggleEditSenha()"
                class="btn-custom btn-edit-senha"
              >
                <i
                  class="fas fa-chevron-left"
                  style="font-size:15px!important"
                  :style="`transform: rotate(${isEditingSenha ? -90 : 0}deg)`"
                ></i>
              </button>
            </div>

            <!-- edit senha -->
            <template v-if="isEditingSenha">
              <div :key="'senha'" class="row mb-2 mx-0">
                <div class="form-group col m-0 px-0">
                  <label for="novaSenha">
                    Nova senha <i title="Campo obrigatório">*</i>
                  </label>
                  <PasswordInput
                    :iconSize="11"
                    :inputId="'novaSenha'"
                    v-model="novaSenha"
                  ></PasswordInput>
                  <!-- v-model="userForm.senha" -->
                </div>
              </div>
              <!-- confirma nova senha -->
              <div :key="'confirma'" class="row mb-2 mx-0">
                <div class="form-group col m-0 px-0">
                  <label for="confirmaSenha"
                    >Confirmar nova senha
                    <i title="Campo obrigatório">*</i></label
                  >
                  <PasswordInput
                    :iconSize="11"
                    :isInvalid="confirmaSenha != novaSenha"
                    :inputId="'confirmaSenha'"
                    v-model="confirmaSenha"
                  ></PasswordInput>
                </div>
              </div>
            </template>
          </template>

          <div class="row mb-2 mt-2 mx-0">
            <div class="form-check form-check-inline col m-0 px-0 pl-1">
              <label class="form-check-label mr-2" for="userIsAdmin"
                >Admin</label
              >
              <input
                type="checkbox"
                id="userIsAdmin"
                class="form-check-input"
                v-model="userForm.admin"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <BaseModal
      ref="modalDeleteUser"
      :modalOptions="{
        title: 'Deletar usuário',
        position: 'center',
        hasBackground: true,
        hasFooter: true,
      }"
      :customStyles="'width:450px; font-size:14px'"
    >
      <template #modal-body>
        <p class="w-100 m-0">
          <template v-if="isEdit">
            Tem certeza que deseja deletar o usuário
            <b>{{ userForm.nome }}</b> ?
          </template>
          <template v-else>
            Nenhum usuário selecionado!
          </template>
        </p>
      </template>
      <template #modal-footer>
        <button
          class="btn-custom btn-modal btn-cinza paddingX-20"
          @click="closeModalDelete()"
        >
          Cancelar
        </button>
        <button
          v-if="isEdit"
          class="btn-custom btn-modal btn-vermelho paddingX-20"
          @click="deleteUser()"
        >
          Deletar
        </button>
      </template>
    </BaseModal>
    <!-- MODAL AJUDA -->

    <BaseModal
      ref="modalAjuda"
      :modalOptions="{
        type: 'ajuda',
        title: 'Ajuda',
      }"
    >
      <template #modal-body>
        <ul class="list-ajuda list-group">
          <li class="list-group-item">
            <b>Para excluir um usuário:</b> clique no ícone de deletar
            <i class="fas fa-times delbtn"></i> presente na tabela, em seguida
            confirme se é realmente o usuário que deseja exluir e clique no
            botão deletar ou cancelar.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import userService from "@/common/services/usuario";
import {
  toggleOrdination,
  notification,
  redirectNotAdmin,
} from "@/mixins/index.js";
import {
  BaseTable,
  BaseModal,
  PageTitle,
  BaseButton,
  PasswordInput,
  Card,
} from "@/components/index.js";

const emptyUser = {
  nome: "",
  login: "",
  senha: "",
  admin: false,
};

export default {
  name: "Usuarios",
  mixins: [notification, redirectNotAdmin, toggleOrdination],
  components: {
    BaseTable,
    PageTitle,
    BaseButton,
    Card,
    PasswordInput,
    BaseModal,
  },
  data() {
    return {
      isEditingSenha: false,
      userSelected: null,
      userForm: _.clone(emptyUser),
      novaSenha: "",
      confirmaSenha: "",
      senhaAtual: "",
      ordenacaoMainUsers: { order: "nome", type: "asc" },
    };
  },
  methods: {
    toggleEditSenha() {
      this.isEditingSenha = !this.isEditingSenha;
      this.novaSenha = "";
      this.confirmaSenha = "";
    },
    handleClickInUser(user) {
      this.cleanUser();
      this.userSelected = user.id;
      this.showUser(user);
    },
    showUser(user) {
      this.userForm = _.clone(user);
    },
    cleanUser() {
      this.userSelected = null;
      this.confirmaSenha = "";
      this.senhaAtual = "";
      this.isEditingSenha = false;
      this.userForm = _.clone(emptyUser);
    },
    openModalDelete() {
      this.$refs.modalDeleteUser.open();
    },
    closeModalDelete() {
      this.$refs.modalDeleteUser.close();
    },
    validateEditUser(user) {
      return (
        (!this.isEditingSenha || this.confirmaSenha === this.novaSenha) &&
        this.validateUser(user)
      );
    },
    validateUser(user) {
      for (const value of Object.values(user)) {
        if (value === "" || value === null) return false;
      }
      return true;
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
        this.cleanUser();
      } catch (error) {
        this.showNotification({
          type: "error",
          message: error,
        });
      }
    },
    async editUser() {
      const user = _.clone(this.userForm);
      user.senhaAtual = this.senhaAtual;

      if (this.isEditingSenha) user.senha = this.novaSenha;
      else user.senha = this.senhaAtual;

      if (!this.validateEditUser(user)) {
        this.showNotification({
          type: "error",
          message: `Campos obrigátorios incompletos ou inválidos.`,
        });
        return;
      }

      try {
        await userService.update(user.id, user);
        this.showNotification({
          type: "success",
          message: `Usuário atualizado.`,
        });
        this.novaSenha = "";
        this.confirmaSenha = "";
        this.senhaAtual = "";
      } catch (error) {
        this.showNotification({
          type: "error",
          message: "Login ou senha inválida",
        });
      }
    },
    async deleteUser() {
      const user = _.clone(this.userForm);

      try {
        await userService.delete(user.id, user);
        this.showNotification({
          type: "success",
          message: `Usuário ${user.nome} foi removido.`,
        });
        this.closeModalDelete();
        this.cleanUser();
      } catch (error) {
        this.showNotification({
          type: "error",
          message: error,
        });
      }
    },
  },
  computed: {
    Users() {
      const usersResultantes = [];

      this.$store.state.usuario.Usuarios.forEach((user) => {
        usersResultantes.push({
          ...user,
          senha: "",
        });
      });
      return usersResultantes;
    },
    UsersOrdered() {
      const { order, type } = this.ordenacaoMainUsers;
      const userSorter = (user) => {
        switch (order) {
          case "nome":
          case "login":
            return user[order].toLowerCase();
          default:
            return user[order];
        }
      };

      return _.orderBy(this.Users, userSorter, type);
    },
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
    },
    isEdit() {
      return this.userSelected != null;
    },
  },
};
</script>

<style scoped>
::v-deep .card input[type="text"],
::v-deep .card input[type="password"] {
  width: 200px !important;
  height: 25px !important;
  padding: 0px 5px !important;
  font-size: 12px !important;
  text-align: start;
}
.form-group label > i {
  color: #f30000;
}

.container-edit-senha {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  margin-top: 12px;
  font-size: 12x;
  padding: 5px 0;
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
</style>
