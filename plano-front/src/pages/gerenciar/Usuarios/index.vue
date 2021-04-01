<template>
  <div class="main-component">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoUsuarios"
              orderToCheck="nome"
              width="150"
              align="start"
              title="Nome do Usuário"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoUsuarios"
              orderToCheck="login"
              width="120"
              align="start"
            >
              Login
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoUsuarios"
              orderToCheck="admin"
              orderType="desc"
              width="90"
              align="start"
            >
              Tipo
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="usuario in UsuariosOrdered"
              :key="usuario.id"
              :class="{ 'bg-selected': usuario.id === usuarioSelectedId }"
              @click="handleClickInUsuario(usuario)"
            >
              <v-td width="150" align="start">{{ usuario.nome }}</v-td>
              <v-td width="120" align="start">{{ usuario.login }}</v-td>
              <v-td width="90" align="start">{{ adminText(usuario.admin) }}</v-td>
            </tr>

            <tr v-if="!UsuariosOrdered.length">
              <v-td width="360" colspan="3">
                <b>Nenhum usuário encontrado</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        title="Usuário"
        width="300"
        :toggleFooter="isEditing"
        @btn-salvar="handleUpdateUsuario"
        @btn-delete="openModalDelete"
        @btn-add="handleCreateUsuario"
        @btn-clean="clearUsuarioForm"
      >
        <template #body>
          <VInput
            label="Nome"
            v-model="usuarioForm.nome"
            :validation="$v.usuarioForm.nome"
            :upperCase="false"
          />
          <VInput
            label="Login"
            v-model="usuarioForm.login"
            :validation="$v.usuarioForm.login"
            :upperCase="false"
          />

          <!-- Edit password -->
          <template v-if="isEditing">
            <SectionSlider
              text="Alterar senha"
              :isOpen="isEditingSenha"
              @handel-click="toggleEditSenha"
            />
            <transition-group name="slideY" mode="out-in">
              <template v-if="isEditingSenha">
                <VInputPassword
                  key="editSenha"
                  label="Nova senha"
                  v-model="usuarioForm.senha"
                  :validation="$v.usuarioForm.senha"
                />
                <VInputPassword
                  key="editConfirmaSenha"
                  label="Confirmar senha"
                  v-model="confirmaSenha"
                  :validation="$v.confirmaSenha"
                />
              </template>
            </transition-group>
          </template>
          <!-- Create password -->
          <template v-else>
            <VInputPassword
              label="Senha"
              v-model="usuarioForm.senha"
              :validation="$v.usuarioForm.senha"
            />
            <VInputPassword
              label="Confirmar senha"
              v-model="confirmaSenha"
              :validation="$v.confirmaSenha"
            />
          </template>

          <VSelect label="Tipo" v-model.number="usuarioForm.admin">
            <VOption :value="0" text="Consulta" />
            <VOption :value="1" text="Comissão" />
            <VOption :value="2" text="Administrador" />
          </VSelect>
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeleteUsuario">
      <li class="list-group-item">
        <span>
          <template v-if="isEditing">
            Tem certeza que deseja excluír o usuário
            <b>{{ usuarioForm.nome }}</b>
            ?
          </template>
          <template v-else>Nenhum usuário selecionado!</template>
        </span>
      </li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar usuário:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar usuário:</b>
        Clique na linha da tabela do usuário que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar usuário:</b>
        Clique na linha da tabela do usuário que deseja remover. Em seguida, no cartão à direita,
        clique em Remover
        <font-awesome-icon :icon="['fas', 'trash']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar formulário:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { orderBy } from "lodash-es";
import { mapActions, mapGetters } from "vuex";
import { requiredIf, required, integer } from "vuelidate/lib/validators";
import { makeEmptyUser } from "@utils/factories";
import { Card, VInput, VSelect, VOption, VInputPassword, SectionSlider } from "@/components/ui";
import { ModalDelete, ModalAjuda } from "@/components/modals";

export default {
  name: "GerenciarUsuarios",
  components: {
    Card,
    SectionSlider,
    ModalDelete,
    ModalAjuda,
    VInput,
    VSelect,
    VOption,
    VInputPassword,
  },
  data() {
    return {
      usuarioForm: makeEmptyUser(),
      confirmaSenha: "",
      usuarioSelectedId: null,
      isEditingSenha: false,
      ordenacaoUsuarios: { order: "nome", type: "asc" },
    };
  },
  validations: {
    usuarioForm: {
      nome: { required },
      login: { required },
      senha: {
        requiredIf: requiredIf(function() {
          return this.isEditingSenha || !this.isEditing;
        }),
      },
      admin: { required, integer },
    },
    confirmaSenha: {
      requiredIf: requiredIf(function() {
        return this.isEditingSenha;
      }),
      sameAsPassword: function(value) {
        return this.usuarioForm.senha === value;
      },
    },
  },

  methods: {
    ...mapActions(["updateUsuario", "createUsuario", "deleteUsuario"]),

    adminText(admin) {
      if (admin === 0) return "Consulta";
      else if (admin === 1) return "Comissão";
      else if (admin === 2) return "Administrador";
    },
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    toggleEditSenha() {
      this.isEditingSenha = !this.isEditingSenha;
      this.clearSenhaForm();
    },
    handleClickInUsuario(usuario) {
      this.clearUsuarioForm();
      this.usuarioSelectedId = usuario.id;
      this.usuarioForm = { ...usuario };
    },
    clearUsuarioForm() {
      this.usuarioSelectedId = null;
      this.confirmaSenha = "";
      this.isEditingSenha = false;
      this.usuarioForm = makeEmptyUser();
      this.$nextTick(() => this.$v.$reset());
    },
    clearSenhaForm() {
      this.usuarioForm.senha = "";
      this.confirmaSenha = "";
      this.$nextTick(() => this.$v.$reset());
    },
    //Services
    async handleCreateUsuario() {
      this.$v.usuarioForm.$touch();
      this.$v.confirmaSenha.$touch();
      if (this.$v.usuarioForm.$anyError || this.$v.confirmaSenha.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.createUsuario({ data: this.usuarioForm, notify: true });
        this.clearUsuarioForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleUpdateUsuario() {
      this.$v.usuarioForm.$touch();
      this.$v.confirmaSenha.$touch();
      if (this.$v.usuarioForm.$anyError || this.$v.confirmaSenha.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.updateUsuario({ data: this.usuarioForm, notify: true });
        this.clearSenhaForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteUsuario() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.deleteUsuario({ data: this.usuarioForm, notify: true });
        this.clearUsuarioForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["AllUsuarios"]),

    UsuariosOrdered() {
      const { order, type } = this.ordenacaoUsuarios;

      return orderBy(
        this.AllUsuarios,
        (usuario) => {
          switch (order) {
          case "nome":
          case "login":
            return usuario[order].toLowerCase();
          default:
            return usuario[order];
          }
        },
        type
      );
    },
    isEditing() {
      return this.usuarioSelectedId != null;
    },
  },
};
</script>
