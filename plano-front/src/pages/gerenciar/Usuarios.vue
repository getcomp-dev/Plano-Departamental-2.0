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

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <th
            style="width: 100px"
            class="t-start clickable"
            @click="toggleOrder(ordenacaoMainUsuarios, 'nome')"
          >
            Nome
            <i :class="setIconByOrder(ordenacaoMainUsuarios, 'nome')"></i>
          </th>
          <th
            style="width: 60px"
            class="clickable less-padding"
            @click="toggleOrder(ordenacaoMainUsuarios, 'admin', 'desc')"
          >
            Admin
            <i :class="setIconByOrder(ordenacaoMainUsuarios, 'admin')"></i>
          </th>
          <th style="width: 50px" class="less-padding">Deletar</th>
        </template>
        <template #tbody>
          <tr
            v-for="(usuario, index) in UsuariosOrdered"
            :key="index + usuario.nome"
          >
            <td style="width: 100px" class="t-start">{{ usuario.nome }}</td>
            <td style="width: 60px">{{ usuario.admin ? "Sim" : "-" }}</td>

            <td style="width: 50px">
              <button
                v-if="!isCurrentUser(usuario.id) && !usuario.admin"
                class="btn-table"
                @click.stop="openModalDeleteUser(usuario)"
              >
                <i class="fas fa-times delbtn"></i>
              </button>
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <BaseModal
      ref="modalDeleteUser"
      :modalOptions="{
        title: 'Deletar Usuário',
        position: 'center',
        hasBackground: true,
        hasFooter: true,
      }"
      :classes="'modal-edit-user'"
      :hasFooter="true"
    >
      <template #modal-body>
        <p class="mb-2" style="font-size:14px">
          Tem certeza que deseja deletar o usuário <b>{{ userForm.nome }}</b> ?
        </p>
      </template>
      <template #modal-footer>
        <button
          class="btn-custom btn-modal btn-cinza btn-ok-modal"
          @click="$refs.modalDeleteUser.close()"
        >
          Cancelar
        </button>
        <button
          class="btn-custom btn-modal btn-vermelho btn-ok-modal"
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
  components: { BaseTable, PageTitle, BaseButton, BaseModal, PasswordInput },
  data() {
    return {
      userForm: _.clone(emptyUser),
      confirmaSenha: "",
      senhaAtual: "",
      ordenacaoMainUsuarios: { order: "nome", type: "asc" },
    };
  },
  methods: {
    isCurrentUser(usuarioId) {
      return this.$store.state.auth.Usuario.id === usuarioId;
    },
    openModalDeleteUser(user) {
      this.userForm = { ...user };
      this.$refs.modalDeleteUser.toggle();
    },
    closeModalDeleteUser() {
      this.$refs.modalDeleteUser.close();
    },
    clearUserForm() {
      this.userForm = _.clone(emptyUser);
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
        // this.clearCreateUserForm();
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
          message: `Usuário atualizado.`,
        });
        this.clearEditUserForm();
      } catch (error) {
        this.showNotification({
          type: "error",
          message: error,
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

        this.closeModalDeleteUser();
        this.clearUserForm();
      } catch (error) {
        this.showNotification({
          type: "error",
          message: error,
        });
      }
    },
  },
  computed: {
    Usuarios() {
      const usuariosResultantes = [];

      this.$store.state.usuario.Usuarios.forEach((usuario) => {
        usuariosResultantes.push({
          ...usuario,
          senha: "",
        });
      });
      return usuariosResultantes;
    },
    UsuariosOrdered() {
      return _.orderBy(
        this.Usuarios,
        this.ordenacaoMainUsuarios.order,
        this.ordenacaoMainUsuarios.type
      );
    },
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
    },
  },
};
</script>

<style scoped>
.less-padding {
  padding: 0 2px !important;
}
.btn-table {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
}
.btn-table i {
  font-size: 14px;
}
.modal-edit-user {
  font-size: 13px;
}
</style>
