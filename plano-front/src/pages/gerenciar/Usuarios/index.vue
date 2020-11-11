<template>
  <div class="main-component">
    <PageHeader :title="'Usuários'">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
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
        @btn-salvar="editUser"
        @btn-delete="openModalDelete"
        @btn-add="createUser"
        @btn-clean="cleanUser"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="nome">Nome</label>
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
              <label required for="login">Login</label>
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
                <label required for="confirmaSenha">Confirmar senha</label>
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
                    <label required for="novaSenha">Nova senha</label>
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
                    <label required for="confirmaSenha">Confirmar nova senha</label>
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
              <label for="userAdmin">Tipo</label>
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

    <ModalDelete ref="modalDelete" :isDeleting="isEdit" @btn-deletar="deleteUser">
      <li class="list-group-item">
        <span>
          <template v-if="isEdit">
            Tem certeza que deseja excluír o usuário
            <b>{{ userForm.nome }}</b
            >?
          </template>
          <template v-else
            >Nenhum usuário selecionado!</template
          >
        </span>
      </li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Editar:</b> Clique na linha da tabela do usuário que deseja alterar. Em
        seguida, no cartão à direita, altere as informações que desejar e clique em
        Salvar <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Deletar:</b> Clique na linha da tabela do usuário que deseja remover. Em
        seguida, no cartão à direita, clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" /> e
        confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b> No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />, para limpar
        as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b> Clique no cabeçalho da tabela, na coluna desejada, para
        alterar a ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import userService from "@/common/services/usuario";
import { toggleOrdination } from "@/common/mixins";
import { InputPassword, Card, ButtonSlideSection } from "@/components/ui";
import { ModalDelete, ModalAjuda } from "@/components/modals";

const emptyUser = {
  nome: "",
  login: "",
  senha: "",
  admin: 0,
};

export default {
  name: "Usuarios",
  mixins: [toggleOrdination],
  components: {
    Card,
    InputPassword,
    ButtonSlideSection,
    ModalDelete,
    ModalAjuda,
  },
  data() {
    return {
      userSelected: null,
      isEditingSenha: false,
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
      this.$refs.modalDelete.open();
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
        this.pushNotification({
          type: "error",
          text: `Campos obrigátorios incompletos ou inválidos.`,
        });
        return;
      }

      try {
        await userService.create(user);
        this.pushNotification({
          type: "success",
          text: `Usuário criado.`,
        });
        this.cleanUser();
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: error,
        });
      }
    },
    async editUser() {
      const user = this.$_.clone(this.userForm);
      user.senha = this.novaSenha;

      if (!this.validateEditUser(user)) {
        this.pushNotification({
          type: "error",
          text: `Campos obrigátorios incompletos ou inválidos.`,
        });
        return;
      }

      try {
        await userService.updateSuper(user.id, user);
        this.pushNotification({
          type: "success",
          text: `Usuário atualizado.`,
        });
        this.novaSenha = "";
        this.confirmaSenha = "";
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: "Login ou senha inválida",
        });
      }
    },
    async deleteUser() {
      const user = this.$_.clone(this.userForm);

      try {
        await userService.delete(user.id, user);
        this.pushNotification({
          type: "success",
          text: `Usuário ${user.nome} foi removido.`,
        });
        this.cleanUser();
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: error,
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
@import url(../../../assets/css/slideY-animation.css);

.card {
  font-size: 11px;
}
.card input,
.card select {
  width: 200px !important;
}
</style>
