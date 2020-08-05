<template>
  <div class="main-component">
    <PageHeader :title="'Usuários'">
      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="$refs.modalAjuda.toggle()"
      >
        <i class="fas fa-question"></i>
      </BaseButton>
    </PageHeader>

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
              style="width: 115px"
              class="clickable less-padding"
              @click="toggleOrder(ordenacaoMainUsers, 'admin', 'desc')"
            >
              Tipo
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
              <td style="width: 115px">{{ adminText(user.admin) }}</td>
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
              <label required for="nome">Nome </label>
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
              <label required for="login">Login </label>
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
                <label required for="novaSenha">Senha</label>
                <InputPassword
                  :iconSize="13"
                  :inputId="'novaSenha'"
                  v-model="userForm.senha"
                />
              </div>
            </div>
            <!-- confirmar senha -->
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label required for="confirmaSenha"> Confirmar senha </label>
                <InputPassword
                  :iconSize="13"
                  :isInvalid="confirmaSenha != userForm.senha"
                  :inputId="'confirmaSenha'"
                  v-model="confirmaSenha"
                />
              </div>
            </div>
          </template>
          <!-- Edit -->
          <template v-else-if="isEdit">
            <!-- toggle edit senha -->
            <ButtonSlideSection
              :isOpen="isEditingSenha"
              @handel-click="toggleEditSenha"
            />

            <!-- edit senha -->
            <transition-group name="slideY" mode="out-in">
              <template v-if="isEditingSenha">
                <div :key="'senha'" class="row mb-2 mx-0">
                  <div class="form-group col m-0 px-0">
                    <label required for="novaSenha">
                      Nova senha
                    </label>
                    <InputPassword
                      :iconSize="13"
                      :inputId="'novaSenha'"
                      v-model="novaSenha"
                    />
                  </div>
                </div>
                <!-- confirma nova senha -->
                <div :key="'confirma'" class="row mb-2 mx-0">
                  <div class="form-group col m-0 px-0">
                    <label required for="confirmaSenha"
                      >Confirmar nova senha
                    </label>
                    <InputPassword
                      :iconSize="13"
                      :isInvalid="confirmaSenha != novaSenha"
                      :inputId="'confirmaSenha'"
                      v-model="confirmaSenha"
                    />
                  </div>
                </div>
              </template>
            </transition-group>
          </template>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label for="userAdmin">Tipo </label>
              <select
                id="userAdmin"
                v-model.number="userForm.admin"
                class="form-control"
              >
                <option value="0">Consulta</option>
                <option value="1">Comissão</option>
                <option value="2">Administrador</option>
              </select>
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
        <BaseButton
          class="paddingX-20"
          :type="'text'"
          :color="'gray'"
          @click="closeModalDelete()"
        >
          Cancelar
        </BaseButton>
        <BaseButton
          class="paddingX-20"
          :type="'text'"
          :color="'red'"
          @click="deleteUser()"
        >
          Deletar
        </BaseButton>
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
            <i class="fas fa-times icon-red"></i> presente na tabela, em seguida
            confirme se é realmente o usuário que deseja exluir e clique no
            botão deletar ou cancelar.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import userService from "@/common/services/usuario";
import { toggleOrdination, notification } from "@/common/mixins";
import {
  PageHeader,
  InputPassword,
  Card,
  ButtonSlideSection,
} from "@/components/ui";

const emptyUser = {
  nome: "",
  login: "",
  senha: "",
  admin: 0,
};

export default {
  name: "Usuarios",
  mixins: [notification, toggleOrdination],
  components: {
    PageHeader,
    Card,
    InputPassword,
    ButtonSlideSection,
  },
  data() {
    return {
      isEditingSenha: false,
      userSelected: null,
      userForm: this.$_.clone(emptyUser),
      novaSenha: "",
      confirmaSenha: "",
      ordenacaoMainUsers: { order: "nome", type: "asc" },
    };
  },
  methods: {
    adminText(admin) {
      switch (admin) {
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
      this.novaSenha = "";
      this.confirmaSenha = "";
    },
    handleClickInUser(user) {
      this.cleanUser();
      this.userSelected = user.id;
      this.showUser(user);
    },
    showUser(user) {
      this.userForm = this.$_.clone(user);
    },
    cleanUser() {
      this.userSelected = null;
      this.confirmaSenha = "";
      this.isEditingSenha = false;
      this.userForm = this.$_.clone(emptyUser);
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
      for (const entry of Object.entries(user)) {
        if ((entry[1] === "" || entry[1] === null) && entry[0] !== "senha")
          return false;
      }
      return true;
    },
    async createUser() {
      const user = this.$_.clone(this.userForm);

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
      const user = this.$_.clone(this.userForm);
      user.senha = this.novaSenha;

      if (!this.validateEditUser(user)) {
        this.showNotification({
          type: "error",
          message: `Campos obrigátorios incompletos ou inválidos.`,
        });
        return;
      }

      try {
        await userService.updateSuper(user.id, user);
        this.showNotification({
          type: "success",
          message: `Usuário atualizado.`,
        });
        this.novaSenha = "";
        this.confirmaSenha = "";
      } catch (error) {
        this.showNotification({
          type: "error",
          message: "Login ou senha inválida",
        });
      }
    },
    async deleteUser() {
      const user = this.$_.clone(this.userForm);

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

      return this.$_.orderBy(this.Users, userSorter, type);
    },

    isEdit() {
      return this.userSelected != null;
    },
  },
};
</script>

<style scoped>
@import url(../../../assets/css/slideY-section-animation.css);

.card {
  font-size: 11px;
}
.card input,
.card select {
  width: 200px !important;
}
</style>
